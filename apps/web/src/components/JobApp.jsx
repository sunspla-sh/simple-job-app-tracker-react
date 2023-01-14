import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

const capitalizeAllWords = s => s.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

export const JobApp = ( {  company, companyUrl, description, createdAt, title, status, id, listMode  }) => {

  const createdAtTemporal = Temporal.Instant.from(createdAt).toZonedDateTimeISO('America/New_York').toPlainDate().toString();

  return (
    <div className="jobapp_container">
      <div className="jobapp_company">
        <div className="jobapp_company-descriptor">
          Company
        </div>
        <div className="jobapp_company-value">
          {capitalizeAllWords(company)}
        </div>
      </div>
      <div className="jobapp_title">
        <div className="jobapp_title-descriptor">
          Title
        </div>
        <div className="jobapp_title-value">
          {capitalizeAllWords(title)}
        </div>
      </div>
      <div className="jobapp_description">
        <div className="jobapp_description-descriptor">
          Description
        </div>
        <div className="jobapp_description-value">
          {description}
        </div>
      </div>          
      <div className="jobapp_companyUrl">
        <div className="jobapp_companyUrl-descriptor">
          Company URL
        </div>
        {listMode ? (
          <div className="jobapp_companyUrl-value">
            {companyUrl}
          </div>
        ) : (
          <div className="jobapp_companyUrl-value">
            <a href={`https://${companyUrl}`} target="_blank">
              {companyUrl}
            </a>
          </div>
        )}
      </div>
      <div className="jobapp_createdAt">
        <div className="jobapp_createdAt-descriptor">
          Status
        </div>
        <div className="jobapp_createdAt-value">
          {status}
        </div>
      </div>
      <div className="jobapp_createdAt">
        <div className="jobapp_createdAt-descriptor">
          Created At
        </div>
        <div className="jobapp_createdAt-value">
          {createdAtTemporal}
        </div>
      </div>
    </div>
  );
};