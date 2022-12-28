import { JobAppService } from '../services/jobApp.service.js';
const jobAppService = new JobAppService();

export const allController = async (req, res, next) => {
  
  const { id: userId } = req.payload;
  
  try {

    const jobApps = await jobAppService.getAll(userId)
    res.json(jobApps);

  } catch(err) {
    next(err);
  }
  
};

export const singleController = async (req, res, next) => {
  
  //get user from payload
  const { id: userId } = req.payload;
  
  const { id: jobAppId } = req.params;

  //get user jobapps with prisma client
  try {
    
    //returns one jobapp or null if not found
    const foundJobApp = await jobAppService.getSingle({ userId, jobAppId });
    res.json(foundJobApp);

  } catch(err) {
    next(err);
  }

  
};

export const dailyCountController = async (req, res, next) => {

  //get user from payload
  const { id: userId } = req.payload;

  try {

    //get user jobapps count from 24 hour period only (12:00:00.000am - 11:59:59.999pm ET) with prisma client
    const jobAppsCount = await jobAppService.getDailyCount(userId);

    //return user jobapp count in res
    res.json({
      count: jobAppsCount
    });

  } catch (err) {
    next(err)
  }

};

export const createController = async (req, res, next) => {
  
  //get user from payload
  const { id: userId } = req.payload;

  //get jobapp data from body
  const { title, description, company, companyUrl, status } = req.body;

  //create new jobapp with user id
  try {
    
    const createdJobApp = await jobAppService.create({
      title,
      description,
      company,
      companyUrl,
      status,
      userId
    });

    res.status(201).json(createdJobApp);

  } catch(err) {
    next(err);
  }

};

export const editController = async (req, res, next) => {

  //get user id from payload
  const { id: userId } = req.payload;

  //get jobApp id from payload
  const { id: jobAppId } = req.params;

  //get jobApp info out of body
  const { title, description, company, companyUrl, status } = req.body;

  try {
    
    const updatedJobApp = await jobAppService.edit({
      title,
      description,
      company,
      companyUrl,
      status,
      userId,
      jobAppId
    });

    res.status(200).json(updatedJobApp);

  } catch(err) {
    next(err);
  }

};

export const deleteController = async (req, res, next) => {

  //get user from payload
  const { id: userId } = req.payload;

  //get jobapp id from route params
  const { id: jobAppId } = req.params;

  try {
    const deletedJobApp = await jobAppService.delete({ userId, jobAppId });
    res.status(200).json(deletedJobApp);
  } catch (err) {
    next(err);
  }
  
}
