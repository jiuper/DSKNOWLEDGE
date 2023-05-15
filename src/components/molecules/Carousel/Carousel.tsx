import { ICarousel } from "../../../types/type"
import { useEffect, useState } from "react"

import "./style.css"

export const Carousel = ({ children, classPrefix, width, length, initionalValue }: ICarousel) => {

	const allWidth: number = width * length
	const [initional, setInitional] = useState<number>(0)
	const [position, setPosition] = useState(-initional)

	useEffect(() => {
		setInitional(width * initionalValue)
		setPosition(-initional)
	}, [initionalValue, initional, width])

	const handlePrev = () => {	
		position === 0 ? setPosition(-allWidth) : setPosition(position + width)
	}

	const handleNext = () => {
		position === -allWidth ? setPosition(0) : setPosition(position - width)
	}

	return (
		<div className={`carousel ${classPrefix}`}>
			<div className="carousel__window" style={{ width: width }}>
				<div className="carousel__content" style={{ transform: `translateX(${position}px)` }}>
					{children}
				</div>
			</div>
			<button className="carousel__prev carousel__button" onClick={handlePrev} />
			<button className="carousel__next carousel__button" onClick={handleNext} />
		</div>
	)
}
