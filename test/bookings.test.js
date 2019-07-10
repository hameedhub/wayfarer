import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

let adminToken;
let userToken
describe('Test Bookings', ()=>{
    before(done=>{
        const adminLogin={
            email: "admin@mail.com",
            password: "Password123#"
        }
        chai.request(app)
        .post('/api/v1/login')
        .send(adminLogin)
        .end((error, response)=>{
           adminToken = `Bearer ${response.body.token}`;
            done();
        })
    })
    before(done=>{
        const userLogin={
            email: "test@mail.com",
            password: 'Password123#'
        }
        chai.request(app)
        .post('/api/v1/login')
        .send(userLogin)
        .end((error, response)=>{
           userToken = `Bearer ${response.body.token}`;
            done();
        })
    
    })
    it('should be able to book a trip', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: 1
        }
        chai
        .request(app)
        .post('/api/v1/bookings')
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
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
        .post('/api/v1/bookings')
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
        .post('/api/v1/bookings')
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
        .post('/api/v1/bookings')
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not book if invalid parameters are given', (done)=>{
        const bookingData ={
            seat_number: 2,
            trip_id: 1,
            bus_locaiton: "Lagos"
        }
        chai
        .request(app)
        .post('/api/v1/bookings')
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not book if seat number is empty', (done)=>{
        const bookingData ={
            seat_number: "",
            trip_id: 1
        }
        chai
        .request(app)
        .post('/api/v1/bookings')
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not book if seat number is invalid', (done)=>{
        const bookingData ={
            seat_number: "a2",
            trip_id: 1
        }
        chai
        .request(app)
        .post('/api/v1/bookings')
        .send(bookingData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
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
        .post('/api/v1/bookings')
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
        .post('/api/v1/bookings')
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
        .get('/api/v1/bookings')
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
        .get('/api/v1/bookings')
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('status').eql(200);
            expect(response.body).to.have.property('data');
            done();
        })
    })
    
})