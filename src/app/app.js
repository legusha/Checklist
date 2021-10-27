import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { RouterProvider } from '~/router'
import { useAppState } from '~/hooks'

import { AppProvider } from '~/components/app-context';
import ModalActions from '~/components/modal';
import ModalContent from '~/components/modal-content';
import ErrorView from '~/views/error'

import request from '~/services/request';

const Page404 = () => <h1>Four: 404 </h1>

export default function App () {
  const services = {
    request,
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

  const Content = () => (
    <section>
      <Switch>
        <AppProvider value={{ app }}>
          <RouterProvider/>
        </AppProvider>
      </Switch>
      <ModalActions modal={app.modal} />
    </section>
  )

  return (
    <main className="App, mt-4">
      <Content/>
    </main>
  )
}
