import React, { useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import { RouterProvider } from '../router'
import { useAppState } from '../hooks'

import PageBase from '~/views/base';
import PageNote from '~/views/note';

import { ModelProvider } from '~/components/model-context';
import ModalActions from '~/components/modal';
import ModalContent from '~/components/modal-content';

import request from '~/services/request';
import { emitter } from '~/services/events';

export default function App2 () {
  const services = {
    request,
    emitter,
  }
  const [state, provider] = useAppState(services)

  function initModalContent(props = {}) {
    return ModalContent({
      handlers: {
        modalShow: provider.modal.show,
        modalHide: provider.modal.hide,
      },
      modal: initApiModal(),
      props,
    })
  }

  // Init handlers
  function initApiCheckList() {
    return {
      todoNew: (props) => ({...props, complete: !props.complete}),
      todoNewCreate: (props) => console.log(props),
      todoUpdate: provider.todo.itemUpdate,
      todoGetByNoteID: request.getTodoByNoteID,
      noteNew: provider.note.itemNew,
      noteUpdate: provider.note.itemUpdate,
      noteByID: request.getNoteByID,
      noteDelete: provider.note.listRemoveItem,
    }
  }
  function initApiModal() {
    return {
      update: (value, modalContentType = 'checklist:item:remove') => {
        provider.modal.updateContent(modalContentType);
        provider.modal.toggle(value)
      },
      updateWithItem: (item, value, modalContentType = 'checklist:item:remove', props) => {
        provider.modal.updateContent(modalContentType);
        provider.modal.updateProviderContent(initModalContent({ item, ...props }))
        provider.modal.toggle(value)
      },
      currentContent: () => {
        const { currentContentType } = state.modal
        return state.modal.content.find(item => item.typeName === currentContentType)
      },
    }
  }

  useEffect(() => {
    const handler = async () => {
      const listNote = await request.getNote();
      const listTodo = await request.getTodo();
      provider.note.listUpdate(listNote)
      provider.todo.listUpdate(listTodo)
    }
    handler()
  }, [])

  const apiCheckList = initApiCheckList();
  const apiModal = initApiModal();

  const checklist = {
    note: state.note,
    todo: state.todoList,
  }
  const app = {
    checkList: {
      ...checklist,
      ...apiCheckList,
    },
    modal: {
      ...state.modal,
      ...apiModal
    }
  }

  return (
    <div className="App, mt-4">
      <Switch>
        <ModelProvider value={{ app }}>
          <RouterProvider/>
        </ModelProvider>
      </Switch>
      <ModalActions modal={app.modal} />
    </div>
  )
}
