import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export function readInput(importMetaUrl: string) {
  const __filename = fileURLToPath(importMetaUrl)
  const __dirname = path.dirname(__filename)
  return fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
}
