import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Reads the contents of an `input.txt` file associated with the executed module.
 * @param importMetaUrl - The full URL to the executed module, passed by the invoking module.
 * @returns The contents of the input file.
 * @throws {Error} If the file in the module directory does not exist.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta}
 */
export function readInput(importMetaUrl: string) {
  const __filename = fileURLToPath(importMetaUrl)
  const __dirname = path.dirname(__filename)
  return fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
}
