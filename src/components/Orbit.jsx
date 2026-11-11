export default function Orbit() {
  return (
    <div className="science" aria-hidden="true">
      <span className="formula f1">F = G m₁m₂ / r²</span>
      <span className="formula f2">E = mc²</span>
      <span className="formula f3">∫ f(x) dx</span>
      <div className="axis x" />
      <div className="axis y" />
      <div className="orbit outer" />
      <div className="orbit middle" />
      <div className="orbit inner" />
      <div className="star" />
      <div className="revolution">
        <div className="planet" />
      </div>
      <svg
        className="atom"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <ellipse cx="30" cy="30" rx="27" ry="10" />
        <ellipse cx="30" cy="30" rx="27" ry="10" transform="rotate(60 30 30)" />
        <ellipse
          cx="30"
          cy="30"
          rx="27"
          ry="10"
          transform="rotate(120 30 30)"
        />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
      </svg>
      <span className="spark s1">+</span>
      <span className="spark s2">+</span>
      <div className="science-caption">UM UNIVERSO DE POSSIBILIDADES</div>
    </div>
  );
}
