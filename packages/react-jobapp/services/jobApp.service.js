
export class JobAppService {

  constructor({ retrieveAuthToken, getJobAppsUrl, getJobAppUrl, getJobAppsDailyCountUrl, postJobAppUrl, deleteJobAppUrl }){
    this.retrieveAuthToken = retrieveAuthToken;
    this.getJobAppsUrl = getJobAppsUrl;
    this.getJobAppUrl = getJobAppUrl;
    this.getJobAppsDailyCountUrl = getJobAppsDailyCountUrl;
    this.postJobAppUrl = postJobAppUrl;
    this.deleteJobAppUrl = deleteJobAppUrl;
  }

  /**
   * 
   * @returns array of job apps
   */
  async getJobApps(){
    try {
      const res = await fetch(this.getJobAppsUrl, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
        }
      });
      const json = await res.json();

      if(json.error){
        throw new Error(json.error.message);
      }

      return json;
    } catch (err) {
      throw err;
    }
  }

  async getJobApp(jobAppId){
    try {
      const res = await fetch(`${this.getJobAppUrl}/${jobAppId}`, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
        }
      });
      const json = await res.json();

      if(json.error){
        throw new Error(json.error.message);
      }

      return json;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 
   * @returns number - count of job apps in day (12:00am - 11:59pm) eastern time
   */
  async getJobAppsDailyCount(){
    try {
      const res = await fetch(this.getJobAppsDailyCountUrl, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
        }
      });
      const json = await res.json();

      if(json.error){
        throw new Error(json.error.message);
      }
      return json.count;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 
   * @returns true - if job app was created successfully
   */
  async postJobApp({ title, description, company, companyUrl, status }){
    try {
      const body = { title, description, company, companyUrl, status };
      const res = await fetch(this.postJobAppUrl, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(body)
      });
      const json = await res.json();

      if(json.error){
        throw new Error(json.error.message);
      }
      return json.success;
    } catch (err) {
      throw err;
    }
  }

  /**
   * 
   * @returns true - if job app was deleted successfully
   */
  async deleteJobApp(jobAppId){
    try {
      const res = await fetch(`${this.deleteJobAppUrl}/${jobAppId}`, {
        headers: {
          authorization: `Bearer ${this.retrieveAuthToken()}`,
        },
        method: 'delete'
      });
      const json = await res.json();

      if(json.error){
        throw new Error(json.error.message);
      }
      return json.success;
    } catch (err) {
      throw err;
    }
  }


}