import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Mic,
  MessageSquare,
  Stethoscope,
  FileSearch,
  ClipboardList,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Lightbulb,
  ShieldAlert,
  Rocket,
  Download,
} from "lucide-react";

type Block = {
  num: string;
  title: string;
  tool: string;
  toolUrl?: string;
  extraTools?: { label: string; url: string }[];
  goal: string;
  saves: string;
  Icon: typeof Mic;
  steps: string[];
  prompt?: { label: string; text: string };
  extraPrompts?: { label: string; text: string }[];
  tip?: string;
};

const blocks: Block[] = [
  {
    num: "01",
    title: "Фиксация жалоб голосом",
    tool: "AI-транскрибатор (Whisper / Superwhisper / Yandex SpeechKit)",
    toolUrl: "https://superwhisper.com",
    goal: "Превратить устный рассказ пациента в структурированную запись в карте.",
    saves: "3–5 минут на каждом приёме · до 1,5 часов в день при 20 приёмах",
    Icon: Mic,
    steps: [
      "Откройте любой AI-транскрибатор (Superwhisper на Mac, голосовой ввод Яндекс.Клавиатуры на телефоне или Whisper в браузере).",
      "Запишите 1–2 минуты речи: проговорите жалобы пациента в свободной форме.",
      "Скопируйте полученный текст в ChatGPT и попросите структурировать по системам органов — используйте промпт ниже.",
      "Вставьте готовую структуру в медицинскую карту или электронную систему.",
    ],
    prompt: {
      label: "Промпт для структуризации жалоб",
      text:
        "Ты — медицинский ассистент. Получи свободный текст с жалобами пациента и структурируй его по системам:\n— Общие симптомы\n— Дерматологические\n— Кардио-респираторные\n— Неврологические\n— Гинекологические / урологические\n— ЖКТ\n— Эндокринные\nДля каждой системы перечисли симптомы кратко, медицинскими терминами, с указанием функционального класса/степени, если оно следует из текста. Если данных по системе нет — пропусти её. Не додумывай и не диагностируй.\n\nТекст: <вставьте сюда расшифровку>",
    },
    tip: "Не вносите ФИО, телефон и адрес пациента — только клиническую часть. Это требование защиты персональных данных.",
  },
  {
    num: "02",
    title: "Сбор анамнеза через AI-опросник",
    tool: "Telegram-бот / форма с AI-логикой",
    toolUrl: "https://t.me/PRO_sebya_medbot",
    goal: "Собрать анамнез до приёма — за 10 минут пациент честно отвечает в чате.",
    saves: "до 10 минут на приём · более полный и честный анамнез",
    Icon: MessageSquare,
    steps: [
      "Отправьте пациенту ссылку на бота за день до визита (или используйте Google Forms с условной логикой).",
      "Бот задаёт ветвящиеся вопросы: акушерский, диетологический, медикаментозный анамнез, хронические потери крови.",
      "Перед приёмом откройте отчёт бота — выделены красные флаги (меноррагия, дефицитное питание, постлактация).",
      "На приёме уточняете только спорные моменты — не теряете время на полный сбор анамнеза заново.",
    ],
    prompt: {
      label: "Промпт для генерации опросника под кейс",
      text:
        "Ты — врач-терапевт. Сгенерируй опросник из 12–15 вопросов для пациентки с подозрением на железодефицитную анемию. Включи блоки:\n1) Гинекологический анамнез (менструации, роды, лактация)\n2) Питание (мясо, овощи, БАДы)\n3) ЖКТ (кровотечения, гастрит, операции)\n4) Образ жизни (физнагрузки, сон)\n5) Текущие препараты\nКаждый вопрос — закрытый, с вариантами ответа или шкалой. После списка добавь правила: какие комбинации ответов подсвечивать как красный флаг.",
    },
    tip: "Письменные ответы достовернее устных — пациенты не стесняются признаться в нерегулярном приёме препаратов или особенностях цикла.",
  },
  {
    num: "03",
    title: "Дифференциальный диагноз с ChatGPT",
    tool: "ChatGPT (GPT-4o / o1)",
    toolUrl: "https://chat.openai.com",
    goal: "Получить ранжированный список дифдиагнозов с подтверждающими тестами за 8 секунд.",
    saves: "5 минут размышлений · второе мнение · ничего не упускаем",
    Icon: Stethoscope,
    steps: [
      "В ChatGPT откройте новый чат и вставьте обезличенные жалобы и анамнез из блоков 1–2.",
      "Используйте промпт ниже — он заставляет модель выдать структуру, а не «воду».",
      "Получите 4–6 диагнозов с вероятностью и подтверждающими исследованиями.",
      "Сверяйте со своим клиническим мышлением — AI не заменяет, а расширяет ваш список гипотез.",
    ],
    prompt: {
      label: "Промпт для дифдиагноза",
      text:
        "Ты — врач-терапевт с опытом 20 лет. На основании жалоб и анамнеза составь дифференциальный диагноз.\n\nФормат ответа:\n| № | Диагноз | Вероятность (высокая/средняя/низкая) | Ключевые подтверждающие признаки | Минимальный набор тестов для подтверждения/исключения |\n\nПосле таблицы добавь раздел «Что нельзя пропустить» — 1–3 жизнеугрожающих диагноза, которые требуется исключить в первую очередь.\n\nЖалобы и анамнез: <вставьте текст>",
    },
    tip: "Никогда не вставляйте в публичный ChatGPT ФИО, дату рождения, номер карты. Используйте обезличенные данные или корпоративный AI-контур.",
  },
  {
    num: "04",
    title: "Клинические рекомендации в NotebookLM",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    goal: "Получать ответы строго из загруженных клинических рекомендаций — без галлюцинаций.",
    saves: "10–15 минут поиска по PDF · точные ссылки на разделы документа",
    Icon: FileSearch,
    steps: [
      "Откройте notebooklm.google.com и войдите через Google-аккаунт.",
      "Нажмите «Создать новый блокнот» (Create new notebook).",
      "Загрузите источники: PDF клинических рекомендаций (МЗ РБ, ВОЗ, EASL, ESC и т.д.). До 50 источников на блокнот.",
      "В поле чата задавайте вопросы — NotebookLM отвечает только из загруженных документов и даёт ссылки на цитаты.",
      "Сохраните часто используемые блокноты по нозологиям: «Анемии», «АГ», «СД 2», «Гипотиреоз».",
    ],
    prompt: {
      label: "Промпт для клинических рекомендаций",
      text:
        "На основании загруженных клинических рекомендаций ответь:\n1) Какова стартовая суточная доза элементарного железа при ЖДА у небеременной женщины 18–45 лет?\n2) Через какой срок ожидать ретикулоцитарный криз и прирост гемоглобина?\n3) Какие критерии эффективности терапии через 4 недели?\n4) Когда переходить на парентеральное железо?\n5) Длительность поддерживающей терапии после нормализации Hb?\n\nДля каждого пункта укажи источник (название документа и раздел).",
    },
    tip: "NotebookLM не ходит в интернет — он работает только с загруженными файлами. Это его сила: никаких «галлюцинаций» из общей сети.",
  },
  {
    num: "05",
    title: "Памятка для пациента в NotebookLM",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    goal: "Сгенерировать понятную памятку на основе клинрекомендаций — без перевода с врачебного языка.",
    saves: "5–7 минут устного объяснения · пациент уносит материал домой",
    Icon: ClipboardList,
    steps: [
      "В том же блокноте, что и в блоке 4, создайте новый чат.",
      "Используйте промпт «памятка для пациента» — он заставляет AI говорить простым языком, без медицинских терминов.",
      "Скопируйте результат в Google Docs или распечатайте.",
      "Вариант для продвинутых: попросите NotebookLM сгенерировать аудиоверсию (Audio Overview) — пациент сможет прослушать в дороге.",
    ],
    prompt: {
      label: "Промпт для памятки пациенту",
      text:
        "На основании загруженных рекомендаций составь памятку пациентке 34 лет с железодефицитной анемией.\n\nТребования:\n— Язык: простой, без медицинских терминов (если термин нужен — поясни в скобках).\n— Объём: 1 страница А4.\n— Структура:\n  1. Что со мной происходит (3–4 предложения)\n  2. Как принимать препарат железа (время, чем запивать, чего избегать)\n  3. Когда я почувствую улучшение (по неделям)\n  4. Когда срочно вернуться к врачу (тревожные симптомы)\n  5. Питание — топ-7 продуктов, богатых железом\n— Тон: дружелюбный, поддерживающий, без устрашений.",
    },
    tip: "Перед тем как отдать памятку пациенту — прочитайте сами. Вы несёте ответственность за её содержание, даже если её сгенерировал AI.",
  },
  {
    num: "06",
    title: "Контент для соцсетей: пост + обложка",
    tool: "NotebookLM (Google)",
    toolUrl: "https://notebooklm.google.com",
    extraTools: [
      { label: "Nano Banana (Gemini 2.5 Flash Image)", url: "https://gemini.google.com" },
      { label: "Google AI Studio", url: "https://aistudio.google.com" },
      { label: "ChatGPT (image generation)", url: "https://chat.openai.com" },
    ],
    goal: "Собрать готовый пост с обложкой за 90 секунд: текст в NotebookLM, картинка в Nano Banana или ChatGPT.",
    saves: "40 минут на создание поста → 90 секунд",
    Icon: Sparkles,
    steps: [
      "Шаг 1 (текст). В NotebookLM откройте блокнот по нозологии (например, «Анемии») и используйте промпт «пост в соцсети» — получите текст на 1500 символов.",
      "Шаг 2 (адаптация). Скопируйте результат в ChatGPT и попросите переписать под формат вашей соцсети (Instagram, Telegram, Threads).",
      "Шаг 3a (обложка в Nano Banana). Откройте gemini.google.com или aistudio.google.com → выберите модель «Gemini 2.5 Flash Image» (это и есть Nano Banana). Вставьте промпт ниже и получите 4 варианта за 5 секунд. Бесплатно.",
      "Шаг 3b (обложка в ChatGPT). На chat.openai.com (тариф Plus с GPT-4o) вставьте тот же промпт. Удобно, если уже работаете в ChatGPT — текст и картинка в одном чате.",
      "Опубликуйте лучший вариант — добавьте дисклеймер «Информация носит образовательный характер, не заменяет консультацию врача».",
    ],
    prompt: {
      label: "Промпт для поста (NotebookLM)",
      text:
        "На основании загруженных клинических рекомендаций напиши пост для Instagram-аккаунта врача-терапевта на тему «5 признаков того, что вашему организму не хватает железа».\n\nТребования:\n— Объём: до 1500 символов.\n— Структура: цепляющий заголовок → 5 признаков с короткими пояснениями (1–2 предложения каждый) → когда идти к врачу → call-to-action (записаться на консультацию).\n— Тон: экспертный, но без назидания. Обращение на «вы».\n— В конце добавь хэштеги (5–7 штук) и дисклеймер.",
    },
    extraPrompts: [
      {
        label: "Промпт для обложки в Nano Banana / ChatGPT",
        text:
          "Минималистичная обложка для Instagram-поста врача на тему железодефицитной анемии у женщин.\n\nСтиль: чистый, светлый, спокойный, без пугающих и медицинских клише (никаких пробирок, шприцев, окровавленных образов).\n\nКомпозиция: на нейтральном пастельном фоне (мягкий бежевый, тёплый розовый или приглушённый шалфей) — стилизованная плоская иллюстрация в едином графическом стиле: лист шпината, половинка граната, кусочек красного мяса и одна капсула. Иконография — flat design, мягкие тени, тонкие линии.\n\nВ верхней трети — пустое место для заголовка (текст НЕ добавлять). Без надписей и логотипов на изображении.\n\nФормат: квадрат 1:1, разрешение под Instagram (1080×1080). Цветовая палитра тёплая, не более 4 оттенков.",
      },
    ],
    tip: "Nano Banana бесплатна, быстрее и лучше держит фирменный стиль через несколько итераций. ChatGPT удобнее, если уже пишете там пост — всё в одном чате. Никогда не просите AI добавить русский текст на картинку: оба инструмента портят кириллицу. Заголовок добавляйте сами в Canva или Figma.",
  },
];

const Guide = () => {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const copyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen gradient-navy">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base font-bold">PRO себя</span>
          </Link>
          <span className="text-sm text-muted-foreground">Гайд участника</span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 relative">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-primary text-xs font-medium tracking-widest uppercase mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Гайд для участников семинара
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground text-glow mb-6">
            6 AI-инструментов <br className="hidden md:block" />для практики врача
          </h1>
          <p className="text-lg text-cyan-light mb-3">
            Пошаговая инструкция к живому демо на семинаре «ИИ-ассистент врача».
          </p>
          <p className="text-base text-muted-foreground mb-8">
            Каждый блок — это этап реального приёма пациента с железодефицитной анемией. Сохраните страницу
            в закладки и применяйте инструменты с завтрашнего утра.
          </p>
          <a
            href="/guide.docx"
            download
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full box-glow transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Скачать гайд (.docx)
          </a>
        </div>
      </section>

      {/* Quick start */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="border border-primary/30 rounded-2xl p-6 md:p-8 border-glow bg-secondary/30 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-4">
              <Rocket className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Быстрый старт: настройка NotebookLM
                </h2>
                <p className="text-muted-foreground text-sm">
                  Один из главных героев семинара. Бесплатный, работает на русском, не уходит в общий интернет
                  и не «галлюцинирует».
                </p>
              </div>
            </div>
            <ol className="space-y-2 ml-11">
              {[
                "Перейдите на notebooklm.google.com",
                "Войдите через ваш Google-аккаунт (Gmail подойдёт).",
                "Нажмите «New notebook» → загрузите PDF клинических рекомендаций (до 50 файлов на блокнот).",
                "Подождите 30–60 секунд, пока NotebookLM проиндексирует источники.",
                "Задавайте вопросы в чате — все ответы идут со ссылками на конкретный раздел документа.",
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-sm md:text-base text-cyan-light">
                  <span className="text-primary font-bold w-5 flex-shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
            >
              Открыть NotebookLM
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6 Blocks */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12 text-glow">
            6 блоков приёма с AI
          </h2>

          <div className="space-y-6">
            {blocks.map((block) => {
              const Icon = block.Icon;
              const promptId = `prompt-${block.num}`;
              return (
                <article
                  key={block.num}
                  className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:box-glow"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-primary text-xs font-bold tracking-widest mb-1">БЛОК {block.num}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{block.title}</h3>
                      <div className="text-cyan-light text-sm">
                        Инструмент:{" "}
                        {block.toolUrl ? (
                          <a
                            href={block.toolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-primary"
                          >
                            {block.tool}
                          </a>
                        ) : (
                          block.tool
                        )}
                      </div>
                      {block.extraTools && block.extraTools.length > 0 && (
                        <div className="text-muted-foreground text-xs mt-1">
                          + {block.extraTools.map((t, i) => (
                            <span key={t.url}>
                              <a
                                href={t.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                              >
                                {t.label}
                              </a>
                              {i < block.extraTools!.length - 1 && " · "}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Goal & savings */}
                  <div className="grid md:grid-cols-2 gap-3 mb-5">
                    <div className="rounded-lg bg-secondary/40 border border-border/60 p-3">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Цель</div>
                      <div className="text-sm text-foreground">{block.goal}</div>
                    </div>
                    <div className="rounded-lg bg-secondary/40 border border-border/60 p-3">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Что экономит</div>
                      <div className="text-sm text-foreground">{block.saves}</div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mb-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Шаги</div>
                    <ol className="space-y-2">
                      {block.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/90">
                          <span className="text-primary font-bold w-5 flex-shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Prompt */}
                  {block.prompt && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">{block.prompt.label}</div>
                        <button
                          onClick={() => copyPrompt(promptId, block.prompt!.text)}
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                          aria-label="Скопировать промпт"
                        >
                          {copiedIdx === promptId ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Скопировано
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Скопировать
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="rounded-lg bg-background/60 border border-border/80 p-4 text-xs md:text-sm text-cyan-light whitespace-pre-wrap font-mono leading-relaxed">
                        {block.prompt.text}
                      </pre>
                    </div>
                  )}

                  {/* Extra prompts */}
                  {block.extraPrompts?.map((extra, idx) => {
                    const extraId = `prompt-${block.num}-extra-${idx}`;
                    return (
                      <div className="mb-5" key={extraId}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">{extra.label}</div>
                          <button
                            onClick={() => copyPrompt(extraId, extra.text)}
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                            aria-label="Скопировать промпт"
                          >
                            {copiedIdx === extraId ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Скопировано
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Скопировать
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="rounded-lg bg-background/60 border border-border/80 p-4 text-xs md:text-sm text-cyan-light whitespace-pre-wrap font-mono leading-relaxed">
                          {extra.text}
                        </pre>
                      </div>
                    );
                  })}

                  {/* Tip */}
                  {block.tip && (
                    <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
                      <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-cyan-light">{block.tip}</div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety reminder */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="border border-destructive/30 rounded-2xl p-6 md:p-8 bg-destructive/5 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-7 h-7 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Безопасность и юридический минимум
                </h2>
                <ul className="space-y-2 text-sm md:text-base text-cyan-light">
                  <li className="flex gap-2"><span className="text-destructive">•</span>
                    Никогда не отправляйте в публичные AI ФИО, дату рождения, номер карты, телефон, адрес пациента.
                  </li>
                  <li className="flex gap-2"><span className="text-destructive">•</span>
                    Обезличивайте данные: «Пациентка, 34 года» вместо «Иванова Марина Ивановна».
                  </li>
                  <li className="flex gap-2"><span className="text-destructive">•</span>
                    Финальное решение по диагнозу и лечению — всегда за врачом. AI — это второе мнение, не первое.
                  </li>
                  <li className="flex gap-2"><span className="text-destructive">•</span>
                    Памятки и контент для пациентов читайте сами перед публикацией — ответственность на вас.
                  </li>
                  <li className="flex gap-2"><span className="text-destructive">•</span>
                    Подробнее о юридической стороне — на семинаре, блок «Врач и ИИ: что должен знать каждый врач».
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Хотите увидеть всё это вживую?
          </h2>
          <p className="text-muted-foreground mb-8">
            13 мая 2026, 18:00, Ренессанс Минск Отель — живое демо на реальном кейсе пациента и Q&A с экспертами.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#registration"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-4 rounded-full box-glow transition-all duration-300 hover:scale-105"
            >
              Зарегистрироваться
            </Link>
            <Link
              to="/"
              className="inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              На главную
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            PRO себя × Alba lp · Первый в Беларуси семинар на тему AI в практике врача
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Guide;
