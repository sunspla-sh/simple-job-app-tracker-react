import { useState, useEffect } from 'react';

export const JobAppFilter = ({ filteredJobApps, setFilteredJobApps, jobApps }) => {

  const [searchString, setSearchString] = useState('');
  
  useEffect(() => {
    const search = searchString.toLowerCase();
    
    console.log(jobApps)
    const filtered = jobApps.filter(jobApp => jobApp.company.toLowerCase().includes(search));
    setFilteredJobApps(filtered);  

  }, [searchString, jobApps]);

  return (
    <div className='jobapp_list-filter-container'>
      <input
        className='jobapp_list-filter-input'
        value={searchString}
        placeholder='Filter by Company Name'
        onChange={e => setSearchString(e.target.value)}
      />
      <p className='jobapp_list-filter-info'>
        Showing {filteredJobApps.length} out of {jobApps.length} job apps
      </p>
    </div>
  );
}