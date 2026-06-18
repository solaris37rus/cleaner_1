import { ArrowRight, CheckCircle2, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  const benefits = [
    "Семейный подход",
    "Работаем по Иваново",
    "Цена до заявки",
    "Бережно к вещам",
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-sky-50 section-padding pb-20 pt-14 lg:pb-28 lg:pt-24">
      <div className="absolute right-[-10%] top-[-20%] -z-0 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="absolute left-[-12%] bottom-[-20%] -z-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="badge-soft">
                <MapPin className="h-4 w-4" /> Иваново
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 shadow-sm">
                <Star className="h-4 w-4 text-amber-500" /> уборка без лишней суеты
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:leading-[1.04]">
              Клининг в Иваново для тех, кто хочет прийти в <span className="text-primary-600">чистый дом</span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl">
              Поддерживающая и генеральная уборка, уборка после ремонта, мойка окон, шкафов и кухонной техники. Выберите услуги, получите предварительную цену и отправьте заявку в Telegram или VK.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#calculator" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary-500/25">
                Рассчитать стоимость <ArrowRight className="h-5 w-5" />
              </a>
              <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-8 py-4">
                <MessageCircle className="h-5 w-5 text-sky-500" /> Написать сразу
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-white/80 p-3 border border-slate-200 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary-500 mb-2" />
                  <span className="text-sm font-bold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="premium-card p-5 md:p-7">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-primary-100 via-white to-sky-100 p-6 md:p-8 border border-white">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-3xl font-black text-primary-700">150₽</div>
                    <div className="text-sm text-slate-500">поддерживающая / м²</div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-3xl font-black text-primary-700">500₽</div>
                    <div className="text-sm text-slate-500">мойка окна / створка</div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="h-11 w-11 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-black text-slate-950 text-xl">Предварительная цена сразу</h2>
                      <p className="text-sm text-slate-500">Без звонка, регистрации и ожидания менеджера.</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>Квартира 50 м²</span><b>от 7 500 ₽</b></div>
                    <div className="flex justify-between border-b border-slate-100 pb-2"><span>Генеральная 40 м²</span><b>от 12 000 ₽</b></div>
                    <div className="flex justify-between"><span>Окна 4 створки</span><b>от 2 000 ₽</b></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-3 sm:-left-6 rounded-3xl bg-slate-950 p-4 text-white shadow-2xl max-w-xs">
              <div className="text-sm font-bold text-primary-200">Важно</div>
              <p className="text-sm text-slate-200">Финальную цену подтверждаем после уточнения загрязнения и объёма работ.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
