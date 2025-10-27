// Cloudflare Worker для отправки заказов в Telegram Bot
// БЕЗОПАСНО для публичного GitHub - НЕ содержит токенов!
// Токены хранятся в GitHub Secrets и добавляются автоматически

export default {
  async fetch(request, env) {
    // Security: Check origin (optional but recommended)
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
      'https://burger22.pl',
      'https://www.burger22.pl',
      'http://localhost:8000',
      'http://127.0.0.1:8000',
      // Добавь свой домен GitHub Pages если используешь
    ];

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Security: Verify origin (можно отключить для тестирования)
    // if (origin && !allowedOrigins.includes(origin)) {
    //   return new Response('Forbidden', { status: 403 });
    // }

    try {
      // Get order data from request
      const orderData = await request.json();

      // Get Telegram bot token from environment variables
      const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;

      if (!TELEGRAM_BOT_TOKEN) {
        return new Response('Server configuration error', { status: 500 });
      }

      // Get Chat ID automatically
      const chatId = await getChatId(TELEGRAM_BOT_TOKEN, env);

      if (!chatId) {
        return new Response('Chat ID not found. Please send any message to your bot first.', {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Format message for Telegram
      const message = formatTelegramMessage(orderData);

      // Send message to Telegram
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!telegramResponse.ok) {
        console.error('Telegram API error:', await telegramResponse.text());
        return new Response('Failed to send order', { status: 500 });
      }

      // Return success response with CORS headers
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      console.error('Error processing order:', error);
      return new Response('Internal server error', {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
};

// Automatically get Chat ID from Telegram updates
async function getChatId(botToken, env) {
  // Check if we already have a cached chat ID
  if (env.CACHED_CHAT_ID) {
    return env.CACHED_CHAT_ID;
  }

  try {
    // Get updates from Telegram
    const updatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates?limit=1&offset=-1`;
    const response = await fetch(updatesUrl);
    const data = await response.json();

    if (data.ok && data.result && data.result.length > 0) {
      const chatId = data.result[0].message?.chat?.id;

      if (chatId) {
        // Note: We can't actually cache this in environment variables automatically,
        // but it will work for this request. You should manually add TELEGRAM_CHAT_ID
        // to environment variables after first successful order for better performance.
        return chatId.toString();
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting chat ID:', error);
    return null;
  }
}

function formatTelegramMessage(orderData) {
  const { name, phone, pickupTime, paymentMethod, comments, items, total, lang } = orderData;

  // Pickup time labels
  const pickupTimeLabels = {
    pl: {
      asap: 'Jak najszybciej',
      '15min': 'Za 15 minut',
      '30min': 'Za 30 minut',
      '45min': 'Za 45 minut',
      '60min': 'Za 1 godzinę'
    },
    en: {
      asap: 'As soon as possible',
      '15min': 'In 15 minutes',
      '30min': 'In 30 minutes',
      '45min': 'In 45 minutes',
      '60min': 'In 1 hour'
    }
  };

  // Payment method labels
  const paymentLabels = {
    pl: {
      cash: 'Gotówka',
      card: 'Karta'
    },
    en: {
      cash: 'Cash',
      card: 'Card'
    }
  };

  const currentLang = lang || 'pl';

  // Build message with HTML formatting
  let message = `<b>🍔 NOWE ZAMÓWIENIE - Burger 22</b>\n\n`;

  message += `<b>Imię:</b> ${name}\n`;
  message += `<b>Telefon:</b> ${phone}\n`;
  message += `<b>Odbiór:</b> ${pickupTimeLabels[currentLang][pickupTime] || pickupTime}\n`;
  message += `<b>Płatność:</b> ${paymentLabels[currentLang][paymentMethod] || paymentMethod}\n\n`;

  message += `<b>Zamówienie:</b>\n`;

  items.forEach(item => {
    message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity} zł\n`;
  });

  message += `\n<b>RAZEM: ${total} zł</b>`;

  if (comments) {
    message += `\n\n<b>Uwagi:</b>\n${comments}`;
  }

  return message;
}
