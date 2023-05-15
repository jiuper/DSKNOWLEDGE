import { G2, Pie } from "@ant-design/plots"
import { ResultModalType } from "../../molecules/resultModal/ResultModal"

interface IDunat {
	score: number
	data: {
		type: string
		value: number
	}[]
}
export const DemoPie = ({ score, data }: IDunat) => {
	const G = G2.getEngine("canvas")

	const config = {
		appendPadding: 10,
		data,
		angleField: "value",
		legend: false as any,
		colorField: "type",
		color: ["#16A25E", "#BCBCBC", "#FF8B5B", "#DC362E"],
		radius: 0.8,
		innerRadius: 0.75,
		label: {
			formatter: (data: any) => {
				const group = new G.Group({})
				group.addShape({
					type: "text",
					attrs: {
						x: 0,
						y: 25,
						text: `${data.type}: ${Math.sqrt(data.value)}`,
						fill: "rgba(0, 0, 0, 0.65)",
						fontWeight: 700,
					},
				})
				return group
			},
			type: "spider",
			offset: 30,
			labelHeight: 28,
			style: {
				fontSize: 12,
				fontFamily: "Inter , sans-serif",
			},
		},
		tooltip: false as any,
		statistic: {
			title: {
				content: `${score} `,
				style: {
					textAlign: "center",
					whiteSpace: "pre-wrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontWeight: 700,
					fontSize: 60,
					textBaseline: "middle",
					lineHeight: 1,
				} as any,
			},
			content: {
				style: {
					fontSize: 16,
					fontWeight: 400,
					textAlign: "center",
					textBaseline: "bottom",
					lineHeight: 5,
				} as any,
				content: "баллов",
			},
		},
	}
	return <Pie {...config} />
}
