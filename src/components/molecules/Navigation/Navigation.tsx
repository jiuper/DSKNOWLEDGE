import { ILinks } from "../../../types/type";
import { Link } from "../../atoms/Link/Link";

interface INavigation {
  links: ILinks[];
  classPrefix?: string;
}

export const Navigation = ({ classPrefix, links }: INavigation) => {
  return (
    <div className={classPrefix}>
      {links.map((el, i) => (
        <Link key={i} href={el.href} title={el.title} />
      ))}
    </div>
  );
};
