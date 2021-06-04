export default class Modal {
  constructor(modal, updateModal) {
    this.modal = modal
    this.updateModal = updateModal
  }
  setModalDisplay(show, oldState)  {
    return { ...oldState, modal: {...oldState.modal, show} }
  }
  getModalCurrentAction () {
    // debugger
    // console.log(this.modal)
    const { currentAction, actions } = this.modal
    return actions.find(item => item.typeName === currentAction)
  }
  setModalCurrentAction (typeName, oldState) {
    this.updateModal((newModal) => {
      return { ...newModal, modal: {...oldState.modal, currentAction: typeName} }
    })
  }
  handleModalDisplayShow ({ typeName }) {
    this.setModalCurrentAction(typeName)
    this.setModalDisplay(true)
  }
}
