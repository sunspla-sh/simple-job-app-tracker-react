import jwt from 'jsonwebtoken';

export const jwtSign = (payload, key, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (err, token) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};