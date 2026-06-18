import { Copy, MessageCircle, MapPin, Send } from "lucide-react";

export default function Contacts() {
  return (
    <section id="contacts" className="section-padding bg-gradient-to-br from-primary-50 via-white to-slate-50 pb-28 md:pb-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <span className="badge-soft mb-5">
              <MapPin className="h-4 w-4" /> Иваново и рядом
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Заявка в 2 шага: скопировать и отправить
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              GitHub Pages — бесплатный статический хостинг. Поэтому сайт безопасно готовит текст заявки без хранения токенов и персональных данных на сервере. Клиент копирует заявку и отправляет её напрямую в Telegram или VK.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="soft-card p-4"><b className="text-slate-950">1.</b> Рассчитать услуги</div>
              <div className="soft-card p-4"><b className="text-slate-950">2.</b> Скопировать заявку</div>
              <div className="soft-card p-4"><b className="text-slate-950">3.</b> Отправить в мессенджер</div>
            </div>
          </div>

          <div className="premium-card p-6 md:p-8">
            <div className="space-y-4">
              <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                <span className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-black text-slate-900">Telegram</span>
                    <span className="block text-sm text-slate-500">@gyrman37</span>
                  </span>
                </span>
                <Send className="h-5 w-5 text-slate-400" />
              </a>

              <a href="https://vk.com/bread_1996" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <span className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">
                    VK
                  </span>
                  <span>
                    <span className="block font-black text-slate-900">ВКонтакте</span>
                    <span className="block text-sm text-slate-500">@bread_1996</span>
                  </span>
                </span>
                <Send className="h-5 w-5 text-slate-400" />
              </a>

              <a href="#calculator" className="btn-primary w-full py-4">
                <Copy className="h-5 w-5" /> Подготовить заявку
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
