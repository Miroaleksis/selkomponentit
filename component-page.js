// Populate code panels from <script type="text/plain"> sources
// Convention: id="snippet-{name}" → target #panel-{name} code
(function populateCodePanels() {
  document.querySelectorAll('script[type="text/plain"][id^="snippet-"]').forEach(source => {
    const targetId = source.id.replace('snippet-', 'panel-');
    const target = document.querySelector('#' + targetId + ' code');
    if (target) target.textContent = source.textContent.trim();
  });
})();

// Render code snippets into example containers
// Each .example-container can have data-prefix="select" to use panel-select-html etc.
(function renderExamples() {
  document.querySelectorAll('.example-container').forEach(container => {
    const p = container.dataset.prefix ? container.dataset.prefix + '-' : '';
    const htmlCode = document.querySelector('#panel-' + p + 'html code');
    const cssCode  = document.querySelector('#panel-' + p + 'css code');
    const jsCode   = document.querySelector('#panel-' + p + 'js code');
    if (!htmlCode) return;

    container.innerHTML = htmlCode.textContent;

    if (cssCode && cssCode.textContent.trim()) {
      const style = document.createElement('style');
      style.textContent = `@scope (.example-container[data-prefix="${container.dataset.prefix}"]) { ${cssCode.textContent} }`;
      document.head.appendChild(style);
    }

    if (jsCode && jsCode.textContent.trim()) {
      const script = document.createElement('script');
      script.textContent = `(function(document) { ${jsCode.textContent} })({
  querySelector:    function(s)  { return document.querySelector('.example-container[data-prefix="${container.dataset.prefix}"] ' + s); },
  querySelectorAll: function(s)  { return document.querySelectorAll('.example-container[data-prefix="${container.dataset.prefix}"] ' + s); },
  getElementById:   function(id) { return document.querySelector('.example-container[data-prefix="${container.dataset.prefix}"] #' + id); },
  createElement:    function(t)  { return document.createElement(t); },
  addEventListener: function()   { return document.addEventListener.apply(document, arguments); },
  body:             document.body
});`;
      document.body.appendChild(script);
    }
  });
})();

