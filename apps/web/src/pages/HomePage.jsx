export const HomePage = () => {
  return (
    <div
      className="home_page"
    >
      <div
        className="home_page-container"
      >
        <h1
          className="home_page-title"
        >
          Simple Job App Tracker
        </h1>
        <div
          className="home_note"
        >
          <div style={{position: "relative", paddingBottom: "62.5%", height: 0}}><iframe src="https://www.loom.com/embed/3ceb3e0a1d734abeb48180aa420dafe8" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}></iframe></div>
        </div>
        <p
          className="home_note"
          style={{
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <a
            target="_blank"
            href="/jobapptrack-chrome-extension.zip"
            style={{
              color: "var(--secondary-text)"
            }}
          >
            Download the jobapptrack chrome extension by clicking here.
          </a>
        </p>
      </div>
      
    </div>
  );
}