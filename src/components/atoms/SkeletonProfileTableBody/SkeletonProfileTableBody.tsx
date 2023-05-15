import "./style.css"

export const SkeletonProfileTableBody = () => {
    return (
        <div className="skeleton__test-item">
            <span className="skeleton__date skeleton__anim"></span>
            <div className="skeleton__test skeleton__anim"></div>
            <div className="skeleton__time skeleton__anim"></div>
            <div className="skeleton__count skeleton__anim"></div>
            <div className="skeleton__circle">
                <div className="skeleton__anim"></div>
            </div>
            <div className="skeleton__state skeleton__anim"></div>
            <div className="skeleton__link skeleton__anim"></div>
        </div>
    )
}
