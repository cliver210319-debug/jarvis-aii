import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3000);
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const apiKey = process.env.GEMINI_API_KEY;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, configured: Boolean(apiKey), model });
});

app.post('/api/chat', async (req, res) => {
  try {
    if (!apiKey) {
      return res.status(503).json({ error: 'El servidor todavía no tiene configurada la clave de Gemini.' });
    }
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message || message.length > 4000) {
      return res.status(400).json({ error: 'Escribe un mensaje de hasta 4000 caracteres.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: 'Eres JARVIS, un asistente útil, claro y respetuoso. Responde en español salvo que el usuario pida otro idioma. No afirmes que has enviado mensajes, leído cuentas o realizado acciones externas si no tienes una integración autorizada que lo confirme.'
      }
    });

    res.json({ reply: result.text || 'No recibí una respuesta de texto.' });
  } catch (error) {
    console.error('Gemini request failed:', error?.message || error);
    res.status(500).json({ error: 'No se pudo obtener una respuesta. Revisa la configuración del servidor y vuelve a intentarlo.' });
  }
});

app.listen(port, () => {
  console.log(`JARVIS AI listo en http://localhost:${port}`);
});
