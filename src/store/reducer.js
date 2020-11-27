
const defaultState = {
  counter: 0
}
const reducer = (state = defaultState, action) => {

  switch (action.type) {
    case 'RND':
      return state.counter + action.payload;

    case 'INC':
      console.log(state)
      return state.counter + 1;

    case 'DEC':
      return state.counter - 1;

    default:
      return state;
  }
};

export default reducer;
