import BButton from "react-bootstrap/Button";
import React from "react";

export default function ({ handlers, props }) {
  const { modalShow, modalHide } = handlers
  console.log(props);
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
        header: <div className="font-20 font-weight-6 text-muted">Are you sure?</div>,
        body: <div className="font-14 font-weight-6">Please accept action or cancel.</div>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide} size="sm">
            Cancel
          </BButton>
          <BButton variant="primary" onClick={props.delete} size="sm" className="ml-3">
            Accept
          </BButton>
        </div>
      }
    }
  ]
}
