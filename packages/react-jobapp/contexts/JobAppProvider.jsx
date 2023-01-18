import { useContext } from "react";
import { JobAppService } from "../services/jobApp.service";
import { AuthContext } from "react-auth";
import { JobAppContext } from "./JobAppContext";


export const JobAppProvider = ({ children, config }) => {

  const { authService } = useContext(AuthContext);

  const { getJobAppsUrl, getJobAppUrl, getJobAppsDailyCountUrl, postJobAppUrl, deleteJobAppUrl, editJobAppUrl } = config;

  const jobAppService = new JobAppService({
    retrieveAuthToken: authService.retrieveAuthToken,
    getJobAppsUrl,
    getJobAppUrl,
    getJobAppsDailyCountUrl,
    postJobAppUrl,
    deleteJobAppUrl,
    editJobAppUrl
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