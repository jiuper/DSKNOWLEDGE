import { Progress } from "antd"

import "./style.css"

interface ProgressCircleType {
    progress: number;
}

export const ProgressCircle = ({progress}: ProgressCircleType) => {
  return (
    <div className="progress-circle">
        <span className="progress-circle__point">{progress || "-"}</span>
        <Progress 
            type="circle"
            percent={progress * 10}
            width={48}
            strokeWidth={9}
            showInfo={false}
            trailColor="#E6E1E5"
		    strokeColor="#236BE2"
        />
    </div>
  )
}
