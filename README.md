GitHub Flavored Markdown local preview
======================================

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Install](#install)
- [How to use with VIM](#how-to-use-with-vim)
- [Syntax highlighting](#syntax-highlighting)

Introduction
------------

This is a simple *GitHub Flavored Markdown* local preview for PHP users.

Requirements
------------

- PHP
- An explorer with JavaScript

Install
-------

- Simply clone this repository in your localhost
- Put the contents that you whant to preview in *temp.txt*
- Open or refresh the page in your browser.

How to use with VIM
-------------------

In your *vimrc* or *gvimrc*:

```vim
"Show the results with F9 key
autocmd BufNewFile,Bufread *.md imap <F9> <esc>:!google-chrome http://localhost/markdown<cr>i
autocmd BufNewFile,Bufread *.md map <F9> :!google-chrome http://localhost/markdown<cr>

"Copy content to temp file when save .md files
autocmd BufWritePost *.md :silent !cp '%:p' '/var/www/markdown/temp.txt'

"put a marker in char 80
autocmd BufNewFile,Bufread *.md set cc=80
```

This automatically modify the *temp.txt* when you save your *.md* files.

Syntax highlighting
-------------------

If you are a VIM user and you want syntax highlighting and matching rules for
Markdowns, look at [this project][vimmarkdown].

[vimmarkdown]: https://github.com/plasticboy/vim-markdown
