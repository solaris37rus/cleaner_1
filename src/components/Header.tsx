import { MessageCircle, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
      <div className="container-custom py-3 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2" aria-label="На главную">
          <span className="h-10 w-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black text-slate-950">ЧистоИваново</span>
            <span className="hidden sm:block text-xs font-semibold text-slate-500">семейный клининг</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          <a href="#services" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Услуги</a>
          <a href="#calculator" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Калькулятор</a>
          <a href="#how-it-works" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Как работаем</a>
          <a href="#faq" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Вопросы</a>
          <a href="#contacts" className="text-sm font-bold text-slate-600 hover:text-primary-600 transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://t.me/gyrman37"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-sky-500" />
            @gyrman37
          </a>
          <a href="#calculator" className="btn-primary py-2.5 px-4 text-sm rounded-xl">
            Рассчитать
          </a>
        </div>
      </div>
    </header>
  );
}
