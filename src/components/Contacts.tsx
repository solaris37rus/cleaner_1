import { MessageCircle, MapPin, Send } from "lucide-react";

export default function Contacts() {
  return (
    <section id="contacts" className="section-padding bg-gradient-to-br from-primary-50 via-white to-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-800 mb-5">
              <MapPin className="h-4 w-4" /> Иваново и рядом
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Свяжитесь с нами удобным способом
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Оставьте заявку через калькулятор, напишите в Telegram или ВКонтакте. После обращения уточним детали, объём работ и подтвердим итоговую стоимость до начала уборки.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 md:p-8">
            <div className="space-y-4">
              <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                <span className="flex items-center gap-3">
                  <span className="h-11 w-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-slate-900">Telegram</span>
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
                    <span className="block font-bold text-slate-900">ВКонтакте</span>
                    <span className="block text-sm text-slate-500">@bread_1996</span>
                  </span>
                </span>
                <Send className="h-5 w-5 text-slate-400" />
              </a>

              <a href="#calculator" className="btn-primary w-full py-4">
                Рассчитать стоимость уборки
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
