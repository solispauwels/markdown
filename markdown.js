markdown = $("article.markdown-body xmp").html();

$.ajax({
  type: "POST",
  url: "https://api.github.com/markdown",
  data: JSON.stringify({
    "text": markdown,
    "mode": "gfm",
    "context": "github/claroline"
  })
})
.done(
    function (data){
        $("article.markdown-body").html(data.replace(/<br>/g, " "));
        $("article.markdown-body").css("visibility", "visible");

    }
);
