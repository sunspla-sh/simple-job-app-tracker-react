const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../..', '.env')
})
const app = require('./app');

const port = process.env.PORT

app.listen(port, () => {
  console.log(`running on port ${port}`)
});