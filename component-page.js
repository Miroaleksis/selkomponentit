// Code editor web component
class CodeEditor extends HTMLElement {
  connectedCallback() {
    const prefix = this.getAttribute('prefix');
    const tabs = this.getAttribute('tabs').split(',').map(t => t.trim());
    const labelMap = { html: 'HTML', css: 'CSS', js: 'Javascript' };

    const tabButtons = tabs.map((tab, i) => `
              <button class="code-tab${i === 0 ? ' active' : ''}" role="tab" aria-selected="${i === 0}" aria-controls="panel-${prefix}-${tab}" id="tab-${prefix}-${tab}" tabindex="${i === 0 ? '0' : '-1'}">${labelMap[tab] || tab}</button>`
    ).join('');

    const panels = tabs.map((tab, i) => `
          <div id="panel-${prefix}-${tab}" role="tabpanel" aria-labelledby="tab-${prefix}-${tab}" class="code-panel"${i > 0 ? ' hidden' : ''}>
<pre><code></code></pre>
          </div>`
    ).join('');

    this.innerHTML = `
      <div class="code-editor">
        <div class="code-toolbar" role="tablist">
          <div class="code-tabs">${tabButtons}
          </div>
          <button class="button copy-btn">
            <span aria-live="polite">Copy</span>
          </button>
        </div>
        ${panels}
      </div>
      <button class="button">Open in CodePen</button>
    `;

    tabs.forEach(tab => {
      const source = document.querySelector(`#snippet-${prefix}-${tab}`);
      const panel  = this.querySelector(`#panel-${prefix}-${tab} code`);
      if (source && panel) panel.textContent = source.textContent.trim();
    });

    const editor = this.querySelector('.code-editor');
    const tabButtonEls = Array.from(this.querySelectorAll('[role="tab"]'));

    const copyBtn = this.querySelector('.copy-btn');
    const copyLabel = copyBtn.querySelector('[aria-live]');
    const codepenBtn = this.querySelector(':scope > button');

    function activateTab(tab) {
      tabButtonEls.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      editor.querySelectorAll('.code-panel').forEach(p => { p.hidden = true; });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus();
      document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
      copyBtn.setAttribute('aria-label', 'Copy ' + tab.textContent);
    }

    copyBtn.setAttribute('aria-label', 'Copy ' + tabButtonEls[0].textContent);

    tabButtonEls.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (e) => {
        let newIndex;
        if (e.key === 'ArrowRight') newIndex = (index + 1) % tabButtonEls.length;
        else if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabButtonEls.length) % tabButtonEls.length;
        else if (e.key === 'Home') newIndex = 0;
        else if (e.key === 'End') newIndex = tabButtonEls.length - 1;
        else return;
        e.preventDefault();
        activateTab(tabButtonEls[newIndex]);
      });
    });

    copyBtn.addEventListener('click', () => {
      const activePanel = editor.querySelector('.code-panel:not([hidden])');
      if (!activePanel) return;
      navigator.clipboard.writeText(activePanel.querySelector('code').textContent)
        .then(() => {
          copyLabel.textContent = 'Copied';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyLabel.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
        }).catch(() => {});
    });

    codepenBtn.addEventListener('click', () => {
      const data = {};
      tabs.forEach(tab => {
        const panel = this.querySelector(`#panel-${prefix}-${tab}`);
        if (panel) data[tab] = panel.querySelector('code').textContent;
      });
      const form = document.createElement('form');
      form.action = 'https://codepen.io/pen/define';
      form.method = 'POST';
      form.target = '_blank';
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'data';
      input.value = JSON.stringify(data);
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    });
  }
}
customElements.define('code-editor', CodeEditor);

function makeShadowProxy(shadow) {
  return {
    querySelector:    s  => shadow.querySelector(s),
    querySelectorAll: s  => shadow.querySelectorAll(s),
    getElementById:   id => shadow.querySelector('#' + id),
    createElement:    t  => document.createElement(t),
    addEventListener: (type, handler, options) => {
      document.addEventListener(type, (e) => {
        handler(new Proxy(e, {
          get(target, prop) {
            if (prop === 'target') return e.composedPath()[0] ?? e.target;
            const val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          }
        }));
      }, options);
    },
    body: shadow
  };
}

// Render code snippets into example containers using Shadow DOM for CSS isolation
(function renderExamples() {
  document.querySelectorAll('.example-container').forEach(container => {
    const p = container.dataset.prefix ? container.dataset.prefix + '-' : '';
    const htmlSource = document.querySelector('#snippet-' + p + 'html');
    const cssSource  = document.querySelector('#snippet-' + p + 'css');
    const jsSource   = document.querySelector('#snippet-' + p + 'js');
    if (!htmlSource) return;

    const html = htmlSource.textContent.trim();
    const css  = cssSource ? cssSource.textContent.trim() : '';
    const js   = jsSource  ? jsSource.textContent.trim()  : '';

    const host = document.createElement('div');
    container.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<link rel="stylesheet" href="example-styles.css"><style>${css}</style>${html}`;

    if (js) {
      new Function('document', js)(makeShadowProxy(shadow));
    }
  });
})();

