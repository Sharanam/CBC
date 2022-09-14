import "./hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <p
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        The Application
        <span
          style={{
            marginTop: "0.2rem",
          }}
          className="special"
        >
          for citizens
        </span>
        <span className="special">by citizens</span>
      </p>
      <div className="line">
        <p>Be the contributor</p>
        <p>Help the people</p>
      </div>
    </div>
  );
}
