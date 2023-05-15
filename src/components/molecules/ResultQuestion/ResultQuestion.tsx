import { Label } from '../../atoms/Label/Label'
import { Picture } from '../../atoms/Picture/Picture'
import { ResultAnswerOtions } from '../../atoms/ResultAnswerOptions/ResultAnswerOtions'
import { Scoring } from '../../atoms/Scoring/Scoring'

import './style.css'

export interface IResultsTest {
  questionID: number;
  questionWeight?: number;
  score?:number
  picture: string;
  questionTitle: string;
  answers: string[];
  trueAnswers: string[];
  listSelectedAnswers: string[];
}
export const ResultQuestion = ({
  questionID,
  questionWeight,
  picture,
  questionTitle,
  answers,
  trueAnswers,
  listSelectedAnswers,
  score
}: IResultsTest) => {

  return (
    <div className="resultQuestion_container">

      <Scoring
        indexNumber={questionID}
        numberOfPoints={questionWeight ?? 0}
        score={score}
      />

      <div className="resultQuestion_pic">
        <Picture
          src={picture ?? "https://sovman.ru/wp-content/uploads/2021/11/20944136-scaled.jpg"}
          classPrefix="resultQuestion_pic"

        />
      </div>
      <div className="resultQuestion__answer">
        <Label
          title={questionTitle}
          classPrefix="resultQuestion__answer-text"
        />
        <div className="resultQuestion__answer-smallText" >Варианты ответа:</div>
        <div className="resultQuestion__answer-options">
          {
            answers.map((el, i) => (
              <ResultAnswerOtions
                key={i}
                title={el}
                isCorrect={trueAnswers.includes(el)}
                isChecked={listSelectedAnswers.includes(el)}
              />))
          }
        </div>

      </div>
    </div>
  )

}
