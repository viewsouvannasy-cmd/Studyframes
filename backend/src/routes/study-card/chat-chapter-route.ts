import { Router } from "express";
const route = Router();

import {
  createMessage,
  getChatMessage,
} from "../../controllers/study-card/chat-chapter/chat-chapter-controller.js";

route.get("/get/chat/:chapter_id", getChatMessage);
route.post("/create/chat/:chapter_id", createMessage);

export default route;
