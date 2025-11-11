export default function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="section">
      {(title || kicker) && (
        <div className="section-header">
          {kicker && <p className="kicker">{kicker}</p>}
          {title && <h2>{title}</h2>}
        </div>
      )}
      <div className="section-body">{children}</div>
    </section>
  );
}
