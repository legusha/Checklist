const setModalDisplay = (show, oldState) =>  {
  return { ...oldState, modal: {...oldState.modal, show} }
}
const setModalAction = (actionName, oldState) =>  {
  return {
    ...oldState,
    modal: {
      ...oldState.modal,
      currentContentType: actionName,
    }
  }
}

export { setModalDisplay, setModalAction }
