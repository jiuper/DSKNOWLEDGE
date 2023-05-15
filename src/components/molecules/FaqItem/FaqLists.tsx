import { FaqItem } from "./FaqItem"
import { IFaQuestion } from "../../../types/type"

export const FaqLists = ({ faqItems }: { faqItems: IFaQuestion[] }) => {

	return (
		<>
			{
				faqItems && (
					faqItems.length === 0
						? "Нет вопрос-ответ"
						: faqItems.map(el =>
							<FaqItem
								key={el.id}
								category={el.category}
								question={el.question}
								answer={el.answer}
							/>
						)
				)
			}
		</>
	)
}