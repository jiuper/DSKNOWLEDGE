import { ILinks } from "../../../types/type"
import { Link } from "../Link/Link"

import "./style.css";

export interface LinkType {
	href: string;
	title: string;
}

export interface IBreadCrumbs {
	paths: LinkType[] | ILinks[];
	classPrefix?:string
}

export const BreadCrumbs = ({ paths, classPrefix }: IBreadCrumbs) => (
	<div className={`breadcrumbs ${classPrefix}`}>
		{
			paths.map((el, i) =>
				(i !== paths.length - 1)
					? <div key={i} className='breadcrumbs__box'>
						<Link classPrefix='breadcrumbs__link' href={el.href}>{el.title}</Link>
						<span className='breadcrumbs__separator'>/</span>
					</div>
					: <Link
						classPrefix='breadcrumbs__link'
						key={i}
						href={el.href}>
						{el.title}
					</Link>
			)
		}
	</div>
)
