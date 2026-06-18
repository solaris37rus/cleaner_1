import { Calculator, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const items = [
  { icon: <MapPin className="h-5 w-5" />, title: "Иваново и Кохма", text: "местная семейная команда" },
  { icon: <Calculator className="h-5 w-5" />, title: "Расчёт за минуту", text: "стоимость видна до заявки" },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Без скрытых доплат", text: "финальную цену подтверждаем заранее" },
  { icon: <MessageCircle className="h-5 w-5" />, title: "Telegram / VK", text: "быстрая связь без регистрации" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="container-custom py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div className="h-11 w-11 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-black text-slate-900">{item.title}</div>
                <div className="text-sm text-slate-500">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
