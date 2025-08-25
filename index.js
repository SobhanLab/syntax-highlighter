// index.js
function highlight() {
  const lang = $('#lang').val();
  const code = $('#input textarea').val();
  $('#output').html(`<pre class="brush: ${lang}; toolbar: false;">${code}</pre>`);
  SyntaxHighlighter.highlight({}, $('#output pre')[0]);
  document.cookie = `lang=${lang}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

function loadLang() {
  const m = document.cookie.match(/(?:^|; )lang=([^;]*)/);
  if (m) $('#lang').val(decodeURIComponent(m[1]));
}

function copyAsRTF() {
  const sh = $('#output .syntaxhighlighter')[0];
  if (!sh) return;

  let rtf = "{\\rtf1\\ansi\\deff0\n{\\fonttbl{\\f0 Consolas;}}\n\\f0\\fs20 ";
  const lines = sh.querySelectorAll('.line');

  lines.forEach(line => {
    const spans = line.querySelectorAll('span');
    spans.forEach(span => {
      const text = span.textContent
        .replace(/[\\{}]/g, '\\$&')
        .replace(/\r?\n/g, ' ')
        .replace(/\t/g, '\\tab ');
      const rgb = window.getComputedStyle(span).color.match(/\d+/g).map(Number);
      rtf += `\\red${rgb[0]}\\green${rgb[1]}\\blue${rgb[2]} ${text}\\cf0 `;
    });
    rtf += "\\par\n";
  });
  rtf += "}";

  // modern clipboard
  const blob = new Blob([rtf], { type: 'application/rtf' });
  navigator.clipboard.write([new ClipboardItem({ 'text/rtf': blob })])
    .catch(() => fallbackCopy(rtf));
}

function fallbackCopy(rtf) {
  const ta = document.createElement('textarea');
  ta.value = rtf;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

$(() => {
  loadLang();
  highlight();
  $('#input textarea, #lang').on('input change', highlight);
  $('#copyBtn').on('click', copyAsRTF);
});
