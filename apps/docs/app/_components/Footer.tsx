export function Footer() {
  return (
    <footer className="doc-footer">
      <div className="doc-footer__inner">
        <div>
          <div className="doc-footer__brand">
            <span className="doc-header__logo" aria-hidden />
            <strong>Hilal</strong>
          </div>
          <p className="doc-footer__tagline">
            One DOM. One CSS. Three frameworks. Built and maintained by{' '}
            <a href="https://github.com/Cresentrix" target="_blank" rel="noreferrer">Cresentrix</a>.
          </p>
        </div>
        <div className="doc-footer__cols">
          <div>
            <div className="doc-footer__heading">Docs</div>
            <a href="/docs/getting-started">Get started</a>
            <a href="/docs/foundations">Foundations</a>
            <a href="/docs/components">Components</a>
            <a href="/docs/patterns">Patterns</a>
            <a href="/docs/recipes">Recipes</a>
          </div>
          <div>
            <div className="doc-footer__heading">Project</div>
            <a href="https://github.com/Cresentrix/hilal" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/org/hilal-ds" target="_blank" rel="noreferrer">npm</a>
            <a href="/docs/about/compare">Compared</a>
            <a href="/docs/about/faq">FAQ</a>
          </div>
          <div>
            <div className="doc-footer__heading">Legal</div>
            <a href="https://github.com/Cresentrix/hilal/blob/main/LICENSE" target="_blank" rel="noreferrer">Apache 2.0</a>
            <a href="https://github.com/Cresentrix/hilal/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer">Code of conduct</a>
            <a href="https://github.com/Cresentrix/hilal/blob/main/SECURITY.md" target="_blank" rel="noreferrer">Security</a>
          </div>
        </div>
      </div>
      <div className="doc-footer__bottom">
        <span>© {new Date().getFullYear()} Cresentrix · Apache-2.0</span>
        <span style={{ fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)', fontSize: 'var(--hilal-font-size-12)' }}>
          @hilal-ds/* · 0.1.1+
        </span>
      </div>
    </footer>
  );
}
