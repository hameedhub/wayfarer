import "@babel/polyfill";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);

let token;
describe('Test Bus Route', ()=>{
    before(done=>{
        const adminLogin={
            email: "admin@mail.com",
            password: "Password123#"
        }
        chai.request(app)
        .post('/api/v1/login')
        .send(adminLogin)
        .end((error, response)=>{
           token = `Bearer ${response.body.token}`;
            done();
        })
    })
    it('should be able to create a bus', (done)=>{
        const data ={
            number_plate: "123-1A",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(201);
           expect(response.body).to.have.property('data');
           expect(response.body).to.have.property('status');
           done();
        })
    })
    it('should not create bus if not authorized', (done)=>{
        const data ={
            number_plate: "123-1A",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .end((error, response)=>{
           expect(response).to.have.status(401);
           expect(response.body).to.have.property('status').eql(401);
           done();
        })
    })
    it('should not create bus if no parameters given', (done)=>{
        const data ={
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if parameter are more than required ', (done)=>{
        const data ={
            number_plate: "123-1A",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: 1,
            size: "big"

        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status');
           done();
        })
    })
    it('should not create bus if number plate is not provided ', (done)=>{
        const data ={
            number_plate: "",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if number plate is not valid ', (done)=>{
        const data ={
            number_plate: "12**",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create bus if number manufacturer is not provided ', (done)=>{
        const data ={
            number_plate: "12-A",
            manufacturer: "",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if manufacturer is not provided ', (done)=>{
        const data ={
            number_plate: "12-Q",
            manufacturer: "",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if manufacturer is not valid ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "823%",
            model: "Ace",
            year: 2019,
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create bus if model is not provided ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "",
            year: 2019,
            capacity: 10
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if model is not valid ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "Ace##",
            year: 2019,
            capacity: 10
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create bus if year is not provided ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "Ace",
            year: "",
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if year is not valid ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "Ace",
            year: "a12a",
            capacity: 1
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should not create bus if capacity is not provided ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: ""
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(400);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(400);
           done();
        })
    })
    it('should not create bus if capacity is not valid ', (done)=>{
        const data ={
            number_plate: "34-12-AS",
            manufacturer: "Toyota",
            model: "Ace",
            year: 2019,
            capacity: "a"
        }
        chai
        .request(app)
        .post('/api/v1/bus')
        .send(data)
        .set('Authorization', token)
        .end((error, response)=>{
           expect(response.body).to.have.status(422);
           expect(response.body).to.have.property('error');
           expect(response.body).to.have.property('status').eql(422);
           done();
        })
    })
    it('should be able to get buses provided an admin is logged in', (done)=>{
        chai
        .request(app)
        .get('/api/v1/buses')
        .set('Authorization', token)
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body).to.have.property('status').eql(200);
            done();
        })
    })
})

