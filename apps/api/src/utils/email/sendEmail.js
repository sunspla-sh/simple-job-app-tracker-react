import { createTransport } from 'nodemailer';
import handlebars from 'handlebars';

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const ___dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url));

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  FROM_EMAIL
} = process.env;

export const sendEmail = async ({ emailTo, emailSubject, handlebarsVariables, handlebarsTemplate }) => {

  try {

    const transporter = createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      headers: {
        'X-PM-Message-Stream': 'outbound' //message stream header for postmark
      },
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
      }
    });

    const handlebarsSource = await readFile(resolve(___dirname, 'templates', handlebarsTemplate), 'utf-8');

    const compiledHandlebarsTemplate = handlebars.compile(handlebarsSource);

    const emailOptions = {
      from: FROM_EMAIL,
      to: emailTo,
      subject: emailSubject,
      html: compiledHandlebarsTemplate(handlebarsVariables)
    };

    const sentEmail = await transporter.sendMail(emailOptions);

    return Promise.resolve(sentEmail);

  } catch (err) {
    return Promise.reject(err);
  }

};