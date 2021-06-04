import BButton from "react-bootstrap/Button";
import React from "react";

export default function ({ handlers }) {
  const { showModal } = handlers
  return [
    {
      typeName: 'checklist:item:remove',
      content: {
        header: <div>Header</div>,
        body: <div>Body</div>,
        footer: <div>
          <BButton variant="secondary" onClick={showModal}>
            Close
          </BButton>
          <BButton variant="primary" onClick={showModal}>
            Save Changes
          </BButton>
        </div>
      }
    }
  ]
}
