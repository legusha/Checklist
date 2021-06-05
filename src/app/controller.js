import {mutation} from "../services";

const {
  updateTodo,
  updateNote,
  setModalDisplay,
  setModalAction
} = mutation;

export default function ({ checkList }, setState) {
  return {
    updateTodo: (item) => {
      const handler = updateTodo.bind(this, checkList, item);
      setState(handler);
    },
    updateNote: (item) => {
      const handler = updateNote.bind(this, checkList, item);
      setState(handler)
    },
    updateModal: (value) => {
      const handler = setModalDisplay.bind(this, value);
      setState(handler)
    },
    updateModalActionType: (value) => {
      const handler = setModalAction.bind(this, value);
      setState(handler)
    },

    modalToggle(value) {
      this.updateModal(value)
    },

    showModal() {
      this.updateModal(true)
    },

    hideModal() {
      this.updateModal(false)
    }
  }
}
