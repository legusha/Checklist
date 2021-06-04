const setModalDisplay = (show, oldState) =>  {
  return { ...oldState, modal: {...oldState.modal, show} }
}
const setModalAction = (actionName, oldState) =>  {
  return { ...oldState, modal: {...oldState.modal, currentAction: actionName} }
}

export { setModalDisplay, setModalAction }
