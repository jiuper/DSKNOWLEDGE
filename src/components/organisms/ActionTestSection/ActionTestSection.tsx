import { Header } from "../../template/Header/Header";
import { BurgerMenu } from "../../atoms/BurgerMenu/BurgerMenu";
import { Outlet } from "react-router-dom";

import "./style.css";

const ActionTestSection = () => (
	<div className="action-section container padding-0">
		<BurgerMenu />
		<div className="action-section__wrapper">
			<Header classPrefix="action-section__header" active={true} />
			<Outlet />
		</div>
	</div>
);

export default ActionTestSection;
