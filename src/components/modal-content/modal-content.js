import BButton from "react-bootstrap/Button";
import React from "react";

export default function ({ handlers }) {
  const { modalShow, modalHide } = handlers
  return [
    {
      typeName: 'checklist:item:edit',
      content: {
        header: <div>Item edit</div>,
        body: <div>Item edit</div>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide}>
            Close
          </BButton>
          <BButton variant="primary" onClick={modalHide}>
            Save Changes
          </BButton>
        </div>
      }
    },
    {
      typeName: 'checklist:item:remove',
      content: {
        header: <div>Header</div>,
        body: <div>Body</div>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide}>
            Close
          </BButton>
          <BButton variant="primary" onClick={modalHide}>
            Save Changes
          </BButton>
        </div>
      }
    }
  ]
}
