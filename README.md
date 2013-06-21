Flavored Markdown local preview
===============================

How to use with **vim**:

```vim
"Show the results with F9 key
autocmd BufNewFile,Bufread *.md imap <F9> <esc>:!google-chrome http://localhost/markdown<cr>i
autocmd BufNewFile,Bufread *.md map <F9> :!google-chrome http://localhost/markdown<cr>

"Copy content to temp file when save .md files
autocmd BufWritePost *.md :silent !cp '%:p' /var/www/markdown/temp.txt

"put a marker in char 80
autocmd BufNewFile,Bufread *.md set cc=80
```

