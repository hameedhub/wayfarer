import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);


describe('Signup controller test', ()=>{
        it('should be able to register user when all the parameters are provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(201);
                expect(response.body).to.have.property('data');
                expect(response.body).to.have.property('token');
                expect(response.status).to.equal(201);
                done();
              });
          });
          it('should not register user if no field are provided', done => {
            const userData = {};
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if extra fields are provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email: "aajd@a.com",
                location: "Benin",
                state: "Edo"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if first name is provided', done => {
            const userData = {
                first_name: "",
                last_name: "Rasheed",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if last name is provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if first name is contain other character', done => {
            const userData = {
                first_name: "Hameed1",
                last_name: "Rasheed",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
            .request(app)
            .post('/api/v1/signup')
            .send(userData)
            .end((error, response) => {
              expect(response.body).to.have.property('status').eql(422);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(422);
              done();
            });
        });
          it('should not register user if last name is contain other character', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed12",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(422);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(422);
                done();
              });
          });
          it('should not register user if first name is less than 3 character', done => {
            const userData = {
                first_name: "H",
                last_name: "Rasheed",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
            .request(app)
            .post('/api/v1/signup')
            .send(userData)
            .end((error, response) => {
              expect(response.body).to.have.property('status').eql(422);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(422);
              done();
            });
        });
          it('should not register user if last name is less than 3 character', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "R",
                password: "Password123#",
                email: "aajd@a.com"
            };
            chai
            .request(app)
            .post('/api/v1/signup')
            .send(userData)
            .end((error, response) => {
              expect(response.body).to.have.property('status').eql(422);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(422);
              done();
            });
          });
          it('should not register user if password is not provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if password is not 8 character long and does not contain 1 uppercase, 1 lower case and 1 symbol', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "abc",
                email: "aajd@a.com"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(422);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(422);
                expect(response.body).to.have.property('error').eql('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
                done();
              });
          });
          it('should not register user if email is not provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email: ""
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if invaild email is provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email: "adfjaldsj"
            };
            chai
              .request(app)
              .post('/api/v1/signup')
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(422);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(422);
                done();
              });
          });
    })