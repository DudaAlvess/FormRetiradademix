import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const root = normalize(process.cwd());
const port = Number(process.env.PORT || 8000);
const host = "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const safePath = normalize(join(root, decodeURIComponent(url.pathname)));
  const filePath = safePath.startsWith(root) ? safePath : root;
  const finalPath = existsSync(filePath) && statSync(filePath).isDirectory()
    ? join(filePath, "index.html")
    : filePath;

  if (!existsSync(finalPath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo nao encontrado.");
    return;
  }

  response.writeHead(200, { "Content-Type": types[extname(finalPath)] || "application/octet-stream" });
  createReadStream(finalPath).pipe(response);
}).listen(port, host, () => {
  console.log(`Retirada de Mix em http://${host}:${port}`);
});
