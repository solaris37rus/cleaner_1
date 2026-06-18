import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, AlertCircle, Copy, ExternalLink, MessageCircle, Send } from "lucide-react";
import type { CalculatorState } from "./PriceCalculator";

interface LeadFormProps {
  calculatorState: CalculatorState;
  onBack: () => void;
}

type SubmitStatus = "idle" | "success" | "error";

const telegramUrl = "https://t.me/gyrman37";
const vkUrl = "https://vk.com/bread_1996";

export default function LeadForm({ calculatorState, onBack }: LeadFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", date: "", comment: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyLabel, setCopyLabel] = useState("Скопировать заявку");

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "");
    if (!phone) return "";
    let normalized = phone;
    if (phone[0] === "8" || phone[0] === "7") normalized = `7${phone.slice(1)}`;
    else if (phone[0] === "9") normalized = `7${phone}`;

    if (normalized.length <= 1) return "+7";
    if (normalized.length <= 4) return `+7 (${normalized.slice(1)}`;
    if (normalized.length <= 7) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4)}`;
    if (normalized.length <= 9) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7)}`;
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStatus((current) => (current === "error" ? "idle" : current));
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? formatPhoneNumber(value) : value }));
  };

  const messageText = useMemo(() => {
    const { roomType, area, serviceType, windowsCount, extras, complexDirt, total } = calculatorState;
    const measure = serviceType === "Мойка окон" ? `${windowsCount} створок` : `${area} м²`;
    const extrasText = extras.length
      ? extras.map((extra) => `• ${extra.name}${extra.type === "count" ? ` x${extra.count}` : ""}`).join("\n")
      : "Не выбраны";

    return [
      "🧽 Новая заявка на клининг — Иваново",
      "",
      `👤 ФИО: ${formData.name || "Не указано"}`,
      `📞 Телефон: ${formData.phone || "Не указан"}`,
      `📍 Адрес: ${formData.address || "Не указан"}`,
      `📅 Дата/время: ${formData.date || "Не указана"}`,
      "",
      `🏠 Тип помещения: ${roomType}`,
      `🧹 Основная услуга: ${serviceType}`,
      serviceType === "Мойка окон" ? `🪟 Количество створок: ${measure}` : `📐 Площадь: ${measure}`,
      `⚠️ Сложное загрязнение: ${complexDirt ? "Да, +20%" : "Нет"}`,
      "",
      "➕ Дополнительные услуги:",
      extrasText,
      "",
      `💬 Комментарий: ${formData.comment || "Без комментария"}`,
      `💰 Предварительная стоимость: ~ ${total.toLocaleString("ru-RU")} ₽`,
      "",
      "Цена предварительная. Итог зависит от объёма работ, степени загрязнения и дополнительных пожеланий.",
      "Источник: сайт GitHub Pages",
    ].join("\n");
  }, [calculatorState, formData]);

  const validateBeforeSubmit = () => {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("укажите ФИО");
    if (formData.phone.replace(/\D/g, "").length < 10) errors.push("укажите корректный телефон");
    if (!formData.address.trim()) errors.push("укажите адрес");
    return errors;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopyLabel("Заявка скопирована");
      window.setTimeout(() => setCopyLabel("Скопировать заявку"), 1800);
      return true;
    } catch {
      setCopyLabel("Скопируйте вручную ниже");
      window.setTimeout(() => setCopyLabel("Скопировать заявку"), 2200);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateBeforeSubmit();
    if (validationErrors.length) {
      setStatus("error");
      setErrorMessage(`Пожалуйста, ${validationErrors.join(", ")}.`);
      return;
    }

    await handleCopy();
    setStatus("success");
  };

  const contactButtons = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full bg-sky-500 hover:bg-sky-600 text-sm">
        <MessageCircle className="w-4 h-4" /> Открыть Telegram <ExternalLink className="w-4 h-4" />
      </a>
      <a href={vkUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full bg-blue-600 hover:bg-blue-700 text-sm">
        VK <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );

  if (status === "success") {
    return (
      <div className="premium-card p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary-500" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Заявка готова</h3>
        <p className="text-slate-600 mb-6">
          GitHub Pages — статический хостинг, поэтому сайт не хранит токены и не отправляет сообщение сам. Текст заявки уже скопирован: откройте Telegram или VK и вставьте его в сообщение.
        </p>
        <div className="space-y-3">
          {contactButtons}
          <button type="button" onClick={handleCopy} className="btn-outline w-full text-sm">
            <Copy className="w-4 h-4" /> {copyLabel}
          </button>
          <button onClick={onBack} className="text-sm font-bold text-primary-700 hover:text-primary-800" type="button">
            Вернуться к расчёту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card p-6 md:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors mb-6" type="button">
        <ArrowLeft className="w-4 h-4" /> Назад к расчёту
      </button>

      <h3 className="text-2xl font-black text-slate-900 mb-2">Оформление заявки</h3>
      <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
        Заполните контакты. Сайт подготовит готовый текст заявки, который можно отправить в Telegram или VK.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="lead-name">ФИО *</label>
          <input id="lead-name" type="text" name="name" required value={formData.name} onChange={handleChange} className="field-input" placeholder="Иван Иванов" autoComplete="name" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="lead-phone">Телефон *</label>
          <input id="lead-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="field-input" placeholder="+7 (999) 000-00-00" autoComplete="tel" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="lead-address">Адрес *</label>
          <input id="lead-address" type="text" name="address" required value={formData.address} onChange={handleChange} className="field-input" placeholder="Иваново, ул. Ленина, д. 1" autoComplete="street-address" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="lead-date">Желаемая дата и время</label>
          <input id="lead-date" type="text" name="date" value={formData.date} onChange={handleChange} className="field-input" placeholder="Например: завтра в 10:00" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1" htmlFor="lead-comment">Комментарий</label>
          <textarea id="lead-comment" name="comment" rows={3} value={formData.comment} onChange={handleChange} className="field-input resize-none" placeholder="Особенности помещения, подъезд, домофон, пожелания" />
        </div>

        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-4 text-sm text-slate-700">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="font-black text-slate-900">Предварительный итог</span>
            <span className="font-black text-primary-700">~ {calculatorState.total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <p className="text-xs text-slate-500">
            Финальную стоимость подтверждаем после уточнения объёма работ и степени загрязнения.
          </p>
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-100 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2 font-black text-slate-900">
            <Send className="h-4 w-4 text-primary-600" /> Что произойдёт после кнопки
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Сайт скопирует текст заявки. Затем откройте Telegram или VK и вставьте сообщение. Так сайт работает бесплатно на GitHub Pages и открывается без backend.
          </p>
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-base mt-2">
          <Copy className="w-5 h-5" /> Скопировать заявку
        </button>
        {contactButtons}
      </form>
    </div>
  );
}
