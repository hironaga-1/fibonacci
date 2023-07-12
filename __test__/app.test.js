const request = require('supertest');
const app = require('../app');

describe('GET /fib', () => {
    it('returns the nth Fibonacci number', async () => {
        const response = await request(app).get('/fib?n=10');
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(55);
    });

    it('return the nth Fibonacci number (more than max integer)', async () => {
        const response = await request(app).get('/fib?n=99');
        expect(response.statusCode).toBe(200);
        expect(response.body.result).not.toBe(218922995834555169026);
        expect(response.body.message).toBe('Any more than this cannot be safely computed due to the language specification.')
    });

    it('return the nth Fibonacci number (infinity)', async () => {
        const response = await request(app).get('/fib?n=10000');
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(null);
        expect(response.body.message).toBe('The result is Infinity!');
    });

    it('handles invalid input (negative number)', async () => {
        const response = await request(app).get('/fib?n=-1');
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('Bad request.');
    });

    it('handles invalid input (string)', async () => {
        const response = await request(app).get('/fib?n=hironaga');
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe(400);
        expect(response.body.message).toBe('Bad request.');
    });
});

