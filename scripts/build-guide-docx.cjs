#!/usr/bin/env node
/**
 * Builds public/guide.docx from the same content shown on /guide.
 * Run: node scripts/build-guide-docx.js
 * Output: public/guide.docx
 */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, ExternalHyperlink,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition,
} = require('docx');

const NAVY = "0B1729";
const CYAN = "1E9FE0";
const CYAN_LIGHT = "7CC8E5";
const MUTED = "6B7886";
const DESTRUCTIVE = "C0392B";
const TIP_BG = "EAF6FB";
const PROMPT_BG = "F4F6F8";
const HEADER_BG = "0E2238";

const border = (color = "D8DDE3") => ({ style: BorderStyle.SINGLE, size: 4, color });
const cellBorders = { top: border(), bottom: border(), left: border(), right: border() };

const blocks = [
  {
    num: "01",
    title: "Фиксация жалоб голосом",
    tool: "AI-транскрибатор (Superwhisper / Whisper / Yandex SpeechKit)",
    toolUrl: "https://superwhisper.com",
    goal: "Превратить устный рассказ пациента в структурированную запись в карте.",
    saves: "3–5 минут на каждом приёме · до 1,5 часов в день при 20 приёмах",
    steps: [
      "Откройте AI-транскрибатор (Superwhisper на Mac, голосовой ввод Яндекс.Клавиатуры на телефоне или Whisper в браузере).",
      "Запишите 1–2 минуты речи: проговорите жалобы пациента в свободной форме.",
      "Скопируйте полученный текст в ChatGPT и попросите структурировать по системам органов.",
      "Вставьте готовую структуру в медицинскую карту или электронную систему.",
    ],
    promptLabel: "Промпт для структуризации жалоб",
    prompt:
`Ты — медицинский ассистент. Получи свободный текст с жалобами пациента и структурируй его по системам:
— Общие симптомы
— Дерматологические
— Кардио-респираторные
— Неврологические
— Гинекологические / урологические
— ЖКТ
— Эндокринные

Для каждой системы перечисли симптомы кратко, медицинскими терминами, с указанием функционального класса/степени, если оно следует из текста. Если данных по системе нет — пропусти её. Не додумывай и не диагностируй.

Текст: <вставьте сюда расшифровку>`,
    tip: "Не вносите ФИО, телефон и адрес пациента — только клиническую часть. Это требование защиты персональных данных.",
  },
  {
    num: "02",
    title: "Сбор анамнеза через AI-опросник",
    tool: "Telegram-бот / форма с AI-логикой",
    toolUrl: "https://t.me/PRO_sebya_medbot",
    goal: "Собрать анамнез до приёма — за 10 минут пациент честно отвечает в чате.",
    saves: "до 10 минут на приём · более полный и честный анамнез",
    steps: [
      "Отправьте пациенту ссылку на бота за день до визита (или используйте Google Forms с условной логикой).",
      "Бот задаёт ветвящиеся вопросы: акушерский, диетологический, медикаментозный анамнез, хронические потери крови.",
      "Перед приёмом откройте отчёт бота — выделены красные флаги (меноррагия, дефицитное питание, постлактация).",
      "На приёме уточняете только спорные моменты — не теряете время на полный сбор анамнеза заново.",
    ],
    promptLabel: "Промпт для генерации опросника под кейс",
    prompt:
`Ты — врач-терапевт. Сгенерируй опросник из 12–15 вопросов для пациентки с подозрением на железодефицитную анемию.

Включи блоки:
1) Гинекологический анамнез (менструации, роды, лактация)
2) Питание (мясо, овощи, БАДы)
3) ЖКТ (кровотечения, гастрит, операции)
4) Образ жизни (физнагрузки, сон)
5) Текущие препараты

Каждый вопрос — закрытый, с вариантами ответа или шкалой. После списка добавь правила: какие комбинации ответов подсвечивать как красный флаг.`,
    tip: "Письменные ответы достовернее устных — пациенты не стесняются признаться в нерегулярном приёме препаратов или особенностях цикла.",
  },
  {
    num: "03",
    title: "Дифференциальный диагноз с ChatGPT",
    tool: "ChatGPT (GPT-4o / o1)",
    toolUrl: "https://chat.openai.com",
    goal: "Получить ранжированный список дифдиагнозов с подтверждающими тестами за 8 секунд.",
    saves: "5 минут размышлений · второе мнение · ничего не упускаем",
    steps: [
      "В ChatGPT откройте новый чат и вставьте обезличенные жалобы и анамнез из блоков 1–2.",
      "Используйте промпт ниже — он заставляет модель выдать структуру, а не «воду».",
      "Получите 4–6 диагнозов с вероятностью и подтверждающими исследованиями.",
      "Сверяйте со своим клиническим мышлением — AI не заменяет, а расширяет ваш список гипотез.",
    ],
    promptLabel: "Промпт для дифдиагноза",
    prompt:
`Ты — врач-терапевт с опытом 20 лет. На основании жалоб и анамнеза составь дифференциальный диагноз.

Формат ответа:
| № | Диагноз | Вероятность (высокая/средняя/низкая) | Ключевые подтверждающие признаки | Минимальный набор тестов для подтверждения/исключения |

После таблицы добавь раздел «Что нельзя пропустить» — 1–3 жизнеугрожающих диагноза, которые требуется исключить в первую очередь.

Жалобы и анамнез: <вставьте текст>`,
    tip: "Никогда не вставляйте в публичный ChatGPT ФИО, дату рождения, номер карты. Используйте обезличенные данные или корпоративный AI-контур.",
  },
  {
    num: "04",
    title: "Клинические рекомендации в NotebookLM",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    goal: "Получать ответы строго из загруженных клинических рекомендаций — без галлюцинаций.",
    saves: "10–15 минут поиска по PDF · точные ссылки на разделы документа",
    steps: [
      "Откройте notebooklm.google.com и войдите через Google-аккаунт.",
      "Нажмите «Создать новый блокнот» (Create new notebook).",
      "Загрузите источники: PDF клинических рекомендаций (МЗ РБ, ВОЗ, EASL, ESC и т.д.). До 50 источников на блокнот.",
      "В поле чата задавайте вопросы — NotebookLM отвечает только из загруженных документов и даёт ссылки на цитаты.",
      "Сохраните часто используемые блокноты по нозологиям: «Анемии», «АГ», «СД 2», «Гипотиреоз».",
    ],
    promptLabel: "Промпт для клинических рекомендаций",
    prompt:
`На основании загруженных клинических рекомендаций ответь:

1) Какова стартовая суточная доза элементарного железа при ЖДА у небеременной женщины 18–45 лет?
2) Через какой срок ожидать ретикулоцитарный криз и прирост гемоглобина?
3) Какие критерии эффективности терапии через 4 недели?
4) Когда переходить на парентеральное железо?
5) Длительность поддерживающей терапии после нормализации Hb?

Для каждого пункта укажи источник (название документа и раздел).`,
    tip: "NotebookLM не ходит в интернет — он работает только с загруженными файлами. Это его сила: никаких «галлюцинаций» из общей сети.",
  },
  {
    num: "05",
    title: "Памятка для пациента в NotebookLM",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    goal: "Сгенерировать понятную памятку на основе клинрекомендаций — без перевода с врачебного языка.",
    saves: "5–7 минут устного объяснения · пациент уносит материал домой",
    steps: [
      "В том же блокноте, что и в блоке 4, создайте новый чат.",
      "Используйте промпт «памятка для пациента» — он заставляет AI говорить простым языком, без медицинских терминов.",
      "Скопируйте результат в Google Docs или распечатайте.",
      "Вариант для продвинутых: попросите NotebookLM сгенерировать аудиоверсию (Audio Overview) — пациент сможет прослушать в дороге.",
    ],
    promptLabel: "Промпт для памятки пациенту",
    prompt:
`На основании загруженных рекомендаций составь памятку пациентке 34 лет с железодефицитной анемией.

Требования:
— Язык: простой, без медицинских терминов (если термин нужен — поясни в скобках).
— Объём: 1 страница А4.
— Структура:
  1. Что со мной происходит (3–4 предложения)
  2. Как принимать препарат железа (время, чем запивать, чего избегать)
  3. Когда я почувствую улучшение (по неделям)
  4. Когда срочно вернуться к врачу (тревожные симптомы)
  5. Питание — топ-7 продуктов, богатых железом
— Тон: дружелюбный, поддерживающий, без устрашений.`,
    tip: "Перед тем как отдать памятку пациенту — прочитайте сами. Вы несёте ответственность за её содержание, даже если её сгенерировал AI.",
  },
  {
    num: "06",
    title: "Контент для соцсетей: пост + обложка",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    extraTools: [
      { label: "Nano Banana — gemini.google.com", url: "https://gemini.google.com" },
      { label: "Google AI Studio — aistudio.google.com", url: "https://aistudio.google.com" },
      { label: "ChatGPT — chat.openai.com", url: "https://chat.openai.com" },
    ],
    goal: "Собрать готовый пост с обложкой за 90 секунд: текст в NotebookLM, картинка в Nano Banana или ChatGPT.",
    saves: "40 минут на создание поста → 90 секунд",
    steps: [
      "Шаг 1 (текст). В NotebookLM откройте блокнот по нозологии (например, «Анемии») и используйте промпт «пост в соцсети» — получите текст на 1500 символов.",
      "Шаг 2 (адаптация). Скопируйте результат в ChatGPT и попросите переписать под формат вашей соцсети (Instagram, Telegram, Threads).",
      "Шаг 3a (обложка в Nano Banana). Откройте gemini.google.com или aistudio.google.com → выберите модель «Gemini 2.5 Flash Image» (это и есть Nano Banana). Вставьте промпт ниже и получите 4 варианта за 5 секунд. Бесплатно.",
      "Шаг 3b (обложка в ChatGPT). На chat.openai.com (тариф Plus с GPT-4o) вставьте тот же промпт. Удобно, если уже работаете с ChatGPT — текст и картинка в одном чате.",
      "Опубликуйте лучший вариант — добавьте дисклеймер «Информация носит образовательный характер, не заменяет консультацию врача».",
    ],
    promptLabel: "Промпт для поста (NotebookLM)",
    prompt:
`На основании загруженных клинических рекомендаций напиши пост для Instagram-аккаунта врача-терапевта на тему «5 признаков того, что вашему организму не хватает железа».

Требования:
— Объём: до 1500 символов.
— Структура: цепляющий заголовок → 5 признаков с короткими пояснениями (1–2 предложения каждый) → когда идти к врачу → call-to-action (записаться на консультацию).
— Тон: экспертный, но без назидания. Обращение на «вы».
— В конце добавь хэштеги (5–7 штук) и дисклеймер.`,
    extraPrompts: [
      {
        label: "Промпт для обложки в Nano Banana / ChatGPT",
        text:
`Минималистичная обложка для Instagram-поста врача на тему железодефицитной анемии у женщин.

Стиль: чистый, светлый, спокойный, без пугающих и медицинских клише (никаких пробирок, шприцев, окровавленных образов).

Композиция: на нейтральном пастельном фоне (мягкий бежевый, тёплый розовый или приглушённый шалфей) — стилизованная плоская иллюстрация в едином графическом стиле: лист шпината, половинка граната, кусочек красного мяса и одна капсула. Иконография — flat design, мягкие тени, тонкие линии.

В верхней трети — пустое место для заголовка (текст НЕ добавлять). Без надписей и логотипов на изображении.

Формат: квадрат 1:1, разрешение под Instagram (1080×1080). Цветовая палитра тёплая, не более 4 оттенков.`,
      },
    ],
    tip: "Nano Banana бесплатна, быстрее и лучше держит фирменный стиль через несколько итераций. ChatGPT удобнее, если уже пишете там пост — всё в одном чате. Никогда не просите AI добавить русский текст на картинку: оба инструмента портят кириллицу. Заголовок добавляйте сами в Canva или Figma.",
  },
];

// ---------- helpers ----------
const numberedPara = (text, ref) =>
  new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22 })],
  });

const bulletPara = (text) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22 })],
  });

const labelCell = (text, fillColor = HEADER_BG) =>
  new TableCell({
    borders: cellBorders,
    width: { size: 2400, type: WidthType.DXA },
    shading: { fill: fillColor, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })],
      }),
    ],
  });

const valueCell = (text) =>
  new TableCell({
    borders: cellBorders,
    width: { size: 6960, type: WidthType.DXA },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, size: 22 })],
      }),
    ],
  });

const infoTable = (rows) =>
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2400, 6960],
    rows: rows.map(([label, value]) =>
      new TableRow({ children: [labelCell(label), valueCell(value)] })
    ),
  });

const promptBox = (label, text) => {
  const lines = text.split("\n");
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: CYAN },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: CYAN },
              left: { style: BorderStyle.SINGLE, size: 4, color: CYAN },
              right: { style: BorderStyle.SINGLE, size: 4, color: CYAN },
            },
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: PROMPT_BG, type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 240, right: 240 },
            children: [
              new Paragraph({
                spacing: { after: 120 },
                children: [
                  new TextRun({ text: label.toUpperCase(), bold: true, size: 18, color: CYAN }),
                ],
              }),
              ...lines.map((line) =>
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: line || " ",
                      font: "Consolas",
                      size: 20,
                      color: "1F2A37",
                    }),
                  ],
                })
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const tipBox = (text) =>
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: CYAN_LIGHT },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: CYAN_LIGHT },
              left: { style: BorderStyle.SINGLE, size: 16, color: CYAN },
              right: { style: BorderStyle.SINGLE, size: 4, color: CYAN_LIGHT },
            },
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: TIP_BG, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 240, right: 240 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "ПОДСКАЗКА. ", bold: true, color: CYAN, size: 20 }),
                  new TextRun({ text, size: 22, color: "1F2A37" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

const blockHeader = (block) => {
  const out = [
    new Paragraph({
      spacing: { before: 360, after: 80 },
      children: [new TextRun({ text: `БЛОК ${block.num}`, bold: true, color: CYAN, size: 20 })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 80 },
      children: [new TextRun({ text: block.title, bold: true, size: 32, color: NAVY })],
    }),
    new Paragraph({
      spacing: { after: block.extraTools ? 80 : 200 },
      children: [
        new TextRun({ text: "Инструмент: ", color: MUTED, size: 22 }),
        new ExternalHyperlink({
          link: block.toolUrl,
          children: [
            new TextRun({
              text: block.tool,
              color: CYAN,
              size: 22,
              underline: { type: "single" },
            }),
          ],
        }),
      ],
    }),
  ];

  if (block.extraTools && block.extraTools.length > 0) {
    const children = [new TextRun({ text: "+ ", color: MUTED, size: 20 })];
    block.extraTools.forEach((t, i) => {
      children.push(
        new ExternalHyperlink({
          link: t.url,
          children: [
            new TextRun({
              text: t.label,
              color: CYAN,
              size: 20,
              underline: { type: "single" },
            }),
          ],
        })
      );
      if (i < block.extraTools.length - 1) {
        children.push(new TextRun({ text: "  ·  ", color: MUTED, size: 20 }));
      }
    });
    out.push(new Paragraph({ spacing: { after: 200 }, children }));
  }

  return out;
};

const buildBlock = (block) => {
  const out = [
    ...blockHeader(block),
    infoTable([
      ["Цель", block.goal],
      ["Что экономит", block.saves],
    ]),
    new Paragraph({
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text: "Шаги", bold: true, size: 24, color: NAVY })],
    }),
    ...block.steps.map((s) => numberedPara(s, `steps-${block.num}`)),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun(" ")] }),
    promptBox(block.promptLabel, block.prompt),
  ];

  if (block.extraPrompts) {
    block.extraPrompts.forEach((extra) => {
      out.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun(" ")] }));
      out.push(promptBox(extra.label, extra.text));
    });
  }

  out.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun(" ")] }));
  out.push(tipBox(block.tip));
  return out;
};

// ---------- document ----------
const doc = new Document({
  creator: "PRO себя × Alba lp",
  title: "Гайд участника — 6 AI-инструментов для практики врача",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 44, bold: true, font: "Calibri", color: NAVY },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: NAVY },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 270 } } },
          },
        ],
      },
      ...blocks.map((b) => ({
        reference: `steps-${b.num}`,
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 540, hanging: 270 } },
              run: { color: CYAN, bold: true },
            },
          },
        ],
      })),
      {
        reference: "qs-steps",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 540, hanging: 270 } },
              run: { color: CYAN, bold: true },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({ text: "PRO себя × Alba lp", bold: true, size: 18, color: MUTED }),
                new TextRun({ text: "\tГайд участника · 13 мая 2026", size: 18, color: MUTED }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({ text: "ИИ-ассистент врача · pro-sebya.by", size: 18, color: MUTED }),
                new TextRun({ text: "\tСтр. ", size: 18, color: MUTED }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: MUTED }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 600, after: 160 },
          children: [
            new TextRun({
              text: "ГАЙД ДЛЯ УЧАСТНИКОВ СЕМИНАРА",
              bold: true,
              size: 22,
              color: CYAN,
            }),
          ],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "6 AI-инструментов для практики врача",
              bold: true,
              size: 56,
              color: NAVY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: "Пошаговая инструкция к живому демо на семинаре «ИИ-ассистент врача».",
              size: 26,
              color: "374151",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 360 },
          children: [
            new TextRun({
              text:
                "Каждый блок — это этап реального приёма пациента с железодефицитной анемией. Сохраните этот документ и применяйте инструменты с завтрашнего утра.",
              size: 22,
              color: MUTED,
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: "Быстрый старт: настройка NotebookLM",
              bold: true,
              size: 32,
              color: NAVY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text:
                "Один из главных героев семинара. Бесплатный, работает на русском, не уходит в общий интернет и не «галлюцинирует».",
              size: 22,
              color: "374151",
            }),
          ],
        }),
        ...[
          "Перейдите на notebooklm.google.com",
          "Войдите через ваш Google-аккаунт (Gmail подойдёт).",
          "Нажмите «New notebook» → загрузите PDF клинических рекомендаций (до 50 файлов на блокнот).",
          "Подождите 30–60 секунд, пока NotebookLM проиндексирует источники.",
          "Задавайте вопросы в чате — все ответы идут со ссылками на конкретный раздел документа.",
        ].map((s) => numberedPara(s, "qs-steps")),
        new Paragraph({
          spacing: { before: 160, after: 360 },
          children: [
            new ExternalHyperlink({
              link: "https://notebooklm.google.com",
              children: [
                new TextRun({
                  text: "→ Открыть NotebookLM",
                  bold: true,
                  size: 22,
                  color: CYAN,
                  underline: { type: "single" },
                }),
              ],
            }),
          ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({ text: "6 блоков приёма с AI", bold: true, size: 44, color: NAVY }),
          ],
        }),
        new Paragraph({
          spacing: { after: 240 },
          children: [
            new TextRun({
              text:
                "Структура соответствует живому демо на семинаре. Каждый блок самодостаточен — можно начинать с любого.",
              size: 22,
              color: MUTED,
            }),
          ],
        }),

        ...blocks.flatMap(buildBlock),

        new Paragraph({ children: [new PageBreak()] }),

        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "Безопасность и юридический минимум",
              bold: true,
              size: 40,
              color: DESTRUCTIVE,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text:
                "Эти правила сохраняют вашу врачебную лицензию и доверие пациентов. Не пропускайте — это не «бюрократия», это рамка ответственного применения AI.",
              size: 22,
              color: "374151",
            }),
          ],
        }),
        ...[
          "Никогда не отправляйте в публичные AI ФИО, дату рождения, номер карты, телефон, адрес пациента.",
          "Обезличивайте данные: «Пациентка, 34 года» вместо «Иванова Марина Ивановна».",
          "Финальное решение по диагнозу и лечению — всегда за врачом. AI — это второе мнение, не первое.",
          "Памятки и контент для пациентов читайте сами перед публикацией — ответственность на вас.",
          "Используйте корпоративный AI-контур (с подписанным DPA) для работы с клиническими данными, если это возможно.",
          "Подробнее о юридической стороне — на семинаре, блок «Врач и ИИ: что должен знать каждый врач».",
        ].map(bulletPara),

        new Paragraph({
          spacing: { before: 480, after: 160 },
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: "Хотите увидеть всё это вживую?",
              bold: true,
              size: 32,
              color: NAVY,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 160 },
          children: [
            new TextRun({
              text:
                "13 мая 2026, 18:00, Ренессанс Минск Отель — живое демо на реальном кейсе пациента и Q&A с экспертами.",
              size: 22,
              color: "374151",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 240 },
          children: [
            new ExternalHyperlink({
              link: "https://t.me/PRO_sebya_medbot",
              children: [
                new TextRun({
                  text: "→ Зарегистрироваться в Telegram",
                  bold: true,
                  size: 24,
                  color: CYAN,
                  underline: { type: "single" },
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 360 },
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: "PRO себя × Alba lp · Первый в Беларуси семинар на тему AI в практике врача",
              italics: true,
              size: 18,
              color: MUTED,
            }),
          ],
        }),
      ],
    },
  ],
});

const out = process.argv[2] || path.join(__dirname, "..", "public", "guide.docx");
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(out, buffer);
  console.log("Wrote", out, buffer.length, "bytes");
});
