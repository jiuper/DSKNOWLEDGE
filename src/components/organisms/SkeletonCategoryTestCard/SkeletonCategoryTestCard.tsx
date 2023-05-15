import './style.css'

export const SkeletonCategoryTestCard = () => {
	return (
		<div className="skeleton-card" >
			<div className="skeleton-card__wrapper">
				<div className="skeleton-card__img skeleton__anim"></div>
				<div className="skeleton-card__content">
					<div className="skeleton-card__title skeleton__anim"></div>
					<div className="skeleton-card__text skeleton__anim"></div>
					<div className="skeleton-card__count skeleton__anim"></div>
				</div>
			</div>
		</div>
	)
}

