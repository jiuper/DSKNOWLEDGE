import React from 'react'
import { Button } from '../../atoms/Button/Button'
import { Label } from '../../atoms/Label/Label'
import './style.css'
interface ITestDeleteModal{
    testTitle:string
}
export const TestDeleteModal = ({testTitle}:ITestDeleteModal) => {
  return (
    <section className="deleteTestModal__container">
    <div className="deleteTestModal__Texts">
         <Label 
         title="Удаление теста"
         classPrefix="deleteTestModal__Texts-title"
         />
         <Label 
         title={`Это действие невозможно отменить! 
         Вы действительно хотите удалить тест «${testTitle}»?`} 
         classPrefix="deleteTestModal__Texts-caption"
         />
         
    </div>
    <div className="deleteTestModal__buttonGroup">
     <Button 
     name="Отмена"
     classPrefix="deleteTestModal__buttonGroup-CancelButton"
     />
      <Button 
     name="Удалить"
     classPrefix="deleteTestModal__buttonGroup-DeletelButton"
     />
    </div>
</section>
  )
}
