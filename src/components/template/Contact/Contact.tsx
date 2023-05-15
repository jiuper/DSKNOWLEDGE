import { Label } from "../../atoms/Label/Label"
import { Picture } from "../../atoms/Picture/Picture"
import phone from "../../../assets/images/contact-phone-icon.svg"
import location from "../../../assets/images/location-icon.svg"
import mail from "../../../assets/images/mail-icon.svg"
import { numbers, social } from "../../../constants/links"
import { Link } from "../../atoms/Link/Link"

import "./style.css"

interface IContact {
	classPrefix?: string;
}

export const Contact = ({ classPrefix }: IContact) => {

	return (
		<section className={`contacts ${classPrefix}`}>
			<div className="contacts__wrapper">
				<div className="contacts__container">
					<div className="contacts__container__title">
						<Label
							title="Контактные данные"
						/>
					</div>
					<div className="contacts__container__numbers">
						<div className="contacts__container__picture">
							<Picture
								src={phone}
								alt="phone"
							/>
						</div>
						<div className="contacts__container__numbers__list">
							{
								numbers.map((el, i) =>
									<Link
										key={i}
										href={el.href}
										title={el.title}
										classPrefix="contacts__container__numbers__list_link"
									/>
								)
							}
						</div>
					</div>
					<div className="contacts__container__adress">
						<div className="contacts__container__picture">
							<Picture
								src={location}
								alt="location"
							/>
						</div>
						<div className="contacts__container__adress__text">
							<Label
								title="210001, Республика Беларусь, г. Витебск, ул. Комсомольская, 27. УНП 391404694"
							/>
						</div>
					</div>
					<div className="contact__container__mail">
						<div className="contacts__container__picture">
							<Picture
								src={mail}
								alt="email"
							/>
						</div>
						<div className="contact__container__mail__link">
							<Link
								href="#"
								title="info@dreamsoft.by"
							/>
						</div>
					</div>
				</div>
				<div className="contacts__social">
					{
						social.map((el, i) =>
							<Link
								key={i}
								href={el.href}
								classPrefix="contacts__social__link">
								<Picture
									classPrefix="contats__social__img"
									src={el.src} />
							</Link>)
					}
				</div>
			</div>
		</section>
	)
}
