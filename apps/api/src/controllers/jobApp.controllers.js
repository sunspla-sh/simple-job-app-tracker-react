import { prisma } from '../db.js'

import { STATUS_ENUM } from '../utils/statusEnum.js';

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

export const allController = async (req, res, next) => {
  
  //get user from payload
  const { id: userId } = req.payload;
  
  //get user jobapps with prisma client
  try {
    const jobApps = await prisma.jobApp.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
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
    const foundJobApp = await prisma.jobApp.findUnique({
      where: {
        id: jobAppId
      }
    });

    //send 400 code and error if jobapp is null or userId does not match
    if(!foundJobApp || foundJobApp.userId !== userId){
      return res.status(400).json({
        error: {
          message: 'job app not found'
        }
      });
    }

    res.json(jobApps);

  } catch(err) {
    next(err);
  }

  
};

export const dailyCountController = async (req, res, next) => {

  //get user from payload
  const { id: userId } = req.payload;

  //get current instant
  const now = Temporal.Now.instant();

  //get today's first millisecond in US Eastern timezone
  const todayFirstMillisecond = Temporal.Instant.from(now).toZonedDateTimeISO('America/New_York').round({ smallestUnit: 'day', roundingMode: 'floor'}).epochMilliseconds;

  //get today's last millisecond in US Eastern timezone
  const todayLastMillisecond = Temporal.Instant.from(now).toZonedDateTimeISO('America/New_York').add({ days: 1 }).round({ smallestUnit: 'day', roundingMode: 'floor'}).subtract({ milliseconds: 1 }).epochMilliseconds;

  try {
    //get user jobapps count from 24 hour period only (12:00:00.000am - 11:59:59.999pm ET) with prisma client
    const jobAppsCount = await prisma.jobApp.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(todayFirstMillisecond), //must convert to Date because prisma is expecting a Date, not epochMilliseconds
          lte: new Date(todayLastMillisecond) //must convert to Date because prisma is expecting a Date, not epochMilliseconds
        }
      }
    });
    //return user jobapp count in res
    res.json({
      count: jobAppsCount
    });

  } catch (err) {
    return next(err)
  }

};

export const createController = async (req, res, next) => {
  console.log('status enum ', STATUS_ENUM)
  //get user from payload
  const { id: userId } = req.payload;

  //get jobapp data from body
  const { title, description, company, companyUrl, status } = req.body;

  /**
   *  validate jobapp data from body
   *  ---
   *  character limits
   *  ---
   *  title - 128
   *  description - 512
   *  company - 128
   *  companyUrl - 256
   * 
   */
  if(!title
    || typeof title !== 'string'
    || !description
    || typeof description !== 'string'
    || !company
    || typeof company !== 'string'
    || !companyUrl
    || typeof companyUrl !== 'string'
    || !status
    || typeof status !== 'string'
  ){
    return res.status(400).json({
      error: {
        message: 'title, description, company, company url, and status are required'
      }
    });
  }

  if(title.length > 128){
    return res.status(400).json({
      error: {
        message: 'title character count limit is 128'
      }
    });
  }

  if(description.length > 512){
    return res.status(400).json({
      error: {
        message: 'description character count limit is 512'
      }
    });
  }

  if(company.length > 128){
    return res.status(400).json({
      error: {
        message: 'company character count limit is 128'
      }
    });
  }

  if(companyUrl.length > 256){
    return res.status(400).json({
      error: {
        message: 'company url character count limit is 256'
      }
    });
  }

  if(!STATUS_ENUM.includes(status)){
    return res.status(400).json({
      error: {
        message: 'status must be one of the following values: ' + STATUS_ENUM.join(', ')
      }
    });
  }

  //create new jobapp with user id
  try {
    await prisma.jobApp.create({
      data: {
        title,
        description,
        company,
        companyUrl,
        status,
        userId
      }
    });
    res.status(200).json({
      success: true
    });
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

  /**
   *  validate jobapp data from body
   *  ---
   *  character limits
   *  ---
   *  title - 128
   *  description - 512
   *  company - 128
   *  companyUrl - 256
   * 
   */
  if(!title
    || typeof title !== 'string'
    || !description
    || typeof description !== 'string'
    || !company
    || typeof company !== 'string'
    || !companyUrl
    || typeof companyUrl !== 'string'
    || !status
    || typeof status !== 'string'
  ){
    return res.status(400).json({
      error: {
        message: 'title, description, company, company url, and status are required'
      }
    });
  }

  if(title.length > 128){
    return res.status(400).json({
      error: {
        message: 'title character count limit is 128'
      }
    });
  }

  if(description.length > 512){
    return res.status(400).json({
      error: {
        message: 'description character count limit is 512'
      }
    });
  }

  if(company.length > 128){
    return res.status(400).json({
      error: {
        message: 'company character count limit is 128'
      }
    });
  }

  if(companyUrl.length > 256){
    return res.status(400).json({
      error: {
        message: 'company url character count limit is 256'
      }
    });
  }

  if(!STATUS_ENUM.includes(status)){
    return res.status(400).json({
      error: {
        message: 'status must be one of the following values: ' + STATUS_ENUM.join(', ')
      }
    });
  }

  try {
    const { count } = await prisma.jobApp.updateMany({
      where: {
        id: jobAppId,
        userId
      },
      data: {
        title,
        description,
        company,
        companyUrl,
        status,
        userId
      }
    });

    if(count === 0){
      return res.status(400).json({
        error: {
          message: 'job app not found'
        }
      });
    }
    res.status(200).json({
      success: true
    });
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
    const { count } = await prisma.jobApp.deleteMany({
      where: {
        id: jobAppId,
        userId
      }
    });
    if(count === 0){
      return res.status(400).json({
        error: {
          message: 'job app not found'
        }
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (err) {
    next(err);
  }
  
}
