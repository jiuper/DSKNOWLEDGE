import imgDef from "../../../assets/images/library-image.png"

import "./style.css"

interface BackgroundIconType {
    classPrefix?: string;
    src: string | undefined;
    alt: string | undefined;
}

export const BackgroundIcon = ({ classPrefix, src, alt }: BackgroundIconType) => {
    return (
        <img
            className={`${classPrefix} backgroundIcon`}
            src={src !== undefined ? src : imgDef}
            alt={alt}
            style={{
                opacity: src ? "0.4" : "1", 
            }}
        />
    )
}
