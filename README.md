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
npm install -g flavored-markdown
```

Or

```sh
npm install flavored-markdown
```

Global Usage:
-------------

```sh
flavored-markdown < markdown.md > markdown.html
```

Or for better file escaping text

```sh
flavored-markdown "$(< markdown.md)" > markdown.html
```

Or

```sh
flavored-markdown "Some *markdown*" > markdown.html
```

Library usage:
--------------

```javascript
import Markdown from 'flavored-markdown'
const markdown = new Markdown()
markdown.html("some *markdown*").then(html => console.log(html))
```

If you want a full html with html tag and css in the header:

```javascript
import Markdown from 'flavored-markdown'
const markdown = new Markdown(true)
markdown.html("some *markdown*").then(html => console.log(html))
```

Contribute
----------

You can find this project at this [GitHub repository][github]

How to use with VIM
-------------------

In your *vimrc* or *gvimrc*:

```vim
"Convert to html when save .md files
autocmd BufWritePost *.md :silent !flavored-markdown < '%:p' > /var/tmp/markdown.html

"Show the results with F9 key
autocmd BufNewFile,Bufread *.md imap <F9> <esc>:!google-chrome /var/tmp/markdown.html<cr>i
autocmd BufNewFile,Bufread *.md map <F9> :!google-chrome /var/tmp/markdown.html<cr>

"put a marker in char 80
autocmd BufNewFile,Bufread *.md set cc=80
```

This automatically create a temporary file */var/tmp/markdown.html* when you save your *.md* files.

### Syntax highlighting

If you are a VIM user and you want syntax highlighting or matching rules for
Markdowns, look at [this project][vimmarkdown].

[vimmarkdown]: https://github.com/plasticboy/vim-markdown
[github]: https://github.com/solispauwels/markdown


