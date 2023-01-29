import { prisma } from '../src/db.js';
import bcryptjs from 'bcryptjs';

const userData = [
  {
    email: 'test@bob.com',
    password: bcryptjs.hashSync('asdfasdf'),
    firstName: 'bob',
    lastName: 'smith',
    jobApps: {
      create: [
        {
          title: 'junior react developer',
          description: 'frontend role requiring knowledge of react, mongodb, and typescript',
          company: 'carnival cruise line',
          companyUrl: 'https://carnival.com',
          status: 'APPLIED'
        },
        {
          title: 'backend developer',
          description: 'backend role requiring knowledge of express, sql, and redis',
          company: 'ukg',
          companyUrl: 'https://ukg.com',
          status: 'INTERVIEWING'
        }
      ]
    }
  }
];

(async () => {
  try {
    console.log('starting to seed db...');
    for(let i = 0; i < userData.length; i++){
      const user = await prisma.user.create({
        data: userData[i]
      });
      console.log(`created user with id: ${user.id}`);
    }
    console.log('seeding finished...');
    await prisma.$disconnect();
  } catch (err) {
    console.log('error while attempting to seed db...', err);
    await prisma.$disconnect();
    process.exit(1);
  }
})()