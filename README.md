Flavored markdown
=================

Command line tool that output HTML from a github flavored markdown file.

 - [Installation](#installation)
 - [Global usage](#global-usage)
 - [Library usage](#library-usage)
 - [Contribute](#contribute)
 - [How to use with VIM](#how-to-use-with-vim)

Installation:
-------------

```sh
npm intall -g flavored-markdown
```

Or

```sh
npm intall flavored-markdown
```

Global Usage:
-------------

```sh
flavored-markdown < markdown.md > markdown.html
```

Or

```sh
flavored-markdown "Some *markdown*" > markdown.html
```

Library usage:
--------------

```javascript
var markdown = require('flavored-markdown');
markdown.html("some *markdown*", function (html) {
    console.log(html);
});
```

If you want a full html with html tag and css in the header:

```javascript
var markdown = require('flavored-markdown');
markdown.useTemplate = true;
markdown.html("some *markdown*", function (html) {
    console.log(html);
});
```

Contribute
----------

You can find this project at this [GitHub repository][github]

How to use with VIM
-------------------

In your *vimrc* or *gvimrc*:

```vim
"Convert to html when save .md files
autocmd BufWritePost *.md :silent !flavored-markdown < '%:p' > /vat/tmp/markdown.html

"Show the results with F9 key
autocmd BufNewFile,Bufread *.md imap <F9> <esc>:!google-chrome /vat/tmp/markdown.html<cr>i
autocmd BufNewFile,Bufread *.md map <F9> :!google-chrome /vat/tmp/markdown.html<cr>

"put a marker in char 80
autocmd BufNewFile,Bufread *.md set cc=80
```

This automatically create a temporary file */vat/tmp/markdown.html* when you save your *.md* files.

### Syntax highlighting

If you are a VIM user and you want syntax highlighting or matching rules for
Markdowns, look at [this project][vimmarkdown].

[vimmarkdown]: https://github.com/plasticboy/vim-markdown
[github]: https://github.com/solispauwels/markdown


