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
        <p
          className="home_note"
        >
          Setup instructions are coming soon...
        </p>
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
            For now, you can download the jobapptrack chrome extension by clicking here.
          </a>
        </p>
      </div>
      
    </div>
  );
}