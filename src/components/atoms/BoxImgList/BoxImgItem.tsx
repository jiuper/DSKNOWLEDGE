
import { imageSelectAction } from "../../../store/reducers/ImageSelectReducer/ImageSelectReducer";
import { useHookDispatch } from "../../../store/reducers/redux";
import { BackgroundIcon } from "../BackgroundIcon/BackgroundIcon";

import "./style.css"

export interface BoxImgItemType {
    id: string;
    src: string | undefined;
    alt?: string | undefined;
}

export const BoxImgItem = ({ id, src, alt }: BoxImgItemType) => {

    const dispatch = useHookDispatch()

    const getItemId = (id: string) => {
        dispatch(imageSelectAction.type(id))
    }

    return (
        <div id={id} className="boxImgItem" onClick={() => getItemId(id)}>
            <BackgroundIcon classPrefix="boxImgItem__pic" src={src ? src : ''} alt={alt || "Oops"} />
        </div>
    )
}
