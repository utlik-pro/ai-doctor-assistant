import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const TELEGRAM_BOT_TOKEN = "8613569684:AAEo6dwicekTvH4xw-NdwHYEkxLnrOWJp3M";
const TELEGRAM_CHAT_IDS = ["5435629127", "539210519"];
const PRIVACY_POLICY_URL = "http://pro-sebya.by/privacy-policy";
const TOTAL_AMOUNT = "35,00 BYN";

const SPECIALIZATIONS = [
  "Акушерство и гинекология",
  "Аллергология и иммунология",
  "Анестезиология-реаниматология",
  "Бактериология",
  "Вирусология",
  "Гастроэнтерология",
  "Гематология",
  "Генетика",
  "Гериатрия",
  "Дерматовенерология",
  "Детская кардиология",
  "Детская онкология",
  "Детская хирургия",
  "Детская урология-андрология",
  "Детская эндокринология",
  "Диетология",
  "Инфекционные болезни",
  "Кардиология",
  "Клиническая лабораторная диагностика",
  "Клиническая фармакология",
  "Колопроктология",
  "Косметология",
  "Лабораторная генетика",
  "ЛФК и спортивная медицина",
  "Мануальная терапия",
  "Наркология",
  "Неврология",
  "Нейрохирургия",
  "Неонатология",
  "Нефрология",
  "Нутрициология",
  "Общая врачебная практика",
  "Онкология",
  "Ортодонтия",
  "Остеопатия",
  "Оториноларингология",
  "Офтальмология",
  "Патологическая анатомия",
  "Педиатрия",
  "Пластическая хирургия",
  "Профпатология",
  "Психиатрия",
  "Психиатрия-наркология",
  "Психотерапия",
  "Пульмонология",
  "Радиология",
  "Радиотерапия",
  "Ревматология",
  "Рентгенология",
  "Рефлексотерапия",
  "Скорая медицинская помощь",
  "Сосудистая хирургия",
  "Специалист-фармацевт",
  "Спортивная медицина",
  "Стоматология",
  "Стоматология детская",
  "Стоматология ортопедическая",
  "Стоматология пародонтологическая",
  "Стоматология терапевтическая",
  "Стоматология хирургическая",
  "Судебная экспертиза",
  "Терапия",
  "Токсикология",
  "Торакальная хирургия",
  "Травматология и ортопедия",
  "Трансплантология",
  "Трансфузиология",
  "Ультразвуковая диагностика",
  "Урология",
  "Физиотерапия",
  "Фтизиатрия",
  "Функциональная диагностика",
  "Химиотерапия",
  "Хирургия",
  "Челюстно-лицевая хирургия",
  "Эндокринология",
  "Эндоскопия",
  "Эпидемиология",
];

const RegistrationSection = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [position, setPosition] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [ambulatory, setAmbulatory] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !middleName.trim() ||
      !phone.trim() ||
      !specialization ||
      !position.trim() ||
      !workplace.trim() ||
      !ambulatory ||
      !city.trim()
    ) {
      toast.error("Заполните все поля");
      return;
    }
    if (!agreed) {
      toast.error("Необходимо согласие с политикой обработки данных");
      return;
    }

    setSubmitting(true);
    try {
      const text =
        `🆕 Новая заявка\n\n` +
        `👤 ФИО: ${lastName} ${firstName} ${middleName}\n` +
        `📧 Email: ${email}\n` +
        `📞 Телефон: ${phone}\n` +
        `🏥 Специализация: ${specialization}\n` +
        `💼 Должность: ${position}\n` +
        `🏢 Место работы: ${workplace}\n` +
        `🩺 Амбулаторный приём: ${ambulatory}\n` +
        `🏙 Город: ${city}\n` +
        `💰 Сумма: ${TOTAL_AMOUNT}`;

      const results = await Promise.allSettled(
        TELEGRAM_CHAT_IDS.map((chatId) =>
          fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ chat_id: chatId, text }),
            }
          ).then(async (r) => {
            const d = await r.json();
            if (!d.ok) throw new Error(d.description || "Telegram error");
          })
        )
      );

      if (results.every((r) => r.status === "rejected")) {
        throw new Error("All sends failed");
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами.");
      setEmail("");
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setPhone("");
      setSpecialization("");
      setPosition("");
      setWorkplace("");
      setAmbulatory("");
      setCity("");
      setAgreed(false);
    } catch (err) {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="registration" className="py-20 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 text-glow">
            Регистрация на семинар
          </h2>
          <p className="text-muted-foreground text-center mb-8 uppercase text-sm tracking-wide">
            Доступ к обучающим материалам будет открыт только для медицинских
            и фармацевтических работников
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 md:p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Ваш Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  placeholder="Иван"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  placeholder="Иванов"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  placeholder="Иванович"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Ваш телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+375 (00) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="specialization">Медицинская специализация</Label>
              <Select
                value={specialization}
                onValueChange={setSpecialization}
                disabled={submitting}
              >
                <SelectTrigger id="specialization">
                  <SelectValue placeholder="Выберите вашу медицинскую специализацию" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALIZATIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                placeholder="Врач-терапевт"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="workplace">Место работы</Label>
              <Input
                id="workplace"
                placeholder="6-я поликлиника"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Ведёте ли вы амбулаторный приём?</Label>
              <RadioGroup
                value={ambulatory}
                onValueChange={setAmbulatory}
                disabled={submitting}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Да" id="amb-yes" />
                  <Label htmlFor="amb-yes" className="cursor-pointer font-normal">
                    Да
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Нет" id="amb-no" />
                  <Label htmlFor="amb-no" className="cursor-pointer font-normal">
                    Нет
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="city">Город проживания</Label>
              <Input
                id="city"
                placeholder="Минск"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                disabled={submitting}
                className="mt-1"
              />
              <Label
                htmlFor="agree"
                className="text-sm font-normal leading-snug cursor-pointer"
              >
                Я прочитал и согласен с{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  Политикой в отношении обработки и защиты персональных данных
                </a>
              </Label>
            </div>

            <div className="flex items-center justify-end pt-2">
              <p className="text-foreground text-lg">
                Итоговая сумма:{" "}
                <span className="font-bold text-primary">{TOTAL_AMOUNT}</span>
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full box-glow transition-all duration-300 hover:scale-105 mt-2"
            >
              {submitting ? "Отправка..." : "Записаться"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
