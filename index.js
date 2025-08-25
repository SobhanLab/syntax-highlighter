import SyntaxHighlighter from "./assets/syntaxhighlighter.js";

let highlighter = SyntaxHighlighter;

// Function to highlight code
function highlight() {
  let lang = $("#select").val();
  let input = $("#input textarea").val();

  console.log("Language: " + lang + "\nInput: " + input);

  $("#result").html(`
    <pre class="brush: ${lang}">${input}</pre>
  `);

  highlighter();

  // Save selected language in cookie
  document.cookie = "lang=" + lang + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

// Copy highlighted code to clipboard
$("#copy").click(function () {
  const codeElement = $("#result .syntaxhighlighter")[0];
  if (!codeElement) return; // nothing to copy

  const textToCopy = codeElement.innerText;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});

// Highlight on textarea input
$("#input textarea").on("change keyup paste", function () {
  highlight();
});

// Highlight on language selection change
$("#select").change(function () {
  highlight();
});

// Helper function to get cookie value
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Restore selected language from cookie
$(document).ready(function () {
  const storedLang = getCookie("lang");
  if (storedLang) {
    $("#select").val(storedLang);
  }

  // Initial highlight
  highlight();
});
