

const FormData = require('form-data');
const requesthttp = require('http');

const util = require('util'),
    request = util.promisify(require('request')),
    fs = require('fs'),
    fsp = fs.promises;





export async function save (xlsx){
  
  // const readStream = fsp.createReadStream('./App.js');
  const readStream = xlsx;

  const form = new FormData();
  form.append('sheet', readStream);
  // form.append('firstName', 'bla');
  // form.append('lastName', 'blabla');
  

  const req = requesthttp.request(
    {
      host: 'localhost',
      port: '8080',
      path: '/upload',
      method: 'POST',
      headers: form.getHeaders(),
    },
    response => {
      console.log(response.statusCode); // 200
      console.log(response.statusMessage);
    }
  );

  form.pipe(req);
}

export default save;