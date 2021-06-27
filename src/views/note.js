import React from 'react'
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';

function Note() {
  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={null}/>
      <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
        <EmptyValue text={'Note not found'} />
      </div>
    </section>
  );
}

export default Note;
