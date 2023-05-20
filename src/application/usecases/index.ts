import { addCoursesByCodes } from "./course/addCoursesByCodes";
import { addCustomizedCourse } from "./course/addCustomizedCourse";
import { checkScheduleDuplicate } from "./course/checkScheduleDuplicate";
import { dropRegisteredCourse } from "./course/dropRegisteredCourse";
import { getCourses } from "./course/getCourses";
import { getRegisteredCourseById } from "./course/getRegisteredCourseById";
import { getRegisteredCoursesByYear } from "./course/getRegisteredCoursesByYear";
import { searchCourse } from "./course/searchCourse";
import { updateRegisteredCourse } from "./course/updateRegisteredCourse";
import { getEventByDate } from "./event/getEventByDate";
import { sendFeedback } from "./feedback/sendFeedback";
import { getCurrentModule } from "./module/getCurrentModule";
import { getNews } from "./news/getNews";
import { updateNewsRead } from "./news/updateNewsRead";
import { createTag } from "./tag/createTag";
import { deleteTag } from "./tag/deleteTag";
import { getAllTags } from "./tag/getAllTags";
import { getTagById } from "./tag/getTagById";
import { updateTagName } from "./tag/updateTagName";
import { updateTagOrders } from "./tag/updateTagOrders";
import { checkAuthentication } from "./user/checkAuthentication";
import { deleteUser } from "./user/deleteUser";
import { getApplicableYear } from "./user/getApplicableYear";
import { getSetting } from "./user/getSetting";
import { updateSetting } from "./user/updateSetting";

export default {
  // course
  addCoursesByCodes,
  addCustomizedCourse,
  checkScheduleDuplicate,
  dropRegisteredCourse,
  getCourses,
  getRegisteredCourseById,
  getRegisteredCoursesByYear,
  searchCourse,
  updateRegisteredCourse,
  // event
  getEventByDate,
  // feedback
  sendFeedback,
  // module
  getCurrentModule,
  // news
  getNews,
  updateNewsRead,
  // tag
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTagName,
  updateTagOrders,
  // user
  checkAuthentication,
  getApplicableYear,
  getSetting,
  updateSetting,
  deleteUser,
};
