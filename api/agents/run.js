import { handleRequest } from "../../dist/src/runtime/local-server.js";

export default async function handler(req, res) {
  if (!req.body) {
    const chunks = [];
    for await (const chunk of req) chunks.push(Buffer.from(chunk));
    const raw = Buffer.concat(chunks).toString("utf8").trim();
    if (raw) req.body = JSON.parse(raw);
  }
  return handleRequest(req, res);
}
