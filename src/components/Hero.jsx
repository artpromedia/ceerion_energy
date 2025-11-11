export default function Hero({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="hero">
      <div className="hero-content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </section>
  );
}
