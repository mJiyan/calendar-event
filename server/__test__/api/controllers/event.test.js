const should = require('should'),
    request = require('supertest'),
    app = require('../../../src/app');

let model = require('../helpers/test.model.json');

let token;
let eventId;

let event = model.event;


describe('POST /events', () => {

    const { title, ...eventWithoutTitle } = event;

    test('It should require a title', (done) => {
        return request(app)
            .post('/events')
            .send(eventWithoutTitle)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(500);
                done();
            });
    });


    test('It should create a new event', (done) => {
        return request(app)
            .post('/events')
            .send(event)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                eventId = res.body.id;
                done();
            });
    });
});


describe('GET /events', () => {

    test('It should responds with JSON Array', () => {
        return request(app)
            .get('/events')
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});



describe('GET /event/:id', () => {

    test('It should responds with JSON', () => {
        return request(app)
            .get(`/event/${eventId}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});


describe('PUT /event/:id', () => {
    test('It should update the event title', () => {
        return request(app)
            .put(`/event/${eventId}`)
            .send({ title: 'False Alarm'})
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});


describe('DELETE /event/:id', () => {


    test('It should require exist id', () => {
        return request(app)
            .delete(`/event/111111111111111111111111`)
            .then((res) => {
                expect(res.statusCode).toBe(404);
            });
    });


    test('It should remove the event', () => {
        return request(app)
            .delete(`/event/${eventId}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });

});