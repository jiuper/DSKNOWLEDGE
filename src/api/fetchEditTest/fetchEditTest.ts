import { IFullTest } from "../../types/type"
import { EQuerys } from "../../constants/paths"
import { axiosBase } from "../../constants/baseAxios"

export const fetchEditTest = async (test: IFullTest) => {
	const response = await axiosBase.post(
		EQuerys.EditTest,
		{
			id: test.id,
			name: test.name,
			description: test.description,
			imageUrl:
				test.imageUrl === ""
					? "https://korzik.net/uploads/posts/2011-04/1302509289_1302382236_18.jpg"
					: test.imageUrl,
			testLevel: test.testLevel,
			minThreshold: test.minThreshold,
			isTestOnTime: test.isTestOnTime,
			isRandomQuestions: test.isRandomQuestions,
			isRandomAnswers: test.isRandomAnswers,
			timeForTest: test.isTestOnTime ? test.timeForTest : 0,
			score: Math.floor(test.score),
			categoryId: test.categoryId,
			questions: test.questions,
		},
		{}
	)
	return response.status
}
