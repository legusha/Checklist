import * as MutationNote from './mutation-note'
import * as MutationTodo from './mutation-todo'
import * as MutationModal from './mutation-modal'

const mutation = {
  ...MutationNote,
  ...MutationTodo,
  ...MutationModal
}

export default mutation
