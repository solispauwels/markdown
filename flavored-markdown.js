import fetch from 'node-fetch'
import fs from 'fs'
import { dirname, normalize, join } from 'path'
import { fileURLToPath } from 'url'

/**
 * Flavored markdown library.
 */
export default class Markdown {
  /**
   * @constructor
   *
   * @param useTemplate If set to true, an HTML template is used.
   * @param context The context to send to the github api.
   * @param markdownMode The markdown mode, gfm is the default one.
   */
  constructor (useTemplate = false, context = 'solispauwels/markdown', markdownMode = 'gfm') {
    this.useTemplate = useTemplate
    this.markdownMode = markdownMode
    this.context = context

    this.templateFile = normalize(join(dirname(fileURLToPath(import.meta.url)), 'template.html'))
    this.headings = /<h([1-6])>(.*?)<\/h([1-6])>/g
    this.reference = /[^a-zA-Z0-9-]/g
    this.spaces = /'\\s+/g
    this.breakline = /<br>/g
  }

  /**
   * Transform markdown into HTML.
   *
   * @param {string} markdown The markdown input.
   *
   * @return {Promise} A promise that on success resolves the output HTML.
   */
  html (markdown) {
    return fetch('https://api.github.com/markdown', this.getOptions(markdown))
      .then(data => data.text())
      .then(text => this.response(text))
      .catch(error => this.error(error))
  }

  /**
   * If this.useTemplate is true a template will be used in the HTML output.
   */
  response (data) {
    return this.useTemplate
      ? fs.readFileSync(this.templateFile, 'utf-8').replace('{{ markdown }}', data)
      : data.replace(this.headings, this.heading.bind(this)).replace(this.breakline, ' ')
  }

  /**
   * Error method that fires in case of an error in the request to github API.
   *
   * @param {object} error The error object.
   */
  error (error) {
    throw Error('problem with request: ' + error.message)
  }

  /**
   * Initialize the options used in the request to the github API.
   *
   * return {object} An object containing the options.
   */
  getOptions (text) {
    return {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        mode: this.markdownMode,
        context: this.context
      })
    }
  }

  /**
   * Add href to the html headings
   *
   * @param {string} heading The original heading string to replace.
   * @param {string} number The heading number.
   * @param {string} content The content of the heading.
   *
   * @return {string} The heading with a href
   */
  heading (heading, number, content) {
    const link = content.replace(this.spaces, '-').replace(this.reference, '').toLowerCase()

    if (link) {
      return '<h' + number + '><a name="' + link + '"></a>' + content + '</h' + number + '>'
    }

    return heading
  }
}
