import {mutation} from "../services";

const {
  updateTodo,
  updateNote,
  setModalDisplay,
  setModalAction
} = mutation;

export default function ({ checkList }, setState) {
  return {
    // Checklist

    updateTodo: (item) => {
      const handler = updateTodo.bind(this, checkList, item);
      setState(handler);
    },
    updateNote: (item) => {
      const handler = updateNote.bind(this, checkList, item);
      setState(handler)
    },


    // Modal

    modalUpdateContent: (value) => {
      const handler = setModalAction.bind(this, value);
      setState(handler)
    },

    modalUpdate: (value) => {
      const handler = setModalDisplay.bind(this, value);
      setState(handler)
    },

    modalToggle(value) {
      this.modalUpdate(value)
    },

    modalShow() {
      this.modalUpdate(true)
    },

    modalHide() {
      this.modalUpdate(false)
    }
  }
}
