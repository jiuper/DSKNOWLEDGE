import { Label } from '../Label/Label'
import './style.css'
interface ISiring{
    indexNumber:number;
    numberOfPoints?:number;
    score?:number
}
export const Scoring = ({indexNumber, numberOfPoints,score}:ISiring) => {
  return (
    <div className="scoring__container">
        <Label 
        classPrefix="scoring__label"
        title={`Вопрос ${indexNumber}`}
        />
        
        <Label 
        classPrefix="scoring__results"
        title={`${score}/${numberOfPoints} баллов`}
        />
    </div>
  )
}
