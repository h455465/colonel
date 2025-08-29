// index.js
import { voiceClient } from "./client.js";
import tokens from "./tokens.js";
import express from "express";

const app = express();

// استخدام بورت Render أو 3000 محلي
const port = process.env.PORT || 3000;
// عنوان الموقع على Render أو محلي
const host = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

let uptimeDate = Date.now();
let requests = 0;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`✅ Server running at ${host}`);
});

// التعامل مع الأخطاء العامة
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Self-ping كل 15 ثانية لتجنب إيقاف السيرفر
setInterval(async () => {
  try {
    const response = await fetch(host, { method: "HEAD" });
    requests += 1;
    console.log(`🔄 Ping ${requests}: ${response.status}`);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
}, 15000);

// تنظيف التوكنات قبل التشغيل
const cleanTokens = tokens.reduce((acc, token) => {
  const isValid = token?.token?.length > 30;
  const isDuplicate = acc.some((t) => t.token === token.token);
  if (isValid && !isDuplicate) {
    acc.push(token);
  } else {
    console.warn("⚠️ Invalid or duplicate token configuration:", token);
  }
  return acc;
}, []);

// تشغيل عملاء Discord
for (const token of cleanTokens) {
  const client = new voiceClient(token);

  client.on("ready", (user) => {
    console.log(`🎤 Logged in as ${user.username}#${user.discriminator}`);
  });
  client.on("connected", () => {
    console.log("✅ Connected to Discord");
  });
  client.on("disconnected", () => {
    console.log("❌ Disconnected from Discord");
  });
  client.on("voiceReady", () => {
    console.log("🎧 Voice is ready");
  });
  client.on("error", (error) => {
    console.error("Error:", error);
  });
  client.on("debug", (message) => {
    console.debug(message);
  });

  client.connect();
}
