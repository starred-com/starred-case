const { faker } = require('@faker-js/faker');
const fs = require('fs');
const db = require('./db.js');

function generateJobs(num) {
  const jobs = [];
  for (let i = 0; i <= num; i++) {
    jobs.push({
      title: faker.person.jobTitle(),
      description: faker.person.jobDescriptor()
    })
  }
  return jobs
}

function generateUsers(num) {
  const users = [];
  for (let i = 0; i <= num; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      salt: faker.lorem.word()
    })
  }
  return users
}

function reset() {
  const sql = fs.readFileSync(__dirname + '/schema.sql').toString();  
  db.exec(fs.readFileSync(__dirname + '/schema.sql').toString())

  seed()
}

function seed() {
  let stmt = db.prepare("INSERT INTO job (title, description) VALUES (?, ?)");

  const jobs = generateJobs(10);

  jobs.forEach(job => {
    stmt.run(job.title, job.description);
  });
  stmt.finalize();

  const users = generateUsers(10);
  stmt = db.prepare("INSERT INTO User (firstName, lastName, email) VALUES (?, ?, ?)");
  users.forEach(user => {
    stmt.run(user.firstName, user.lastName, user.email);
  });
  stmt.finalize();

  db.close();
}

reset();