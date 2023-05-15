import { Picture } from "../Picture/Picture"
import userMale from "../../../assets/images/user-male.svg";

interface IDefaultPictureProfile{
	classPrefix?: string;
}

export const DefaultPictureProfile = ({classPrefix}:IDefaultPictureProfile) => {
	return (
		<>
			<Picture classPrefix={classPrefix} src={userMale}/>
		</>
	)
}
