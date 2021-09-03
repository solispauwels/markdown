#!/usr/bin/env node
import Markdown from '../flavored-markdown.js'

const data = process.argv[2]
const markdown = new Markdown(true)

const writeData = data => {
  process.stdout.write(data + '\n')
  process.exit(0)
}

if (data) {
  markdown.html(data).then(writeData)
} else {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (data) => markdown.html(data).then(writeData))
}
