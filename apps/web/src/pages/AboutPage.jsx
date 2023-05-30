export const AboutPage = () => {
  return (
    <div
      className="about_page"
    >
      <div
        className="about_page-container"
      >
        <h1
          className="about_page-title"
        >
          About
        </h1>
        <div
          className="about_note"
        >
          <div style={{position: "relative", paddingBottom: "62.5%", height: 0}}><iframe src="https://www.loom.com/embed/3ceb3e0a1d734abeb48180aa420dafe8" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}></iframe></div>
        </div>
        <p
          className="about_note"
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
            Download the jobapptrack chrome extension by clicking here. <br /> (Watch the above video for installation instructions)
          </a>
        </p>
      </div>
      
    </div>
  );
};