import "./style.css"
import { Link } from "../../atoms/Link/Link"
import { ProgressCircle } from "../../atoms/ProgressCircle/ProgressCircle";

interface IProfileTableBody {
	date: string;
	nameCatalog: string;
	nameTest: string;
	progress: number;
	status: string;
	replace: string;
	href: string;

}

export const ProfileCardPassingTestsBody = ({
																	 date,
																	 nameCatalog,
																	 nameTest,
																	 progress,
																	 status,
																	 replace,
																	 href
																 }: IProfileTableBody) => {

	return (
		<div className='profile__content-body'>
				<span className="header__item-80"> {date}</span>
				<div className="header__item-190 fd-column">
					<span >{nameCatalog}</span>
					<span style={{color: '#79747E'}}>{nameTest}</span>
				</div>

				<div className="header__item-80">
					<ProgressCircle progress={progress}/>
				</div>
				<span className={`header__item-80 test__state ${(status === "просрочен") || (status === "пересдача") ? "red__error" : ""}`}>
					{status}
				</span>
				<Link classPrefix="header__item-80 line__link" href={href}>{replace}</Link>
		</div>
	)
}
