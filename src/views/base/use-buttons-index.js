import React, {useState} from 'react';
import {Button} from '../../components/ui'

export default function useButtonsIndex(buttonsVariant, buttonsHandler) {
  const [buttonsIndex, setButtonsIndex] = useState(0)

  const renderButton = (btn) => {
    const {color, label} = btn

    return (
      <Button
        color={color}
        label={label}
        handler={() => buttonsHandler(btn)}
      />
    )
  }

  const buttonsCreate = () => {
    return renderButton(buttonsVariant[buttonsIndex])
  }

  return [setButtonsIndex, buttonsCreate]
}
