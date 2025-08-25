// index.js  —  ES-module
function highlight() {
  const lang = $('#lang').val();
  const code = $('#input textarea').val();

  $('#output')
    .empty()
    .html(`<pre class="brush: ${lang}; toolbar:false;">${code}</pre>`);

  // run highlighter
  SyntaxHighlighter.highlight({}, $('#output pre')[0]);

  // remember language
  document.cookie = `lang=${lang}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function loadLang() {
  const m = document.cookie.match(/(?:^|; )lang=([^;]*)/);
  if (m) $('#lang').val(decodeURIComponent(m[1]));
}

$(() => {
  loadLang();
  highlight();                 // initial render
  $('#input textarea, #lang').on('input change', highlight);

  $('#copyBtn').on('click', () => {
    const range = document.createRange();
    range.selectNodeContents($('#output .syntaxhighlighter')[0]);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
  });
});
