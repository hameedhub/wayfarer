import "@babel/polyfill";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
const URL = '/bookings';
chai.use(chaiHttp);

let adminToken;
let userToken;
let bookingId;
describe('Test Bookings', ()=>{
    before(done=>{
        const adminLogin={
            email: "admin@mail.com",
            password: "Password123#"
        }
        chai.request(app)
        .post('/auth/signin')
        .send(adminLogin)
        .end((error, response)=>{
           adminToken = `Bearer ${response.body.data.token}`;
            done();
        })
    })
    before(done=>{
        const userLogin={
            email: "test@mail.com",
            password: 'Password123#'
        }
        chai.request(app)
        .post('/auth/signin')
        .send(userLogin)
        .end((error, response)=>{
           userToken = `Bearer ${response.body.data.token}`;
            done();
        })
    
    })
    it('should be able to book a trip', (done)=>{
        const bookingData ={
            trip_id: 1
        }
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
            bookingId = response.body.data.id;
           expect(response).to.have.status(201);
           expect(response.body).to.have.property('data');
           expect(response.body).to.have.property('status').eql(201);
           done();
        })
    })
    it('should not book admin access token', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: 1
        }
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', adminToken)
        .end((error, response)=>{
           expect(response).to.have.status(401);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(401);
           done();
        })
    })
    it('should not book if trip id does not exist', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: 1000000
        }
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response).to.have.status(404);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(404);
           done();
        })
    })
    it('should not book parameters is not provided', (done)=>{
        const bookingData ={ };
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not book if trip id is empty', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: ""
        }
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not book if trip id invalid', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: "a2"
        }
        chai
        .request(app)
        .post(URL)
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should get all booking is token access is admin', (done)=>{
        chai
        .request(app)
        .get(URL)
        .set('Authorization', adminToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('status').eql(200);
            expect(response.body).to.have.property('data');
            done();
        })
    })
    it('should get user booking if token access is not an admin', (done)=>{
        chai
        .request(app)
        .get(URL)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('status').eql(200);
            expect(response.body).to.have.property('data');
            done();
        })
    })
    it('should be able to delete booking', (done)=>{
        chai
        .request(app)
        .delete(`${URL}/${bookingId}`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('status').eql(204);
            expect(response.body).to.have.property('data');
            done();
        })
    })
    it('should not delete booking is id is not provided', (done)=>{
        chai
        .request(app)
        .delete(URL)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(404);
            expect(response.body).to.have.property('status').eql(404);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should not delete booking is id is not provided', (done)=>{
        chai
        .request(app)
        .delete(`${URL}/a`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('status').eql(422);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should not delete booking if id does not exist', (done)=>{
        chai
        .request(app)
        .delete(`${URL}/100000000`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(404);
            expect(response.body).to.have.property('status').eql(404);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should allow the user to change seat after booking', (done)=>{
        chai
        .request(app)
        .patch(`${URL}/1`)
        .set('Authorization', userToken)
        .send({seat_number: 2})
        .end((error, response)=>{
            expect(response).to.have.status(200)
            expect(response.body).to.have.property('status').eql(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('message');
            done();
        })
    })
    it('should not change user seat if trip_id is not number', (done)=>{
        chai
        .request(app)
        .patch(`${URL}/a`)
        .set('Authorization', userToken)
        .send({seat_number: 2})
        .end((error, response)=>{
            expect(response).to.have.status(422)
            expect(response.body).to.have.property('status').eql(422);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should not change user seat if invaild parameter are passed', (done)=>{
        chai
        .request(app)
        .patch(`${URL}/1`)
        .set('Authorization', userToken)
        .send({seat_number: 2, address: 'Abuja'})
        .end((error, response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.have.property('status').eql(400);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should not change user seat if seat_number is empty', (done)=>{
        chai
        .request(app)
        .patch(`${URL}/1`)
        .set('Authorization', userToken)
        .send({seat_number:""})
        .end((error, response)=>{
            expect(response).to.have.status(400)
            expect(response.body).to.have.property('status').eql(400);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    it('should not change user seat if seat_number is not number', (done)=>{
        chai
        .request(app)
        .patch(`${URL}/1`)
        .set('Authorization', userToken)
        .send({seat_number:"a"})
        .end((error, response)=>{
            expect(response).to.have.status(422)
            expect(response.body).to.have.property('status').eql(422);
            expect(response.body).to.have.property('error');
            done();
        })
    })
    

})