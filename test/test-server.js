const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect

const {BlogPost} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

const seedBlogPostData = function () {
    console.info('seeding blog post data')
    const seedData = []

    for (let i=1; i<=10; i++) {
        seedData.push(generateBlogPostData());
      }

      return BlogPost.insertMany(seedData);
}

const generateBlogPostData = function () {
    return {
        author: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          title: faker.random.words(),
          content: faker.random.words(),
          created:  Date.now
    }
}

const tearDownDb = function () {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }

  describe('Blog posts API resource', function (){


    before(function(){
        return runServer(TEST_DATABASE_URL)
    })

    beforeEach(function(){
        return seedBlogPostData()
    })

    afterEach(function () {
        return tearDownDb()
    })

    after(function(){
        return closeServer()
    })
  })

