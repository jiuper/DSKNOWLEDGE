import { TextField } from "../../atoms/TextField/TextField";
import { ICreateTest } from "../../organisms/CreateTestSection/CreateTestSection";
import { CreateTestImageLibrary } from "../CreateTestImageLibrary/CreateTestImageLibrary";
import { CreateTestTextArea } from "../CreateTestTextArea/CreateTestTextArea";


import "./style.css";

interface ICreateTestActions {
  sectionState: ICreateTest
  handleChange: (prev: string, e:string) => void
}

export const CreateTestActions = ({ sectionState, handleChange }: ICreateTestActions) => {
  
  return (
    <div className="create-actions">
      <div className="create-actions__header">
        <span className="create-actions__text">Название</span>
        <TextField
          classPrefix="create-actions__search"
          placeholder="Введите название текста"
          value={sectionState.name}
          handleChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="create-actions__box">
        <div className="create-actions__box_wrap">
          <CreateTestTextArea
            placeholder="Введите описание раздела"
            value={sectionState.description}
            handleChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
        <div className="create-actions__box_wrap">
          <CreateTestImageLibrary
            handleChange={handleChange}
            imageUrl={sectionState.imageUrl}
          />
        </div>

      </div>
    </div>
  )
}
