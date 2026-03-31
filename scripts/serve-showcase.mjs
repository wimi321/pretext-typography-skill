import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const port = Number(process.env.PORT || 4173)
const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.json', 'application/json; charset=utf-8'],
])

const server = http.createServer(async (req, res) => {
  const rawPath = req.url === '/' ? '/showcase/index.html' : req.url || '/showcase/index.html'
  const safePath = path.normalize(rawPath).replace(/^\.+/, '')
  const filePath = path.join(root, safePath)
  try {
    const content = await fs.readFile(filePath)
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': mimeTypes.get(ext) || 'application/octet-stream' })
    res.end(content)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
  }
})

server.listen(port, () => {
  console.log(`Showcase running at http://127.0.0.1:${port}/showcase/`)
})
