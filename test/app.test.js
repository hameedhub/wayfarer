import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
chai.use(chaiHttp);

describe('Test App Entry point',()=>{
    it('should be able to welcome to user to API endpoint', (done)=>{
        chai.request(app)
        .get('/')
        .end((error, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('message');
            done();
        })
        
    })
    it('should send not found error for invalid route', (done)=>{
        chai.request(app)
        .get('/user')
        .end((error, response)=>{
            expect(response).to.have.status(404);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('status').to.eql(404);
            expect(response.body).to.have.property('error');
            done();
        })
        
    })
})