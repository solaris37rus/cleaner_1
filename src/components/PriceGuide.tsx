import { Info, Sparkles } from "lucide-react";

const rows = [
  ["Поддерживающая уборка", "150 ₽/м²", "минимум 3 000 ₽"],
  ["Генеральная уборка", "300 ₽/м²", "минимум 5 000 ₽"],
  ["После ремонта / стройки", "250 ₽/м²", "минимум 6 000 ₽"],
  ["Мойка окон", "500 ₽/створка", "рамы и подоконники уточняем"],
];

const extras = [
  "Холодильник внутри — 800 ₽",
  "Духовка — 700 ₽",
  "Микроволновка — 400 ₽",
  "Кухонные фасады — 1 000 ₽",
  "Шкаф внутри — 300 ₽",
  "Вытяжка — 500 ₽",
];

export default function PriceGuide() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-primary-100 mb-5">
              <Sparkles className="h-4 w-4" /> понятный ориентир по цене
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Прайс без сюрпризов</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Клиент сразу видит порядок стоимости. После заявки мы уточняем детали: площадь, состояние, мебель, доступ к воде и список дополнительных работ.
            </p>
            <div className="mt-6 flex gap-3 rounded-3xl bg-amber-400/10 border border-amber-300/20 p-4">
              <Info className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-50 leading-relaxed">
                Цена на сайте предварительная и не является публичной офертой. Финальную стоимость подтверждаем до начала уборки.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              {rows.map(([name, price, note], index) => (
                <div key={name} className={`grid grid-cols-1 sm:grid-cols-[1.2fr_0.7fr_0.8fr] gap-2 p-4 ${index !== rows.length - 1 ? "border-b border-white/10" : ""}`}>
                  <div className="font-bold text-white">{name}</div>
                  <div className="font-black text-primary-200">{price}</div>
                  <div className="text-sm text-slate-300">{note}</div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="font-bold mb-3">Популярные доп. услуги</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {extras.map((extra) => (
                  <div key={extra} className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-200">
                    {extra}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
