import { Router } from "express";
const route = Router();

import {
  createMessage,
  getChatMessage,
  clearChatMessage,
  getQuizChapter,
  answerQuiz,
} from "../../controllers/study-card/chapter/chapter-controller.js";

route.get("/get/chat/:chapter_id", getChatMessage);
route.get("/get/quiz/:chapter_id", getQuizChapter);
route.post("/answer/quiz/:sci_id/:pq_id", answerQuiz);
route.post("/chat/send/:chapter_id", createMessage);
route.delete("/chat/clear/:chapter_id", clearChatMessage);

export default route;
