import React from 'react'
import { Picture } from '../../atoms/Picture/Picture'
import exclamation from '../../../assets/images/exclamation-mark.svg'
import { Label } from '../../atoms/Label/Label'
import { Button } from '../../atoms/Button/Button'
import "./style.css"
import { IModalCancel } from '../../../types/type'


export const TestCancel = ({warning,annotation,buttonText, src, handleAction,handleAccept}:IModalCancel) => {
  return (
    <section className="testCancel__container">
        <div className="testCancel__description">
            <Picture 
            src= {src || exclamation}
            alt="no"
            classPrefix="testCancel__description_exclamation"
            />
            <Label 
            title={warning}
            classPrefix= "testCancel__description__label_warning"
            />
            <Label 
            title = {annotation}
            classPrefix = "testCancel__description__label_annotation"
            />
        </div>
        <div className = "testCancel__buttons">
            <Button 
            classPrefix="testCance__buttons_cancel-button"
            name={buttonText}
            handleAction={handleAccept}
            />
            <Button 
            classPrefix="testCance__buttons_getback-button"
            name="Назад"
            handleAction={handleAction}
            />
        </div>
    </section>
  )
}
