import Checklist from './checklist'
import Note from './note'
import Todo from './todo'
import ModalService from './modal'

import * as MutationNote from './mutationNote'
import * as MutationTodo from './mutationTodo'

const mutation = {
  ...MutationNote,
  ...MutationTodo
}

export {
  Checklist,
  Note,
  Todo,
  ModalService,
  mutation
}
