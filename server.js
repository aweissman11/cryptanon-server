const express = require('express');
const app = express();
// const students = require('./students');

const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.set('port', process.env.PORT || 3000);
app.locals.title = 'CryptAnon';
// app.locals.students = students;

app.get('/', (request, response) => {
  response.send('This is the home route. HTML, JS, and  CSS go here');
});

app.get('/api/v1/students', (request, response) => {
  response.status(200).json(app.locals.students);
})

app.post('/api/v1/students', (request, response) => {
  const student = request.body;

  let missingProperties = [];

  for (let requiredProperty of ['lastname', 'program', 'enrolled']) {
    if(student[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
  }

  // for (let requiredParam of ['lastname', 'program', 'enrolled']) {
  //   if(student[requiredParam] === undefined) {
  //     response
  //       .status(422)
  //       .send({ error: `missing required param of ${requiredParam}`})
  //   }
  // }

  app.locals.students = [...app.locals.students, student];
  response.status(201).json(student)
  // sometimes better to just send back a message
  // response.status(201).json({ message: `${student.name} added to DB`})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on localhost:${app.get('port')}.`);
});

module.exports = app;
