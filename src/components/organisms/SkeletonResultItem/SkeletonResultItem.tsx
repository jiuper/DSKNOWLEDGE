import './style.css'

export const SkeletonResultItem = () => {
  return (
    <div className="skeletonResultItem"> 
        <div className="skeletonResultItem-score"></div>
        <div className="skeletonResultItem-image"></div>
        <div className="skeletonResultItem-content"></div>
    </div>
  )
}
