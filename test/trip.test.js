import "@babel/polyfill";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const URL = '/trips';

let token;
let userToken;
let trip_id;
describe('Test Create Trip', ()=>{
    before(done=>{
        const adminLogin={
            email: "admin@mail.com",
            password: "Password123#"
        }
        chai.request(app)
        .post('/auth/signin')
        .send(adminLogin)
        .end((error, response)=>{
           token = `Bearer ${response.body.data.token}`;
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
    it('should be able to create a trip', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "12-12-2050",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            trip_id = response.body.data[0].id;
           expect(response.body).to.have.status(201);
           expect(response.body).to.have.property('data');
           expect(response.body).to.have.property('status');
           done();
        })
    }),
    it('should not create trip if not authorized', (done)=>{
        const tripData ={
            bus_id: "342",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .end((error, response)=>{
           expect(response.body).to.have.status(401);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(401);
           done();
        })
    }),
    it('should not create trip if not authorized as admin', (done)=>{
        const tripData ={
            bus_id: "342",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', userToken)
        .end((error, response)=>{
           expect(response.body).to.have.status(401);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(401);
           done();
        })
    }),
    it('should not create trip if parameter is empty', (done)=>{
        const tripData ={
            
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    }),
    it('should not create trip if bus_id is not provided', (done)=>{
        const tripData ={
            bus_id: "",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    }),
    it('should not create trip if bus_id is not valid', (done)=>{
        const tripData ={
            bus_id: "11as",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create trip if origin is empty', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create trip if origin is contain invalid character', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos$",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create trip if destination is empty', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create trip if destination is not valid', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja-Jabi$",
            trip_date: "3-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    }),
    it('should not create trip if trip date is empty', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    }),
    it('should not create trip if trip date is invalid', (done)=>{
        const tripData ={
            bus_id: "12",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "45-12-2019",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create trip if fare is empty', (done)=>{
        const tripData ={
            bus_id: "12",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:""
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    }),
    it('should not create trip if fare is not valid', (done)=>{
        const tripData ={
            bus_id: "12",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "3-12-2019",
            fare:"8ad"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    }),
    //view trips
    it('should allow users and admin to view trips with vaild token', ()=>{
        chai
        .request(app)
        .get(`${URL}`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
        })
    })
    it('should not allow user if token is not available', ()=>{
        chai
        .request(app)
        .get(`${URL}`)
        .end((error, response)=>{
            expect(response).to.have.status(401);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(401);
        })
    })
    it('should allow admin to cancel trip', ()=>{
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
        })
    })
    it('should not allow admin to cancel trip if body parameter is provided', ()=>{
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .set('Authorization', token)
        .send({id: 1})
        .end((error, response)=>{
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(400);
        })
    })
    it('should not allow admin to cancel trip id is not vaild', ()=>{
        chai
        .request(app)
        .patch(`${URL}/a`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
        })
    })
    it('should not allow admin to cancel trip if trip id does not exist', ()=>{
        chai
        .request(app)
        .patch(`${URL}/100000`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(404);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(404);
        })
    })
    it('should filter trip by destination', (done)=>{
        chai
        .request(app)
        .get(`${URL}/destination/Abuja-Usa`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })
    it('should not filter trip if body parameter is passed', (done)=>{
        chai
        .request(app)
        .get(`${URL}/destination/Abuja-Usa`)
        .send({destination:"Abuja-Usa"})
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(400);
            done()
        })
    })
    it('should not filter trip if destination is not vaild', (done)=>{
        chai
        .request(app)
        .get(`${URL}/destination/$Abuja-Usa`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done()
        })
    })
    it('should filter trip by origin', (done)=>{
        chai
        .request(app)
        .get(`${URL}/origin/Lagos`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })
    it('should not filter trip by origin if body parameter is passed', (done)=>{
        chai
        .request(app)
        .get(`${URL}/origin/Lagos`)
        .send({origin:"Lagos"})
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(400);
            done()
        })
    })
    it('should not filter trip if origin is not vaild', (done)=>{
        chai
        .request(app)
        .get(`/trips/origin/$Lagos`)
        .set('Authorization', userToken)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done()
        })
    })
})
