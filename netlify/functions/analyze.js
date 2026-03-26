exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: `Sen Türkiye'deki markalar için uzmanlaşmış bir sosyal medya stratejisti ve içerik üreticisisin. 
Verilen web sitesi URL'sini analiz ederek marka hakkında çıkarım yap (URL yapısından, domain adından, sektörden).
Yanıtını YALNIZCA geçerli JSON olarak döndür, başka hiçbir şey yazma, markdown kullanma.
JSON yapısı şu şekilde olmalı:
{
  "brandName": "marka adı",
  "sector": "sektör",
  "shortAnalysis": "3-4 cümle marka analizi",
  "scores": {
    "contentScore": 1-100 arası sayı,
    "viralPotential": 1-100 arası sayı,
    "socialPresence": 1-100 arası sayı,
    "growthOpportunity": 1-100 arası sayı
  },
  "contentPlan": [
    { "type": "video|image|carousel|text|story", "title": "...", "desc": "..." },
    { "type": "...", "title": "...", "desc": "..." },
    { "type": "...", "title": "...", "desc": "..." },
    { "type": "...", "title": "...", "desc": "..." }
  ],
  "dailyIdeas": {
    "Pazartesi": [
      { "title": "...", "desc": "...", "platform": "Instagram|TikTok|YouTube|X", "format": "Reels|Story|Post|Video" },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." }
    ],
    "Salı": [
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." }
    ],
    "Çarşamba": [
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." }
    ],
    "Perşembe": [
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." }
    ],
    "Cuma": [
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." },
      { "title": "...", "desc": "...", "platform": "...", "format": "..." }
    ]
  },
  "viralHooks": [
    { "type": "Merak Uyandıran", "text": "hook metni", "why": "neden viral olur" },
    { "type": "Problem-Çözüm", "text": "hook metni", "why": "neden viral olur" },
    { "type": "Sosyal Kanıt", "text": "hook metni", "why": "neden viral olur" },
    { "type": "POV / Hikaye", "text": "hook metni", "why": "neden viral olur" },
    { "type": "Şok & Gerçek", "text": "hook metni", "why": "neden viral olur" },
    { "type": "Rakam & Veri", "text": "hook metni", "why": "neden viral olur" }
  ],
  "viralTexts": [
    { "platform": "Instagram Caption", "text": "..." },
    { "platform": "TikTok Açıklaması", "text": "..." },
    { "platform": "Reklam Metni (Meta)", "text": "..." }
  ]
}`,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
