export default class Modal {
  constructor(modal, updateModal) {
    this.modal = modal
    this.updateModal = updateModal
  }
  setModalDisplay(show = false, context) {
    this.updateModal.bind(context)((oldState) => {
      return { ...oldState, modal: {...oldState.modal, show} }
      // return { ...oldState }
    })
  }
  getModalCurrentAction () {
    const { currentAction, actions } = this.modal
    return actions.find(item => item.typeName === currentAction)
  }
  setModalCurrentAction (typeName) {
    this.updateModal((newModal) => {
      return { ...newModal, currentAction: typeName }
    })
  }
  handleModalDisplayShow ({ typeName }) {
    this.setModalCurrentAction(typeName)
    this.setModalDisplay(true)
  }
}
