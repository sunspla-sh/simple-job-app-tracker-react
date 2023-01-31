export const FAQPage = () => {
  return (
    <div
      className="faq_page"
    >
      <div
        className="faq_page-container"
      >
        <h1
          className="faq_page-title"
        >
          FAQs
        </h1>
        <div
          className="faq_note"
        >
          {/* 
            remoteok
          */}
          <ol className="faq_list">
            <li className="faq_list-item">
              <p>Where can I find software jobs?</p>
              <ul>
                <li>
                  <a href="https://www.ycombinator.com/jobs/role/software-engineer" target="_blank">YCombinator</a>
                </li>
                <li>
                  <a href="https://jobs.techstars.com/jobs?filter=eyJqb2JfZnVuY3Rpb25zIjpbIlNvZnR3YXJlIEVuZ2luZWVyaW5nIl19" target="_blank">TechStars</a>
                </li>
                <li>
                  <a href="https://angel.co/role/software-engineer" target="_blank">Wellfound (formerly AngelList Talent)</a>
                </li>
                <li>
                  <a href="https://builtin.com/jobs/dev-engineering" target="_blank">BuiltIn</a>
                </li>
                <li>
                  <a href="https://remoteok.com/remote-engineer-jobs" target="_blank">RemoteOK</a>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
      
    </div>
  );
};