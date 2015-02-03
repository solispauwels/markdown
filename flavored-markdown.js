var https = require('https');
var fs = require('fs');
var path = require('path');

/**
 * Flavored markdown library.
 *
 * You can change Markdown.useTemplate in order to allow an HTML template.
 *
 * @constructor
 */
var Markdown = function () {
    this.output = '';
    this.useTemplate = false;
    this.responseEncoding = 'utf8';
    this.markdownMode = 'gfm';
    this.context = 'solispauwels/markdown';
    this.hostname = 'api.github.com';
    this.path = '/markdown';
    this.method = 'POST';
    this.contentType = 'application/json';
    this.userAgent ='Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)';
    this.templateFile = path.normalize(path.join(__dirname, 'template.html'));
    this.headings = new RegExp('<h([1-6])>(.*?)<\/h([1-6])>', 'g');
    this.reference = new RegExp('[^a-zA-Z0-9\-]', 'g');
    this.spaces = new RegExp('\\s+', 'g');
    this.breakline = new RegExp('<br>', 'g');
};

/**
 * Transform markdown into HTML.
 *
 * @param {string} markdown The markdown input.
 * @param {function} callback A call back function that process the output HTML.
 */
Markdown.prototype.html = function (markdown, callback) {
    this.markdown = markdown;
    this.callback = callback;
    this.data = this.getData();
    this.options = this.getOptions();

    var request = https.request(this.options, this.response.bind(this));

    request.on('error', this.error.bind(this));

    request.write(this.data);
    request.end();
};

/**
 * Response method triger when request to github API.
 *
 * @param {string} response The output HTML.
 */
Markdown.prototype.response = function (response) {
    response.setEncoding(this.responseEncoding);
    response.on('data', this.addHTML.bind(this));
    response.on('end', this.template.bind(this));
};

/**
 * Add html to the output html (this is made by parts cause big post request)
 *
 * @param {string} html The html
 */
Markdown.prototype.addHTML = function (html) {
    this.output += html;
};

/**
 * Error method that fires in case of an error in the request to github API.
 *
 * @param {object} error The error object.
 */
Markdown.prototype.error = function(error) {
    throw Error('problem with request: ' + error.message);
};

/**
 * Initialize the json data used in github API.
 *
 * @return {string} The data json in string mode.
 */
Markdown.prototype.getData = function () {
    return JSON.stringify({
        text: this.markdown,
        mode: this.markdownMode,
        context: this.context
    });
};

/**
 * Initialize the options used in the request to the github API.
 *
 * return {object} An object containing the options.
 */
Markdown.prototype.getOptions= function () {
    return {
        hostname: this.hostname,
        path: this.path,
        method: this.method,
        headers: {
            'User-Agent': this.userAgent,
            'Content-Type': this.contentType,
            'Content-Length': this.data.length
        }
    };
};

/**
 * If this.useTemplate is true a template will be used in the HTML output.
 */
Markdown.prototype.template = function () {
    if (this.useTemplate) {
        this.output = fs.readFileSync(this.templateFile, 'utf-8').replace('{{ markdown }}', this.output);
    }

    this.callback(this.output.replace(this.headings, this.heading.bind(this)).replace(this.breakline, ' '));
};

/**
 * Add href to the html headings
 *
 * @param {string} heading The original heading string to replace.
 * @param {string} number The heading number.
 * @param {string} content The content of the heading.
 *
 * @return {string} The heading with a href
 */
Markdown.prototype.heading = function (heading, number, content) {
    var link = content.replace(this.spaces, '-').replace(this.reference, '').toLowerCase();

    if (link) {
        return '<h' + number + '><a name="' + link + '"></a>' + content + '</h' + number + '>';
    }

    return heading;
};

module.exports = new Markdown();
