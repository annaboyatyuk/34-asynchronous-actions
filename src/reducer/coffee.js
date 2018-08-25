let initialState = [];

export default (state = initialState, action) => {

  let {type, payload} = action;

  switch(type) {
  case 'COFFEE_CREATE': return [...state, payload];
  case 'COFFEE_UPDATE': return state.map(coffee => coffee._id === payload._id ? payload : coffee);
  case 'COFFEE_DESTROY': return state.filter(coffee => coffee._id !== payload._id);
  case 'COFFEE_GETALL': return [...state, ...payload];
  default: return state;
  }
};

