import { Link } from "../Link/Link";
import { Picture } from "../Picture/Picture";
import logotype from "../../../assets/images/Logo.svg";
import "./style.css";

export const Logo = () => (
    <div className="logo">
        <Link classPrefix="logo__link" href="/">
            <Picture classPrefix="logo__img" src={logotype} alt="Logo" />
        </Link>
    </div>
);
