import superagent from 'superagent';


const ENV = {};
ENV.apiUrl = 'https://lab14relationshipmodeling401.herokuapp.com';

export const coffeeCreate = coffee => dispatch => {
  superagent.post(`${ENV.apiUrl}/api/v1/coffee`, coffee)
    .then(res => {
      dispatch ({
        type: 'COFFEE_CREATE',
        payload: res.body,
      });
    });
};

export const coffeeUpdate = coffee => dispatch => {
  let id = coffee.id;
  superagent.put(`${ENV.apiUrl}/api/v1/coffee/${id}`, coffee)
    .then(res => 
      dispatch({
        type: 'COFFEE_UPDATE',
        payload: res.body,
      }));
};

export const coffeeDestroy = coffee => dispatch => {
  superagent.delete(`${ENV.apiUrl}/api/v1/coffee/${coffee._id}`)
    .then(dispatch({
      type: 'COFFEE_DESTROY',
      payload: coffee,
    }));
};

export const coffeeGetAll = () => dispatch => {
  superagent.get(`${ENV.apiUrl}/api/v1/coffee`)
    .then(res => {
      dispatch({
        type: 'COFFEE_GETALL',
        payload: res.body,
      });
    });
};

