import './style.css'

export const SkeletonTestsCategoryCard = () => {
	return (
		<div className="skeleton-test__card">
			<div className="skeleton-test__card__wrapper">
				<div className="skeleton-test__card__img skeleton__anim"></div>
				<div className="skeleton-test__card__content">
					<div className="skeleton-test__card__title skeleton__anim"></div>
					<div className="skeleton-test__card__text skeleton__anim"></div>
				</div>
				<div className="skeleton-test__card__resume skeleton__anim"></div>
			</div>
		</div>
	)
}

