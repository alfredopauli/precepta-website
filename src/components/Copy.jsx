// Only plain text and paragraph/list structure, never raw HTML from content or database.
export default function Copy({ text }) {
  return text.split("\n\n").map((block, i) =>
    block.startsWith("- ") ? (
      <ul className="ruled-list" key={i}>
        {block.split("\n").map((line, j) => (
          <li key={j}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    ) : (
      <p key={i}>{block}</p>
    ),
  );
}
