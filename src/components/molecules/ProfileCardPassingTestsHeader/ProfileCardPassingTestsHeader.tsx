import { ProfileCardPassingTestsHeaderItem } from "./ProfileCardPassingTestsHeaderItem"

export const ProfileCardPassingTestsHeader = () => {

	const titleTable = [
		{ title: "Сроки", classPrefix: 'header__item-80' },
		{ title: "Название", classPrefix: 'header__item-190' },
		{ title: "Балл", classPrefix: 'header__item-80' },
		{ title: "Статус", classPrefix: 'header__item-80' },
		{ title: "Пройти", classPrefix: 'header__item-80', isArrow: false }
	]

	return (
		<>
			{
				titleTable.map(el =>
					<ProfileCardPassingTestsHeaderItem
						key={el.title}
						title={el.title}
						isArrow={el.isArrow}
						classPrefix={el.classPrefix}
					/>)
			}
		</>
	)
}
