import React from 'react'
import { Picture } from '../Picture/Picture'
import "./style.css"


interface IPictureWithButton{
    src:string,
    children:React.ReactNode,
    classPrefix:string
}
export const PictureWithButton = ({src,children, classPrefix}:IPictureWithButton) => {
  return (
    <div className="pictureWithButton__container">
        <Picture 
        src={src}
        alt="Oops"
        classPrefix={classPrefix}
        />
        {children}
    </div>
  )
}
