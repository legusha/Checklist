import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { RouterProvider } from '~/router'
import { useAppState } from '~/hooks'

import { AppProvider } from '~/components/app-context';
import ModalActions from '~/components/modal';
import ModalContent from '~/components/modal-content';
import ErrorView from '~/views/error'
import { WithProcessing } from '~/components/hoc'

import request from '~/services/request';

const Page404 = () => <h1>Four: 404 </h1>

export default function App () {
  const services = {
    request,
  }
  const [state, provider] = useAppState(services)
  const [fetchNote, processing, error] = provider.hooks.useFetching(request.getNote)
  const [fetchTodo, processingTodo, errorTodo] = provider.hooks.useFetching(request.getTodo)
  const fetchProcessing = [processing, processingTodo]
  const fetchErrors = [error, errorTodo]

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
      const listNote = await fetchNote()
      const listTodo = await fetchTodo()

      if (!error && !errorTodo) {
        provider.note.listUpdate(listNote)
        provider.todo.listUpdate(listTodo)
      }
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

  function Content() {
    const content = () => <section>
      <Switch>
        <AppProvider value={{ app }}>
          <RouterProvider/>
        </AppProvider>
      </Switch>
      <ModalActions modal={app.modal} />
    </section>
    const a = () => <h1>Loading</h1>
    return <WithProcessing
      process={fetchProcessing}
      Content={content}
      ProcessContent={a}
    />
  }

  return (
    <main className="App, mt-4">
      <WithProcessing
        process={fetchErrors}
        Content={Content}
        ProcessContent={ErrorView}
      />
    </main>
  )
}
