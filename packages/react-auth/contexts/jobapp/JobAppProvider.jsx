import { useContext } from "react";
import { JobAppService } from "../../services/jobApp.service";
import { AuthContext } from "../auth/AuthContext";
import { JobAppContext } from "./JobAppContext";


export const JobAppProvider = ({ children, config }) => {

  const { authService } = useContext(AuthContext);

  const { getJobAppsUrl, getJobAppsDailyCountUrl, postJobAppUrl, deleteJobAppUrl } = config;

  const jobAppService = new JobAppService({
    retrieveAuthToken: authService.retrieveAuthToken,
    getJobAppsUrl,
    getJobAppsDailyCountUrl,
    postJobAppUrl,
    deleteJobAppUrl
  });

  const value = {
    jobAppService
  };

  return (
    <JobAppContext.Provider value={value}>
      {children}
    </JobAppContext.Provider>
  );

};