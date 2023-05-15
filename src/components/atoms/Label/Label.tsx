import "./style.css"

export interface ILabel {
	title: string;
	classPrefix?: string
}

export const Label = ({ title, classPrefix }: ILabel) => {
	return (
		<span className={classPrefix}>{title}</span>
	)
}
