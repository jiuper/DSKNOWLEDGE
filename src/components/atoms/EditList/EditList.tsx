import { ITestQuestionsData } from "../../../types/type"
import { EditListItem, EditListItemType } from "./EditListItem"

import "./style.css"

export interface EditListType {
    dataQustions: ITestQuestionsData[]
}

export const EditList = ({ dataQustions }: EditListType) => {

    return (
        <div className="edit-list">
            <div className="edit-list__header">
                <div className="edit-list__left">
                    <span>ID</span>
                    <span>Вопрос</span>
                </div>
                <div className="edit-list__right">
                    <span>Вид</span>
                    <span>Балл</span>
                </div>
            </div>
            <ul className="edit-list__roster">
                {dataQustions && dataQustions.map((item, i) => (
                    <EditListItem
                        key={item.id}
                        ordinal={i+1}
                        title={item.name}
                        type={item.questionType}
                        point={item.numberOfPoints}
                        pointType={"Авто"}
                    />
                ))}
            </ul>
        </div>
    )
}
