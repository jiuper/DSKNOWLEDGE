import "./style.css"

export interface EditListItemType {
	ordinal: number;
	title: string;
	type: string;
	point: number;
	pointType: string;
}

export const EditListItem = ({ ordinal, title, type, point, pointType }: EditListItemType) => {
	return (
		<li className="edit-item">
			<div className="edit-item__left">
				<span>{ordinal}</span>
				<span>{title}</span>
			</div>
			<div className="edit-item__right">
                <span className="edit-item-span-type">
                    {type === "ManyOfMany" && "Несколько из списка"}
									{type === "OneOfMany" && "Один из списка"}
									{type === "InputText" && "Текстовое поле"}
                </span>
				<span className="edit-item-span">{point}</span>
			</div>
		</li>
	)
}
