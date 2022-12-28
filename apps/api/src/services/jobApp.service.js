import { prisma } from '../db.js'

import { STATUS_ENUM } from '../utils/statusEnum.js';

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;

export class JobAppService {

  constructor(){}

  async getAll(userId){
    
    try {
      
      const jobApps = await prisma.jobApp.findMany({
        where: {
          userId
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          notes: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
          }
        }
      });

      return Promise.resolve(jobApps);

    } catch (err){
      return Promise.reject(err);
    }

  }

  async getSingle({ userId, jobAppId }){
    
    try{

      //returns one jobapp or null if not found
      const foundJobApp = await prisma.jobApp.findUnique({
        where: {
          id: jobAppId
        },
        include: {
          notes: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      //send 400 code and error if jobapp is null or userId does not match
      if(!foundJobApp || foundJobApp.userId !== userId){
        return Promise.reject(new Error('job app not found'));
      }

      return Promise.resolve(foundJobApp);

    } catch (err) {
      return Promise.reject(err);
    }
    

  }

  async getDailyCount(userId){
    
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
      return Promise.resolve(jobAppsCount);

    } catch (err) {
      return Promise.reject(err);
    }

  }

  async create({ title, description, company, companyUrl, status, userId }){
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
      return Promise.reject(new Error('title, description, company, company url, and status are required'));
    }

    if(title.length > 128){
      return Promise.reject(new Error('title character count limit is 128'));
    }

    if(description.length > 512){
      return Promise.reject(new Error('description character count limit is 512'));
    }

    if(company.length > 128){
      return Promise.reject(new Error('company character count limit is 128'));
    }

    if(companyUrl.length > 256){
      return Promise.reject(new Error('company url character count limit is 256'));
    }

    if(!STATUS_ENUM.includes(status)){
      return Promise.reject(new Error('status must be one of the following values: ' + STATUS_ENUM.join(', ')));
    }

    //create new jobapp with user id
    try {
      
      const createdJobApp = await prisma.jobApp.create({
        data: {
          title,
          description,
          company,
          companyUrl,
          status,
          userId
        }
      });

      return Promise.resolve(createdJobApp);

    } catch(err) {
      return Promise.reject(err);
    }
  }

  async edit({ title, description, company, companyUrl, status, userId, jobAppId }){

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
      return Promise.reject(new Error('title, description, company, company url, and status are required'));
    }

    if(title.length > 128){
      return Promise.reject(new Error('title character count limit is 128'));
    }

    if(description.length > 512){
      return Promise.reject(new Error('description character count limit is 512'));
    }

    if(company.length > 128){
      return Promise.reject(new Error('company character count limit is 128'));
    }

    if(companyUrl.length > 256){
      return Promise.reject(new Error('company url character count limit is 256'));
    }

    if(!STATUS_ENUM.includes(status)){
      return Promise.reject(new Error('status must be one of the following values: ' + STATUS_ENUM.join(', ')));
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
        return Promise.reject(new Error('job app not found'));
      }

      return Promise.resolve({ success: true });

    } catch(err) {
      return Promise.reject(err);
    }

  }

  async delete({ userId, jobAppId }){
    
    try {
      
      const { count } = await prisma.jobApp.deleteMany({
        where: {
          id: jobAppId,
          userId
        }
      });

      if(count === 0){
        return Promise.reject(new Error('failed to delete job app'));
      }

      return Promise.resolve({ success: true });

    } catch (err) {
      return Promise.reject(err);
    }
  }

}