import jwt from 'jsonwebtoken';

export const jwtVerify = (token, key, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, options, (err, payload) => {
      if(err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
};