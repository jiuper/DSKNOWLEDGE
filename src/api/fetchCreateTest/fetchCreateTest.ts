import { IFullTest } from "../../types/type"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchCreateTest = async (test: IFullTest) => {
	const response = await axiosBase.post(
		EQuerys.CreateNewTest,
		{
			name: test.name,
			description: test.description,
			imageUrl:
				test.imageUrl === ""
					? "https://avatars.mds.yandex.net/i?id=ec9198794d4b680715e90e5bbb5818ff6d1632c0-9065879-images-thumbs&n=13"
					: test.imageUrl,
			testLevel: test.testLevel,
			isTestOnTime: test.isTestOnTime,
			isRandomQuestions: test.isRandomQuestions,
			minThreshold: test.minThreshold,
			isRandomAnswers: test.isRandomAnswers,
			timeForTest: test.isTestOnTime ? test.timeForTest : 0,
			score: test.score,
			categoryId: test.categoryId,
			questions: test.questions,
		},
		{}
	)
	return response.status
}
