import { useEffect, useState } from "react"
import { Label } from "../../components/atoms/Label/Label"
import { Picture } from "../../components/atoms/Picture/Picture"
import { TextField } from "../../components/atoms/TextField/TextField"
import image from "../../assets/images/findTest-image.svg"
import vector from "../../assets/images/vector.svg"
import glasses from "../../assets/images/firstRow-image.png"
import pencil from "../../assets/images/secondRow-image.png"
import microscope from "../../assets/images/recomendation-microscope.svg"
import doctor from "../../assets/images/recomendation-doctor.svg"
import cup from "../../assets/images/recomendation-cup.svg"
import ribbon from "../../assets/images/recomendation-ribbon.svg"
import button from "../../assets/images/main-btn-icon.svg"
import { IconButton } from "../../components/atoms/IconButton/IconButton"
import { Header } from "../../components/template/Header/Header"
import { Footer } from "../../components/template/Footer/Footer"
import { ERoutes } from "../../constants/paths"
import { useNavigate } from "react-router"
import { fetchSearchTest } from "../../api/FetchSearchTest/FetchSearchTest"
import { useHookDispatch } from "../../store/reducers/redux"
import { searchTestsAction } from "../../store/reducers/SearchTestsReducer/SearchTestsReducer"
import { useDebounce } from "../../hooks/useDebounce"

import "./style.css"

export const Main = () => {

	const href = useNavigate();
	const dispatch = useHookDispatch();
	const [searchText, setSearchText] = useState<string>("");
	const debounceSearchTerm = useDebounce(searchText);
	const handleSearch = (value: string) => setSearchText(value);

	useEffect(() => {
		if (debounceSearchTerm) {
			dispatch(fetchSearchTest(searchText))
			dispatch(searchTestsAction.searchText(searchText))
			href(ERoutes.testSearchPage)
		}
	}, [debounceSearchTerm, dispatch, href, searchText]);

	return (
		<>
			<Header mainSeacrh={true}/>

			<div className="main__wrapper">
				<div className="main__findTest container">
					<div className="main__findTest__container">
						<div className="main__findTest__container__form">
							<div className="main__findTest__container__form_caption">
								<Label
									classPrefix="main__findTest__container__form_caption"
									title="Проверь свои  навыки в профессиональной сфере." />
							</div>
							<TextField
								placeholder="Найти тест"
								classPrefix="main__findTest__container__form_input"
								value={searchText}
								handleChange={(e) => handleSearch(e.target.value)}
							/>
							<div className="main__findTest__container__form_label">
								<Label
									classPrefix="main__findTest__container__form_label"
									title="Если ты здесь, значит ты готов пройти тест!
                Сложно не будет, посмотри общее описание тестов и выбирай нужный раздел. Вперёд!"
								/>
							</div>
							<div className="main__findTest__container__form_button">
								<IconButton
									icon={button}
									name="Каталог тестов"
									classPrefix="main__findTest__container__form_button_text"
									handleAction={() => href(ERoutes.tests)}
								/>
							</div>
						</div>
						<div className="main__findTest__container__picture">
							<Picture
								src={image}
								alt="image"
								classPrefix="" />
						</div>
					</div>
					<div className="main__findTest__vector">
						<Picture
							src={vector}
							alt="image"
							classPrefix="" />
					</div>
				</div>
				<div className="main__info container">
					<div className="main__info__row">
						<div className="main__info__row_picture">
							<Picture
								src={glasses}
								alt="image" />
						</div>
						<div className="main__info__row__text">
							<div className="main__info__row__text_title padding-left">
								<Label
									title="Тратьте меньше часов на учебу"
								/>
							</div>
							<div className="main__info__row__text_description padding-left">
								<Label
									title="Мы гарантируем, что вы будете учиться более эффективно, используя наши инструменты. Мы наблюдаем высокие результаты по анатомии, а также статьи и видео, проверенные опытными работниками."
								/>
							</div>
						</div>
					</div>
					<div className="main__info__row">
						<div className="main__info__row__text">
							<div className="main__info__row__text_title ">
								<Label
									title="Узнай свой путь"
								/>
							</div>
							<div className="main__info__row__text_description padding-right">
								<Label
									title="Запоминайте анатомию в своем собственном темпе. Наша обучающая панель отслеживает ваш прогресс, поэтому вы всегда знаете, какие области вам нужно просмотреть. Анатомия человека поистине обширна, но вы никогда не заблудитесь, не зная, что изучать дальше."
								/>
							</div>
						</div>
						<div className="main__info__row_picture">
							<Picture
								src={pencil}
								alt="image"
							/>
						</div>
					</div>
				</div>
				<div className="main__recomindation">
					<div className="container">
						<div className="block__container">
							<div className="main__recomindation__title">
								<Label
									title="Наша неизменность качества"
								/>
							</div>
							<div className="main__recomindation__container">
								<div className="main__recomindation__container__item">
									<div className="main__recomindation__container__item_icon">
										<Picture
											src={microscope}
											alt="image" />
									</div>
									<div className="main__recomindation__container__item_text">
										<Label
											title="Самая качественная проверка ваших знаний "
										/>
									</div>
								</div>
								<div className="main__recomindation__container__item">
									<div className="main__recomindation__container__item_icon">
										<Picture
											src={doctor}
											alt="image" />
									</div>
									<div className="main__recomindation__container__item_text">
										<Label
											title="Проверено опытными врачами"
										/>
									</div>
								</div>
								<div className="main__recomindation__container__item">
									<div className="main__recomindation__container__item_icon">
										<Picture
											src={cup}
											alt="image" />
									</div>
									<div className="main__recomindation__container__item_text">
										<Label
											title="Основано на академической литературе и произведениях"
										/>
									</div>
								</div>
								<div className="main__recomindation__container__item">
									<div className="main__recomindation__container__item_icon">
										<Picture
											src={ribbon}
											alt="image" />
									</div>
									<div className="main__recomindation__container__item_text">
										<Label
											title="Поддержка врачей по всему миру"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="main__invitation container">
					<div className="main__invitation__title">
						<Label
							title="Переходи в каталог тестов и проверь свои знания менее чем за 60 секунд"
						/>
					</div>
					<div className="main__invitation__button">
						<IconButton
							icon={button}
							name="Каталог тестов"
							classPrefix="main__findTest__container__form_button_text"
							handleAction={() => href(ERoutes.tests)}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
