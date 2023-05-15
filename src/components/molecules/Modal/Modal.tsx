import "./style.css";

interface IModel {
	classPrefix?: string;
	children?: React.ReactNode;
	isLogin?: boolean;
	handleChanger: () => void;
}

export const Modal = ({
	classPrefix,
	children,
	isLogin,
	handleChanger,
}: IModel) => {
	window.onscroll = function () {
		return false;
	};

	return (
		<div
			className={isLogin ? " modal modal__active " : "modal"}
			onClick={handleChanger}>
			<div
				className={`${classPrefix} modal__content`}
				onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};
