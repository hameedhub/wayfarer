import "@babel/polyfill";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import Query from '../model/Query';
chai.use(chaiHttp);
const user = new Query('users');
const trip = new Query('trips');
const URL = '/auth';
describe('Signup controller test', ()=>{
    after(async (done)=>{
      user.delete([`email='test01@mail.com'`]);
      trip.delete([`trip_date='12-12-2050'`]);
      done();
    })
        it('should be able to register user when all the parameters are provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email:"test01@mail.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(201);
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.have.property('token');
                expect(response.status).to.equal(201);
                done();
              });
          });
          it('should not register user if no field are provided', done => {
            const userData = {};
            chai
              .request(app)
              .post(`${URL}/signup`)
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
                is_admin: false,
                location: "Benin",
                state: "Edo"
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if last name is not provided', done => {
            const userData = {
                first_name: "Hameed",
                password: "Password123#",
                email: "aajd@a.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
            .request(app)
            .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
            .request(app)
            .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
            .request(app)
            .post(`${URL}/signup`)
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
                email: "aajd@a.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(400);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(400);
                done();
              });
          });
          it('should not register user if password is not 4 character long', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "abc",
                email: "aajd@a.com",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(422);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(422);
                done();
              });
          });
          it('should not register user if email is not provided', done => {
            const userData = {
                first_name: "Hameed",
                last_name: "Rasheed",
                password: "Password123#",
                email: "",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
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
                email: "adfjaldsj",
                is_admin: false
            };
            chai
              .request(app)
              .post(`${URL}/signup`)
              .send(userData)
              .end((error, response) => {
                expect(response.body).to.have.property('status').eql(422);
                expect(response.body).to.have.property('error');
                expect(response.status).to.equal(422);
                done();
              });
          });
          
          it('should be able to login user', (done)=>{
            const userData ={ 
              email: 'test@mail.com',
              password: 'Password123#'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(200);
              expect(response.body).to.have.property('data');
              expect(response.body.data).to.have.property('token');
              expect(response.status).to.equal(200);
              done();
            })
          })
          it('should not login user email is not correct', (done)=>{
            const userData ={
              email: 'incorrect@mail.com',
              password: 'Password123#'
            };
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(401);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(401);
              done();
            })
          })
          it('should not login user password is not correct', (done)=>{
            const userData ={
              email: 'test@mail.com',
              password: 'Incorrect123#'
            };
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(401);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(401);
              done();
            })
          })
          it('should not login user details are not provided', (done)=>{
            const userData ={};
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(400);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(400);
              done();
            })
          })
          // it('should not login user if details are more than required', (done)=>{
          //   const userData ={
          //     email: 'test@mail.com',
          //     password: 'Password123#',
          //     status: 'good'
          //   };
          //   chai
          //   .request(app)
          //   .post(`${URL}/signin`)
          //   .send(userData)
          //   .end((error, response)=>{
          //     expect(response.body).to.have.property('status').eql(400);
          //     expect(response.body).to.have.property('error');
          //     expect(response.status).to.equal(400);
          //     done();
          //   })
          // })
          it('should not login user if email is not provided',(done)=>{
            const userData ={
              password: 'Password123#'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(400);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(400);
              done();
            })
          })
          it('should not login user if email is empty',(done)=>{
            const userData ={
              email: '',
              password: 'Password123#'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(400);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(400);
              done();
            })
          })
          it('should not login user if email is not valid',(done)=>{
            const userData ={
              email: 'test.com',
              password: 'Password123#'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(422);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(422);
              done();
            })
          })
          it('should not login user if password is not provided',(done)=>{
            const userData ={
              email: 'test@mail.com'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(400);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(400);
              done();
            })
          })
          it('should not login user if password is not empty',(done)=>{
            const userData ={
              email: 'test@mail.com',
              password: ''
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(400);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(400);
              done();
            })
          })
          it('should not login user if password is not vaild',(done)=>{
            const userData ={
              email: 'test@mail.com',
              password: 'abc'
            }
            chai
            .request(app)
            .post(`${URL}/signin`)
            .send(userData)
            .end((error, response)=>{
              expect(response.body).to.have.property('status').eql(422);
              expect(response.body).to.have.property('error');
              expect(response.status).to.equal(422);
              done();
            })
          })
})