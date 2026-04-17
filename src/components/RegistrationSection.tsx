import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TELEGRAM_BOT_TOKEN = "8613569684:AAEo6dwicekTvH4xw-NdwHYEkxLnrOWJp3M";
const TELEGRAM_CHAT_IDS = ["5435629127", "539210519"];

const RegistrationSection = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      toast.error("Заполните все поля");
      return;
    }

    setSubmitting(true);
    try {
      const text = `🆕 Новая заявка\n\n👤 ФИО: ${fullName}\n📞 Телефон: ${phone}`;
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
      setFullName("");
      setPhone("");
    } catch (err) {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 text-glow">
            Оставьте заявку
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Мы свяжемся с вами для подтверждения участия
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-foreground">
                ФИО
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Иванов Иван Иванович"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-foreground">
                Телефон
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+375 (29) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full box-glow transition-all duration-300 hover:scale-105 mt-2"
            >
              {submitting ? "Отправка..." : "Отправить заявку"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
