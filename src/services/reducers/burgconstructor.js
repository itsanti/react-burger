const initialState = {
  bun: null,
  ingredients: [],
};

export const reducerBurgConstructor = (state = initialState, action) => {
  switch (action.type) {
    case action.type:
      console.log(action.type);
      return state;
    default:
      return state;
  }
};
