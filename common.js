// Site header web component
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="index.html" class="site-logo">
            <img src="images/Selko-mark-white.svg" alt="Selko Digital HTML Library – Home">
            <div class="logo-name">
              <span class="title">Selko Digital</span>
              <span class="subtitle">HTML Library</span>
            </div>
          </a>
          <button class="nav-toggle" aria-label="Main menu" aria-expanded="false" aria-controls="site-nav"></button>
          <nav id="site-nav" class="site-nav" aria-label="Main menu">
            <a href="index.html">Components</a>
            <a href="attributes.html">Attributes</a>
            <a href="about.html">About</a>
          </nav>
        </div>
      </header>
    `;

    const path = window.location.pathname;
    this.querySelectorAll('.site-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path === '/'))) {
        link.setAttribute('aria-current', 'page');
      }
    });

    const toggle = this.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }
}
customElements.define('site-header', SiteHeader);

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

    trail.appendChild(createItem('Components', 'index.html'));

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
      document.querySelectorAll('.component-section h2').forEach(h2 => {
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
