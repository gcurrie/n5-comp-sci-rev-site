/* ── Lightweight syntax highlighter ───────────────────────────
   Colours code blocks for Python, SQA Reference Language, and SQL.
   Token-based, no dependencies. Runs over every code block on the
   page and wraps tokens in spans that are coloured by the .tok-*
   rules in style.css.

   Default mode covers Python + SQA Reference Language (they can mix).
   SQL blocks are highlighted with a separate keyword set and are
   opted-in by adding the class "code-sql" to the .code-block (or by
   giving the <pre>/<code> that class). This keeps SQL keywords such
   as SELECT, WHERE, GROUP BY, ORDER BY consistent with the rest.

   It is deliberately simple (regex tokens, not a full parser), so it
   is ~right rather than perfect — good enough for teaching snippets.
--------------------------------------------------------------- */
(function () {
  /* Keywords are case-sensitive: Python is lower-case, SQA Reference
     Language is UPPER-CASE. Both forms are included where they overlap
     so a lower-case Python variable never matches an SQA keyword. */
  const KEYWORDS = new Set([
    /* Python */
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'and', 'or',
    'not', 'import', 'from', 'as', 'break', 'continue', 'pass', 'global', 'is',
    'with', 'try', 'except', 'finally', 'lambda', 'del', 'yield', 'class',
    /* SQA Reference Language */
    'DECLARE', 'AS', 'ARRAY', 'OF', 'RECORD', 'INITIALLY', 'SET', 'TO', 'SEND',
    'RECEIVE', 'FROM', 'DISPLAY', 'KEYBOARD', 'IF', 'THEN', 'ELSE', 'END', 'FOR',
    'WHILE', 'DO', 'REPEAT', 'UNTIL', 'PROCEDURE', 'FUNCTION', 'RETURNS',
    'RETURN', 'CALL', 'AND', 'OR', 'NOT', 'MOD', 'CASE', 'OTHERWISE', 'STRING',
    'INTEGER', 'INT', 'REAL', 'BOOLEAN', 'OPEN', 'CLOSE', 'READING', 'WRITING'
  ]);

  const CONSTS = new Set(['True', 'False', 'None', 'TRUE', 'FALSE', 'NULL']);

  /* SQL keywords (upper-case; SQL identifiers are lower/camelCase so they
     never collide). Aggregate functions such as COUNT/SUM/AVG are coloured
     as functions by the "followed by (" rule, so they are not listed here. */
  const SQL_KEYWORDS = new Set([
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'LIKE', 'IN', 'IS',
    'BETWEEN', 'EXISTS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'ASC', 'DESC',
    'DISTINCT', 'AS', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'TO', 'CREATE', 'TABLE'
  ]);

  const SQL_CONSTS = new Set(['TRUE', 'FALSE', 'NULL']);

  /* comment | string | number | word | bracket */
  const RE = /(#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\b\d+\.?\d*\b)|([A-Za-z_][A-Za-z0-9_]*)|([()\[\]{}])/g;

  /* SQL: line comments use --, and [bracketed aliases] read as strings. */
  const RE_SQL = /(--[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\[[^\]\n]*\])|(\b\d+\.?\d*\b)|([A-Za-z_][A-Za-z0-9_]*)|([()])/g;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function wrap(cls, txt) {
    return '<span class="' + cls + '">' + esc(txt) + '</span>';
  }

  function highlight(text, sql) {
    const re = sql ? RE_SQL : RE;
    const kw = sql ? SQL_KEYWORDS : KEYWORDS;
    const cn = sql ? SQL_CONSTS : CONSTS;
    let out = '';
    let last = 0;
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      out += esc(text.slice(last, m.index));
      const tok = m[0];
      if (m[1]) {
        out += wrap('tok-comment', tok);
      } else if (m[2]) {
        out += wrap('tok-string', tok);
      } else if (m[3]) {
        out += wrap('tok-number', tok);
      } else if (m[4]) {
        if (kw.has(tok)) {
          out += wrap('tok-keyword', tok);
        } else if (cn.has(tok)) {
          out += wrap('tok-bool', tok);
        } else if (/^\s*\(/.test(text.slice(m.index + tok.length))) {
          out += wrap('tok-func', tok);
        } else {
          out += esc(tok);
        }
      } else if (m[5]) {
        out += wrap('tok-bracket', tok);
      }
      last = m.index + tok.length;
    }
    out += esc(text.slice(last));
    return out;
  }

  /* Highlight an element's code text while leaving any element children it
     already contains (e.g. a hand-added <span style="color:red">) intact.
     We only ever rewrite text nodes, so manual highlighting survives. */
  function highlightElement(el, sql) {
    if (el.dataset.hl) return;
    el.dataset.hl = '1';

    // Collect text nodes first — mutating the tree while walking is unsafe.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    nodes.forEach(function (textNode) {
      const raw = textNode.nodeValue;
      const html = highlight(raw, sql);
      if (html === esc(raw)) return; // nothing needed colouring
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      textNode.parentNode.replaceChild(tpl.content, textNode);
    });
  }

  function isSql(el) {
    return !!(el.closest && el.closest('.code-sql')) ||
           el.classList.contains('code-sql') ||
           el.classList.contains('language-sql');
  }

  function run() {
    const targets = new Map(); // element -> isSql
    document.querySelectorAll('.code-block pre').forEach(function (pre) {
      const el = pre.querySelector('code') || pre;
      if (!targets.has(el)) targets.set(el, isSql(pre));
    });
    document.querySelectorAll('.content-article pre > code, .content-area pre > code').forEach(function (code) {
      if (!targets.has(code)) targets.set(code, isSql(code));
    });
    targets.forEach(function (sql, el) { highlightElement(el, sql); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
