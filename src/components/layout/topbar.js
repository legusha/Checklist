import React from 'react';

export default function Topbar({rightContent, leftContent = 'Welcome to Checklist'}) {
  return (
    <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary d-flex align-items-center justify-content-between">
      <div>
        <h3 className={'text-muted font-weight-6 font-24'}>{leftContent}</h3>
      </div>
      <div>
        {rightContent}
      </div>
    </div>
  )
}