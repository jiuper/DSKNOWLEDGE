import { BoxImgItem, BoxImgItemType } from "./BoxImgItem";

import "./style.css"

interface BoxImgListType {
  classPrefix?: string;
  imgList?: BoxImgItemType[];
}

export const BoxImgList = ({ classPrefix, imgList }: BoxImgListType) => {
  return (
    <div className={`${classPrefix} boxImgList`}>
      {
        imgList?.map(item =>
          <BoxImgItem
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.alt}
          />)
      }
    </div>
  )
}
