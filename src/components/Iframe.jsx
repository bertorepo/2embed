function Iframe({ src, episode, season }) {
  let renderedEmbed = `https://www.2embed.org/embed/movie?imdb=${src}`;

  if (episode && season) {
    renderedEmbed = `https://www.2embed.org/embed/series?imdb=${src}&s=${season}&e=${episode}`;
  }

  return (
    <>
      <iframe
        title="iframe-embed"
        id="iframe"
        src={renderedEmbed}
        width="100%"
        height="100%"
        allow="fullscreen"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default Iframe;
