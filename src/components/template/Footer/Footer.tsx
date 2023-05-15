import { Navigation } from "../../molecules/Navigation/Navigation"
import { Logo } from "../../atoms/Logo/Logo"
import { link, social } from "../../../constants/links"
import { Picture } from "../../atoms/Picture/Picture"
import { Link } from "../../atoms/Link/Link"
import { Label } from "../../atoms/Label/Label"
import { Modal } from "../../molecules/Modal/Modal"
import { FeedbackForm } from "../../organisms/FeedbackForm/FeedbackForm"
import { Contact } from "../Contact/Contact"
import { IFeedbackForm } from "../../../types/type"
import { FetchModalContact } from "../../../api/FetchModalContact/FetchModalContact"
import "./style.css"
import { useHookDispatch, useHookSelector } from "../../../store/reducers/redux"
import { modalAction } from "../../../store/reducers/modalReduser/modalReducer"

export const Footer = () => {

	const fetchData = async (value: IFeedbackForm) => {
		try {
			 await FetchModalContact(value)
		} catch (error) {
			switch (error) {
				case "404":
					alert("Страница не найдена")
					break
				case "400":
					alert("Bad red")
					break
				default:
					alert("НЕизвестная ошибка")
			}
		}
		
	}
		const {isContactModalActive} = useHookSelector((state) => state.modalReducer)
		const dispatch = useHookDispatch();
	return (
		<footer className="footer">
			<div className="footer__wrapper container">
				<div className="footer__content">
					<div className="footer__logo">
						<Logo />
					</div>

					<Navigation classPrefix="footer__nav" links={link} />

					<div className="footer__socials">
						{
							social.map((el, i) =>
								<Link
									key={i}
									href={el.href}
									classPrefix="footer__social_link">
									<Picture
										classPrefix="footer__social_img"
										src={el.src} />
								</Link>)
						}
					</div>

				</div>

				<Label classPrefix="footer__label" title="© 2012-2022 ООО «ДримСофт». All rights reserved." />

			</div>

			{isContactModalActive && <Modal handleChanger={() => {
				dispatch(modalAction.ModalChanger(false))
				document.body.style.overflow = ""
			}} isLogin={isContactModalActive}>
				<FeedbackForm onSubmit={fetchData}>
					<Contact classPrefix="footer__contact" />
				</FeedbackForm>
			</Modal>}

		</footer>
	)
}
