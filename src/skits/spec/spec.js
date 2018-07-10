var request = require('supertest');

describe('loading express', function () {
    const serverFunc = require('../server');
    let server = serverFunc(true);

    it('responds to /', function testSlash(done) {
    request(server)
        .get('/')
        .expect(200, done);
    });
    it('responds to /getskits', function testGetSkit(done) {
        request(server)
            .get('/getskits')
            .expect(500, done);
    });
    it('responds to /addskit', function testGetSkit(done) {
        request(server)
            .post('/addskit')
            .expect(400, done);
    });

    it('responds to /addskit with data', function testGetSkit(done) {
        request(server)
            .post('/addskit')
            .send({ skit: 'A wild skit' })
            .expect(500, done);
    })
    it('responds to /removeskit', function testGetSkit(done) {
        request(server)
            .delete('/removeskit')
            .expect(400, done);
    });

    it('responds to /removeskit with data', function testGetSkit(done) {
        request(server)
            .delete('/removeskit')
            .send({ id: 'anid' })
            .expect(500, done);
    })
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});
