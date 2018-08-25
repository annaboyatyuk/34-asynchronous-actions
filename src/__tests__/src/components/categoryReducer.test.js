import * as actions from '../../../action/coffeeActions';

import reducerCoffee from '../../../reducer/coffee';

describe('reducerCoffee', () => {

  it('state should start as empty array', () => {
    const newState = reducerCoffee([], 'aaaaaaa');
    expect(newState).toEqual([]);
  });

  it('should add coffee', () => {
    let created = actions.coffeeCreate({name: 'coffee'});

    let newState = reducerCoffee([], created);

    expect(newState.length).toBe(1);

  });

  it('should update a note', () => {
    let created = actions.coffeeCreate({
      name: 'name',
    });
    let newState = reducerCoffee([], created);

    expect(newState.length).toBe(1);

    let updated = actions.coffeeUpdate({
      id: newState[0].id,
      name: 'not name',
    });
    let updatedState = reducerCoffee(newState, updated);

    expect(updatedState[0].name).toBe('not name');
  });


  it('should delete a coffee', () => {
    let created = actions.coffeeCreate({
      name: 'name',
    });
    let newState = reducerCoffee([], created);

    expect(newState.length).toBe(1);

    let removed = actions.coffeeDestroy({
      id: newState[0].id,
    });

    let removedState = reducerCoffee(newState, removed);

    expect(removedState.length).toBe(0);
  });

});