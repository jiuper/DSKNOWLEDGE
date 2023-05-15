import { Picture } from "../../atoms/Picture/Picture";
import imageContainer from "../../../assets/images/Card 2.png";
import imageContainer1 from "../../../assets/images/VectorRight.svg";
import { IconButton } from "../../atoms/IconButton/IconButton";
import "./style.css";
import { ModalTestGeneralToTest } from "../ModalTestGeneralToTest/ModalTestGeneralToTest";
import { Modal } from "../../molecules/Modal/Modal";
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer";
import {
	useHookDispatch,
	useHookSelector,
} from "../../../store/reducers/redux";
import { ITestGeneralVategoryTypes } from "../../../types/type";

export const TestGeneralCategory = ({
	name,
	description,
	onAction,
	totalNumberOfTest,
}: ITestGeneralVategoryTypes) => {
	const dispatch = useHookDispatch();
	const { isTestGeneralToTest } = useHookSelector(
		(state) => state.modalReducer
	);

	return (
		<div className="test-general">
			<div className="test-general__wrapper">
				<div>
					<Picture
						classPrefix="test-general__img"
						src={imageContainer}
						alt="icon"
					/>

					<div className="test-general__content">
						<h6 className="test-general__title">{name}</h6>
						<p className="test-general__text">{description}</p>
					</div>
				</div>

				<IconButton
					classPrefix="white-size"
					handleAction={onAction}
					name="Пройти тестирование"
					icon={imageContainer1}
				/>
			</div>
			{isTestGeneralToTest && (
				<Modal
					handleChanger={() => {
						dispatch(modalAction.ModalTestGeneralToTest(false));
						document.body.style.overflow = "";
					}}
					isLogin={isTestGeneralToTest}>
					<ModalTestGeneralToTest totalNumberOfTest={totalNumberOfTest} />
				</Modal>
			)}
		</div>
	);
};
