import * as actions from '../../../action/categoryActions';

import reducerCategory from '../../../reducer/category';

describe('reducerCategory', () => {

  it('state should start as empty array', () => {
    const newState = reducerCategory([], 'aaaaaaa');
    expect(newState).toEqual([]);
  });

  it('should add category', () => {
    let created = actions.categoryCreate({name: 'coffee'});

    let newState = reducerCategory([], created);

    expect(newState.length).toBe(1);

  });

  it('should update a note', () => {
    let created = actions.categoryCreate({
      name: 'name',
    });
    let newState = reducerCategory([], created);

    expect(newState.length).toBe(1);

    let updated = actions.categoryUpdate({
      id: newState[0].id,
      name: 'not name',
    });
    let updatedState = reducerCategory(newState, updated);

    expect(updatedState[0].name).toBe('not name');
  });


  it('should delete a category', () => {
    let created = actions.categoryCreate({
      name: 'name',
    });
    let newState = reducerCategory([], created);

    expect(newState.length).toBe(1);

    let removed = actions.categoryDestroy({
      id: newState[0].id,
    });

    let removedState = reducerCategory(newState, removed);

    expect(removedState.length).toBe(0);
  });

});