const express = require('express');
const { PrismaClient } = require('@prisma/client');

const { Temporal, Intl, toTemporalInstant } = require('@js-temporal/polyfill');
Date.prototype.toTemporalInstant = toTemporalInstant;

const router = express.Router();
const prisma = new PrismaClient();

router.get('/jobapps', async (req, res, next) => {
  
  //get user from payload
  const { id: userId } = req.payload;
  
  //get user jobapps with prisma client
  try {
    const jobApps = await prisma.jobApp.findMany({
      where: {
        userId
      }
    })
    res.json(jobApps)
  } catch(err) {
    next(err);
  }

  
});

router.get('/jobapps-daily-count', async (req, res, next) => {

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

});

router.post('/jobapp', async (req, res, next) => {
  
  //get user from payload
  const { id: userId } = req.payload;

  //get jobapp data from body
  const { title, description, company, companyUrl } = req.body;

  

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
  ){
    return res.status(400).json({
      error: {
        message: 'title, description, company, and company url are required'
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

  //create new jobapp with user id
  try {
    await prisma.jobApp.create({
      data: {
        title,
        description,
        company,
        companyUrl,
        userId
      }
    });
    res.status(200).json({
      success: true
    });
  } catch(err) {
    next(err);
  }

});

router.delete('/jobapp/:id', async (req, res, next) => {

  //get user from payload

  //get jobapp id from route params

  //check that jobapp belongs to user
  
    //if false
    
      //return error message in res (forbidden)

    //else
    
      //return success message in res

});

//route for fetching favicons
//https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://travis-ci.com&size=32

module.exports = router;