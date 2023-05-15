import { useEffect, useRef, useState } from "react"

import "./style.css"

interface ProgressLineType {
	min: number
	setTimer: (val: number) => void
}

export const ProgressLine = ({ min, setTimer }: ProgressLineType) => {
	const progressLine = useRef<HTMLProgressElement | null>(null)
	const [start, setStart] = useState<number>(0)
	const [fullWidth, setFullWidth] = useState<number>(0)
	const sec = min * 60

	useEffect(() => {
		const intervalID = setInterval(() => {
			if (!progressLine.current) return
			if (!progressLine.current.offsetWidth) return

			if (start >= sec) {
				clearInterval(intervalID)
			} else {
				progressLine.current.value = start
				setStart((prev) => prev + 1)
				setFullWidth(progressLine.current.offsetWidth)
			}
		}, 1000)

		setTimer(start)

		return () => clearInterval(intervalID)
	}, [sec, start])

	return (
		<div className="progress-line">
			<progress
				className="progress-line__bar"
				value={start}
				max={sec}
				ref={progressLine}
			/>
			<span
				className="progress-line__count"
				style={{
					transform: `translateX(${(start * fullWidth) / sec}px)`,
					transition: "1s",
				}}
			>
				{`${Math.floor(start / 60)}`.padStart(2, "0") +
					":" +
					`${start % 60}`.padStart(2, "0")}
			</span>
			<span className="progress-line__time">
				{
					((start * fullWidth) / sec) > (fullWidth - 100) ?
						"" :
						`${min.toString().padStart(2, "0")}:00`
				}
			</span>
		</div>
	)
}
