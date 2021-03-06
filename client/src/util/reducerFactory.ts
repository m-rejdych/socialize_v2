const createReducer = (strategyMap, initialState) => (
  state = initialState,
  action,
) => {
  if (strategyMap[action.type]) return strategyMap[action.type](state, action);
  return strategyMap.__default__(state);
};

export default createReducer;
