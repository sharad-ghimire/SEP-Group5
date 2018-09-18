module.exports = {
  db: 'mongodb://whatever:whatever1@ds257372.mlab.com:57372/uts-medical-services',
  port: process.env.PORT || 3000,
  session: {
    cookieKey: 'yoBaby'
  }
};