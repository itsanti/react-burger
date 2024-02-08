const initialState = {
  bun: null,
  ingredients: [],
};

export const reducerBurgConstructor = (state = initialState, action) => {
  switch (action.type) {
    case action.type:
      console.log('reducerBurgConstructor: not implemented');
      return state;
    default:
      return state;
  }
};
