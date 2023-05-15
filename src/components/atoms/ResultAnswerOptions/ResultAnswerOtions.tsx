import { Picture } from '../Picture/Picture'
import CheckboxOn from '../../../assets/images/CheckboxOn.svg'
import CheckboxOff from '../../../assets/images/CheckboxOff.png'
import InCorrectIcon from '../../../assets/images/InCorrectIcon.svg'
import correctIcon from '../../../assets/images/correctIcon.svg'
import { Label } from '../Label/Label'
import './style.css'


export interface IOptions{
    title:string;
    isChecked:boolean;
    isCorrect:boolean;
}

export const ResultAnswerOtions = ({title,isChecked,isCorrect}:IOptions) => {
  return (
    <div className="resultAnswerOtions__container">
        <div className="resultAnswerOtions__checkedIcon">
            <Picture 
            src={isChecked ? CheckboxOn : CheckboxOff}
            />
        </div>
        <div className="resultAnswerOtions__label">
            <Label 
            title={title} 
            />
        </div>
        <div className="resultAnswerOtions__correctIcon">
        <Picture 
            src={isCorrect ? correctIcon : InCorrectIcon}
            />
        </div>
    </div>
  )
}
