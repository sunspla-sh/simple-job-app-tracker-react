// No native enum in sqlite so we make our own
const STATUS_ENUM = [
  'APPLIED',
  'INTERVIEWING',
  'NO OFFER',
  'OFFER RECEIVED',
  'OFFER DECLINED',
  'OFFER ACCEPTED'
];

module.exports = {
  STATUS_ENUM
};