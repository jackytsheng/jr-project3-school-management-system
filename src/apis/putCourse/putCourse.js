import CampusSever from "../../utils/CampusSever";
import {Auth} from '../../utils/CampusSever/AuthenticatedAccess';


const courseUrl = "/courses";

export default (putBody) =>{
  const {courseId} = putBody;
  const AuthCampusSever = Auth(CampusSever);
  return AuthCampusSever.put(`${courseUrl}/${courseId}`, putBody);
  }
  