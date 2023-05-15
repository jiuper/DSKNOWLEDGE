import { Picture } from "../Picture/Picture";
import notice from "../../../assets/images/notification-icon.svg";

import "./style.css";

export const MenuActionNotice = () => {
    return (
        <div className="notice-bar">
            <Picture src={notice} />
        </div>
    )
}
