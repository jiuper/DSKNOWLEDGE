import React, { useState } from 'react'
import { Button } from '../../atoms/Button/Button';
import { ILabel } from '../../atoms/Label/Label'

import './style.css'


interface ILabelWithTruncate extends ILabel {
  maxCharacters: number;
}
export const LabelWithTruncate = ({ title, classPrefix, maxCharacters }: ILabelWithTruncate) => {

  const [isBig, setIsBig] = useState<Boolean>(true)

  return (
    <>
      {title === null ? "" : title.length > maxCharacters && isBig ? <div className="LabelWithTruncate__container">
        <div className="LabelWithTruncate__text text-opacity">
          {
            title.substring(0, maxCharacters)
          }

        </div>
        <Button
          name="Развернуть"
          classPrefix="label__button"
          handleAction={() => { setIsBig(false) }}
        />
      </div>
        :
        <div className="LabelWithTruncate__container LabelWithTruncate__text">
          {title}
        </div>}
    </>
  )
}
