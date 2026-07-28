import { handleRequest } from "../../dist/src/runtime/local-server.js";

export default function handler(req, res) {
  return handleRequest(req, res);
}