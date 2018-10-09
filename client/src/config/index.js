export default {
  webservice: process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'
}
