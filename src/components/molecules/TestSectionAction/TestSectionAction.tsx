import { ICreateTest } from "../../organisms/CreateTestSection/CreateTestSection";
import { CreateTestImageLibrary } from "../CreateTestImageLibrary/CreateTestImageLibrary";
import { CreateTestTextArea } from "../CreateTestTextArea/CreateTestTextArea";
import { DeleteSectionModal } from "../DeleteSectionModal/DeleteSectionModal";
import { Modal } from "../Modal/Modal";
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer";
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux";
import { TextField } from "../../atoms/TextField/TextField";
import "./style.css";

interface ICreateTestActions {
  id?: string;
  sectionState: ICreateTest;
  error?: string;
  handleChange: (prev: string, e: string) => void;
  validateHandler?: (prev: string, e: string) => void;
  isBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const TestSectionAction = ({ id, sectionState, error,handleChange, isBlur,validateHandler }: ICreateTestActions) => {

  const { removeSection } = useHookSelector((state) => state.modalReducer)
  const dispatch = useHookDispatch()
  const handleModal = (): void => {
    dispatch(modalAction.ModalRemoveSection(true))
    document.body.style.overflow = "hidden"
  }

  return (
    <div className="test-action">
      <div className="test-action__header">
        <span className="test-action__text">Название</span>
        <TextField
          classPrefix="test-action__search"
          placeholder="Введите название раздела"
          value={sectionState.name}
          handleChange={(e) => {
            handleChange('name', e.target.value)
            validateHandler?.('name', e.target.value)
          }}
          isBlur={isBlur}
        />
      </div>
      <div className="test-action__box">
        <div className="test-action__box_wrap">
          <CreateTestTextArea
            classPrefix="test-action__area"
            placeholder="Введите описание раздела"
            value={sectionState.description}
            handleChange={(e) => {
              handleChange('description', e.target.value)
              validateHandler?.('description', e.target.value)
            }}
            isBlur={isBlur}
            error={error}
          />
        </div>
        <div className="test-action__box_wrap">
          <CreateTestImageLibrary
            handleChange={handleChange}
            imageUrl={sectionState.imageUrl}
          />
        </div>
      </div>
      {
        id &&
        <div className="test-action__delete">
          <span onClick={handleModal}> Удалить раздел</span>
        </div>
      }
      {id &&
        <Modal
          classPrefix="imgSelection__modal"
          isLogin={removeSection}
          handleChanger={() => {
            dispatch(modalAction.ModalRemoveSection(false))
            document.body.style.overflow = ""
          }}
        >
          <DeleteSectionModal sectionTitle={sectionState.name} id={id} />
        </Modal>
      }
    </div>
  )
}
