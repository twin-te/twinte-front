import { addCoursesByCodes } from "./course/addCoursesByCodes";
import { addCustomizedCourse } from "./course/addCustomizedCourse";
import { checkScheduleDuplicate } from "./course/checkScheduleDuplicate";
import { dropRegisteredCourse } from "./course/dropRegisteredCourse";
import { getRegisteredCourseById } from "./course/getRegisteredCourseById";
import { getRegisteredCoursesByYear } from "./course/getRegisteredCoursesByYear";
import { searchCourse } from "./course/searchCourse";
import { updateRegisteredCourse } from "./course/updateRegisteredCourse";
import { getCurrentModule } from "./others/getCurrentModule";
import { getEventByDate } from "./others/getEventByDate";
import { getNews } from "./others/getNews";
import { sendFeedback } from "./others/sendFeedback";
import { createTag } from "./tag/createTag";
import { deleteTag } from "./tag/deleteTag";
import { getAllTags } from "./tag/getAllTags";
import { getTagById } from "./tag/getTagById";
import { updateTagName } from "./tag/updateTagName";
import { updateTagOrders } from "./tag/updateTagOrders";
import { checkAuthentication } from "./user/checkAuthentication";
import { getApplicableYear } from "./user/getApplicableYear";
import { getSetting } from "./user/getSetting";
import { updateSetting } from "./user/updateSetting";

export {
  // course
  addCoursesByCodes,
  addCustomizedCourse,
  checkScheduleDuplicate,
  dropRegisteredCourse,
  getRegisteredCourseById,
  getRegisteredCoursesByYear,
  searchCourse,
  updateRegisteredCourse,
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
  // others
  getCurrentModule,
  getEventByDate,
  getNews,
  sendFeedback,
};
