// Site header web component
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <div class="site-logo">
            <img src="images/Selko-mark-white.svg" alt="">
            <div class="logo-name">
              <span class="title">Selko Digital</span>
              <span class="subtitle">HTML Library</span>
            </div>
          </div>
        </div>
      </header>
    `;
  }
}
customElements.define('site-header', SiteHeader);

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

// Breadcrumb bar web component
class BreadcrumbBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="breadcrumb-bar" aria-label="Breadcrumb">
        <div class="breadcrumb-inner">
          <ol class="breadcrumb-trail"></ol>
        </div>
      </nav>
    `;

    const trail = this.querySelector('.breadcrumb-trail');
    const h1 = document.querySelector('h1');
    const parentMeta = document.querySelector('meta[name="breadcrumb-parent"]');

    function createItem(text, href, current) {
      const li = document.createElement('li');
      if (current) {
        li.setAttribute('aria-current', 'page');
        li.textContent = text;
      } else {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
      }
      return li;
    }

    trail.appendChild(createItem('Home', 'index.html'));

    if (parentMeta) {
      const [url, label] = parentMeta.content.split('|');
      trail.appendChild(createItem(label, url));
    }

    if (h1) trail.appendChild(createItem(h1.textContent, null, true));
  }
}
customElements.define('breadcrumb-bar', BreadcrumbBar);

// On This Page web component
class OnThisPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="component-aside">
        <div class="on-this-page">
          <h2>On This Page</h2>
          <ol class="on-this-page-links"></ol>
        </div>
      </aside>
    `;

    const buildList = () => {
      const list = this.querySelector('.on-this-page-links');
      document.querySelectorAll('main h2').forEach(h2 => {
        if (!h2.id) {
          h2.id = h2.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h2.id;
        a.textContent = h2.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildList);
    } else {
      buildList();
    }
  }
}
customElements.define('on-this-page', OnThisPage);
