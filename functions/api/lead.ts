// Cloudflare Pages Function: POST /api/lead
// Sends lead data from the cleaning calculator to Telegram Bot API.

type ExtraServicePayload = {
  name?: string;
  price?: number;
  type?: "count" | "boolean";
  count?: number;
};

type LeadPayload = {
  name?: string;
  phone?: string;
  address?: string;
  date?: string;
  comment?: string;
  rawText?: string;
  order?: {
    roomType?: string;
    area?: number;
    serviceType?: string;
    windowsCount?: number;
    extras?: ExtraServicePayload[];
    complexDirt?: boolean;
    total?: number;
  };
};

type PagesContext = {
  request: Request;
  env: {
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
  };
};

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function cleanText(value: unknown, fallback = "Не указано") {
  // eslint-disable-next-line no-control-regex
  const text = String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim();
  return text || fallback;
}

function cleanNumber(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function formatMoney(value: unknown) {
  return `${Math.round(cleanNumber(value)).toLocaleString("ru-RU")} ₽`;
}

function buildTelegramMessage(payload: LeadPayload) {
  if (payload.rawText && !payload.order) {
    return cleanText(payload.rawText).slice(0, 3800);
  }

  const order = payload.order ?? {};
  const serviceType = cleanText(order.serviceType);
  const isWindowCleaning = serviceType === "Мойка окон";
  const extras = Array.isArray(order.extras) ? order.extras : [];
  const extrasText = extras.length
    ? extras
        .map((extra) => {
          const count = cleanNumber(extra.count, 0);
          const countText = extra.type === "count" && count > 0 ? ` x${count}` : "";
          const priceText = extra.price ? ` — ${formatMoney(extra.price * Math.max(count, 1))}` : "";
          return `• ${cleanText(extra.name)}${countText}${priceText}`;
        })
        .join("\n")
    : "Не выбраны";

  const measureLabel = isWindowCleaning ? "Количество створок" : "Площадь";
  const measureValue = isWindowCleaning
    ? `${cleanNumber(order.windowsCount)} шт.`
    : `${cleanNumber(order.area)} м²`;

  return [
    "🧽 Новая заявка на клининг — Иваново",
    "",
    `👤 ФИО: ${cleanText(payload.name)}`,
    `📞 Телефон: ${cleanText(payload.phone)}`,
    `📍 Адрес: ${cleanText(payload.address)}`,
    `📅 Дата/время: ${cleanText(payload.date, "Не указано")}`,
    "",
    `🏠 Тип помещения: ${cleanText(order.roomType)}`,
    `📐 ${measureLabel}: ${measureValue}`,
    `🧹 Основная услуга: ${serviceType}`,
    `⚠️ Сложное загрязнение: ${order.complexDirt ? "Да, +20%" : "Нет"}`,
    "",
    "➕ Дополнительные услуги:",
    extrasText,
    "",
    `💬 Комментарий: ${cleanText(payload.comment, "Без комментария")}`,
    `💰 Предварительная стоимость: ~ ${formatMoney(order.total)}`,
    "",
    "Важно: цена предварительная. Итог зависит от объёма работ, степени загрязнения, количества мебели, труднодоступных зон и дополнительных пожеланий.",
    "Источник: сайт",
  ].join("\n").slice(0, 3800);
}

function validatePayload(payload: LeadPayload) {
  const errors: string[] = [];
  if (!cleanText(payload.name, "")) errors.push("Укажите ФИО");
  if (!cleanText(payload.phone, "")) errors.push("Укажите телефон");
  if (!cleanText(payload.address, "")) errors.push("Укажите адрес");
  if (!payload.order && !payload.rawText) errors.push("Не переданы выбранные услуги");
  return errors;
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: jsonHeaders });
}

export async function onRequestPost(context: PagesContext) {
  try {
    const { request, env } = context;

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return jsonResponse(
        {
          success: false,
          error: "Telegram не настроен: добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в Cloudflare Pages.",
        },
        500,
      );
    }

    let payload: LeadPayload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ success: false, error: "Некорректный JSON в заявке." }, 400);
    }

    const errors = validatePayload(payload);
    if (errors.length) {
      return jsonResponse({ success: false, error: errors.join(". ") }, 400);
    }

    const text = buildTelegramMessage(payload);
    const telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    const telegramData = await telegramResponse.json().catch(() => null) as { ok?: boolean; description?: string } | null;

    if (!telegramResponse.ok || !telegramData?.ok) {
      const reason = telegramData?.description || `Telegram API status ${telegramResponse.status}`;
      return jsonResponse({ success: false, error: `Telegram не принял заявку: ${reason}` }, 502);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Lead function error", error);
    return jsonResponse({ success: false, error: "Внутренняя ошибка сервера." }, 500);
  }
}

export function onRequestGet() {
  return jsonResponse({ success: true, message: "Lead endpoint is ready. Use POST /api/lead." });
}
