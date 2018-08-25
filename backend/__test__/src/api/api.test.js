'use strict';

import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../../../scripts/models.helper.js';
import Coffee from '../../../src/models/coffee';
import Parks from '../../../src/models/parks';

const mockRequest = supertest(server);

const COFFEE_URL = '/api/v1/coffee';
const PARKS_URL = '/api/v1/parks';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
afterEach(modelsHelper.afterEach);

describe('api', () => {

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('get back empty array for find', () => {
    return mockRequest
      .get(COFFEE_URL)
      .then(results => {
        let coffees = JSON.parse(results.text);
        expect(coffees).toEqual([]);
      });
  });

  it('GET - test 200, returns a resource with a valid body', () => {
    return mockRequest
      .get(COFFEE_URL)
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('should return 400 bad request when no id was provided', () => {
    return mockRequest
      .get(COFFEE_URL)
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });

  it('should return 200 and contain response body for request made with valid id', () => {
    let coffeeModel = { name: 'name', roast: 'roast', coffee: 'coffee' };
    return mockRequest
      .post(COFFEE_URL)
      .send(coffeeModel)
      .then(data => {
        return mockRequest
          .get(`${COFFEE_URL}/${data.body._id}`)
          .then(response => {
            expect(response.body.name).toEqual(data.body.name);
          });
      });
  });

  it('should return 400 bad request when there is no body content or invalid body content', () => {
    return mockRequest
      .post(COFFEE_URL)
      .catch(err => {
        expect(err.response.text).toBe('Bad Request');
        expect(err.status).toBe(400);
      });
  });

  it('should  respond with the body content', () => {
    let coffeeModel = { name: 'name', roast: 'roast', coffee: 'coffee' };
    return mockRequest
      .post(COFFEE_URL)
      .send(coffeeModel)
      .then(data => {
        expect(data.body.coffee).toBe('coffee');
      });
  });




});



describe('coffee model', () => {

  it('should create coffee', () => {
    return Coffee
      .create({ name: 'name', roast: 'roast', coffee: 'coffee' })
      .then(coffee => {
        expect(coffee.name).toBe('name');
      });
  });

});

describe('parks model', () => {

  it('should create parks', () => {
    return Parks
      .create({ location: 'parks' })
      .then(parks => {
        expect(parks.location).toBe('parks');
      });
  });

});


describe('parks and coffee populate', () => {

  it('should populate parks in the coffee model', () => {
    let parksModel = { location: 'seattle' };

    return mockRequest
      .post(PARKS_URL)
      .send(parksModel)
      .then(response => {
        console.log('response', response.body);
        let coffeeModel = { name: 'name', roast: 'roast', coffee: 'coffee', park: response.body._id };
        return mockRequest
          .post(COFFEE_URL)
          .send(coffeeModel)
          .then(() => {
            return mockRequest
              .get(COFFEE_URL)
              .then(response => {
                expect(response.body[0].park.location).toBe('seattle');
              });
          });
      });
  });
});




