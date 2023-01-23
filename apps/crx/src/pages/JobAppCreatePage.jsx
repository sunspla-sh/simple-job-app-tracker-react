import { JobAppCreateForm, JobAppTimeRemaining, JobAppDailyCount } from 'react-jobapp';


export const JobAppCreatePage = () => {
  return (
    <div>
      <JobAppTimeRemaining />
      <JobAppDailyCount />
      <JobAppCreateForm />
    </div>
  );
};