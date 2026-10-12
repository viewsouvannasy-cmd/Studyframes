import { Router } from "express";
const route = Router();

import {
  createStudyCard,
  checkCanCreateStudyCard,
  getListStudyCard,
  getStudyCardLesson,
  createQuizs,
  renameStudyCard,
  changeStudyCardColor,
  deleteStudyCard,
} from "../../controllers/study-card/study-card-controller.js";

// check and create  study card item
route.post("/create", createStudyCard);
route.post("/create/check", checkCanCreateStudyCard);

// get list of  study card
route.get("/get-list", getListStudyCard);

// get full detail for one study card
route.get("/get/:sci_id", getStudyCardLesson);

// rename study card
route.put("/update/rename/:sci_id", renameStudyCard);
// change color study card
route.put("/update/change-color/:sci_id", changeStudyCardColor);

// delete study card
route.delete("/delete/:sci_id", deleteStudyCard);

route.post("/create/quizs/:sci_id/:chapter_id", createQuizs);

export default route;
