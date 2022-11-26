export default function Loading() {
  return (
    <div>
      <img
        src="/Loading.svg"
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
        loading="lazy"
      />
    </div>
  );
}
