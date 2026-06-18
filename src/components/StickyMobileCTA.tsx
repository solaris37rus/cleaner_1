import { Calculator, MessageCircle } from "lucide-react";

export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href="#calculator" className="btn-primary py-3 text-sm rounded-xl">
          <Calculator className="h-4 w-4" /> Рассчитать
        </a>
        <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="btn-outline py-3 text-sm rounded-xl">
          <MessageCircle className="h-4 w-4 text-sky-500" /> Telegram
        </a>
      </div>
    </div>
  );
}
