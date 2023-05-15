import { Button } from '../../atoms/Button/Button'
import { Label } from '../../atoms/Label/Label'
import './style.css'
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"
import { useHookDispatch } from "../../../store/reducers/redux"


export const QuestionDeleteModal = () => {

  const dispatch = useHookDispatch()

  return (
    <div className="deleteQuestionModal__container">
    <div className="deleteQuestionModal__Texts">
         <Label 
         title="Удаление вопроса"
         classPrefix="deleteQuestionModal__Texts-title"
         />
         <Label 
         title={`Это действие невозможно отменить! 
         Вы действительно хотите удалить вопрос?`} 
         classPrefix="deleteQuestionModal__Texts-caption"
         />
         
    </div>
    <div className="deleteQuestionModal__buttonGroup">
     <Button 
     name="Отмена"
     classPrefix="deleteQuestionModal__buttonGroup-CancelButton"
     handleAction={()=>{
       dispatch(modalAction.ModalChangerTestDeleting(false))
       document.body.style.overflow = ""
     }}
     />
      <Button 
     name="Удалить"
     classPrefix="deleteQuestionModal__buttonGroup-DeletelButton"
     
     />
    </div>
</div>
  )
}
