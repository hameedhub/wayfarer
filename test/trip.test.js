import "@babel/polyfill";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import Query from '../model/Query';
const trip = new Query('trips');

chai.use(chaiHttp);
const URL = '/trips';

let token;
let userToken;
let trip_id;
let destination;
let origin;
describe('Test Create Trip', ()=>{
    after(async (done)=>{
        trip.delete([`id='${trip_id}'`]);
        done();
      })
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
            trip_date: "2019-07-23T09:23:43.112Z",
            fare:"21.0"
        }
        chai
        .request(app)
        .post(URL)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            trip_id = response.body.data.id;
            destination = response.body.data.destination;
            origin = response.body.data.origin;
           expect(response.body).to.have.status(201);
           expect(response.body).to.have.property('data');
           expect(response.body).to.have.property('status');
           done();
        })
    }),
    it('should not create trip body parameter is more than 6', (done)=>{
        const tripData ={
            bus_id: "342",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "2019-07-23T09:23:43.112Z",
            fare:"21.0",
            location: "Kaduna",
            time: "9am"
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
    it('should not create trip if not authorized', (done)=>{
        const tripData ={
            bus_id: "342",
            origin:  "Lagos",
            destination: "Abuja-Usa",
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
            trip_date: "2019-07-23T09:23:43.112Z",
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
    it('should not allow user if token is not available', (done)=>{
        chai
        .request(app)
        .get(`${URL}`)
        .end((error, response)=>{
            expect(response).to.have.status(401);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(401);
            done();
        })
    })
    it('should be able to filter trip by destination', (done)=>{
        chai
        .request(app)
        .get(`${URL}?destination=${destination}`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })

    it('should be able to filter trip by origin', (done)=>{
        chai
        .request(app)
        .get(`${URL}?origin=${origin}`)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })
    // test for edit trip
    it('should allow admin to edit trip', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })
    it('should allow admin to edit trip', (done)=>{
        const tripData ={
            bus_id: "1a",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })
    it('should not allow body parameter more than 6', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000",
            location: "Ilorin",
            time: "9am"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(400);
            done();
        })
    })
    it('should not allow invalid origin', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos$",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })
    it('should not allow invalid destination', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja###",
            trip_date: "10/10/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })
    it('should not allow invalid date', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/1110/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })
    it('should not allow invalid fare', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000a"
        }
        chai
        .request(app)
        .patch(`${URL}/${trip_id}`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })
    it('should not allow invalid fare', (done)=>{
        const tripData ={
            bus_id: "1",
            origin:  "Lagos",
            destination: "Abuja",
            trip_date: "10/10/2019",
            fare:"5000"
        }
        chai
        .request(app)
        .patch(`${URL}/a`)
        .send(tripData)
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(422);
            expect(response.body).to.have.property('error');
            expect(response.body).to.have.property('status').eql(422);
            done();
        })
    })

})
