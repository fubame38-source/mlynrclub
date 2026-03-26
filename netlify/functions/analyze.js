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
        system: "Sen Türkiye'deki markalar için uzmanlaşmış bir sosyal medya stratejisti ve içerik üreticisisin. Verilen web sitesi URL'sini analiz ederek marka hakkında çıkarım yap. Yanıtını YALNIZCA geçerli JSON olarak döndür, başka hiçbir şey yazma, markdown kullanma, kod bloğu kullanma. Sadece { ile başlayan ve } ile biten düz JSON döndür. JSON yapısı: {\"brandName\":\"marka adı\",\"sector\":\"sektör\",\"shortAnalysis\":\"3-4 cümle analiz\",\"scores\":{\"contentScore\":72,\"viralPotential\":65,\"socialPresence\":58,\"growthOpportunity\":81},\"contentPlan\":[{\"type\":\"video\",\"title\":\"...\",\"desc\":\"...\"},{\"type\":\"image\",\"title\":\"...\",\"desc\":\"...\"},{\"type\":\"carousel\",\"title\":\"...\",\"desc\":\"...\"},{\"type\":\"story\",\"title\":\"...\",\"desc\":\"...\"}],\"dailyIdeas\":{\"Pazartesi\":[{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Reels\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"TikTok\",\"format\":\"Video\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Story\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Post\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"YouTube\",\"format\":\"Short\"}],\"Salı\":[{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Reels\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"TikTok\",\"format\":\"Video\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Carousel\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"X\",\"format\":\"Post\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Story\"}],\"Çarşamba\":[{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Reels\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"TikTok\",\"format\":\"Video\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Post\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"YouTube\",\"format\":\"Short\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Story\"}],\"Perşembe\":[{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Reels\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"TikTok\",\"format\":\"Video\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Carousel\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Story\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"X\",\"format\":\"Post\"}],\"Cuma\":[{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Reels\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"TikTok\",\"format\":\"Video\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Post\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"YouTube\",\"format\":\"Short\"},{\"title\":\"...\",\"desc\":\"...\",\"platform\":\"Instagram\",\"format\":\"Story\"}]},\"viralHooks\":[{\"type\":\"Merak Uyandıran\",\"text\":\"hook\",\"why\":\"neden viral\"},{\"type\":\"Problem-Çözüm\",\"text\":\"hook\",\"why\":\"neden viral\"},{\"type\":\"Sosyal Kanıt\",\"text\":\"hook\",\"why\":\"neden viral\"},{\"type\":\"POV / Hikaye\",\"text\":\"hook\",\"why\":\"neden viral\"},{\"type\":\"Şok & Gerçek\",\"text\":\"hook\",\"why\":\"neden viral\"},{\"type\":\"Rakam & Veri\",\"text\":\"hook\",\"why\":\"neden viral\"}],\"viralTexts\":[{\"platform\":\"Instagram Caption\",\"text\":\"...\"},{\"platform\":\"TikTok Açıklaması\",\"text\":\"...\"},{\"platform\":\"Reklam Metni (Meta)\",\"text\":\"...\"}]}",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const anthropicData = await response.json();
    const textContent = (anthropicData.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ result: textContent })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
