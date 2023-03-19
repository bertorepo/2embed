function Iframe({ src }) {
  return (
    <iframe
      title="iframe-embed"
      id="iframe"
      src={`https://www.2embed.to/embed/imdb/movie?id=${src}`}
      width="100%"
      height="100%"
    ></iframe>
  );
}

export default Iframe;
