import { Picture } from "../Picture/Picture"
import defaultPic from "../../../assets/images/defaultTestPicture.png";

interface IDefaultPictureTest {
    classPrefix?: string;
}

export const DefaultPictureTest = ({classPrefix}:IDefaultPictureTest) => {
  return (
    <>
    <Picture classPrefix={classPrefix} src={defaultPic} alt="no"/>
    </>
  )
}
