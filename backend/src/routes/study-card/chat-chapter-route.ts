import { Router } from "express";
const route = Router();

import {
  createMessage,
  getChatMessage,
  clearChatMessage,
} from "../../controllers/study-card/chat-chapter/chat-chapter-controller.js";

route.get("/get/chat/:chapter_id", getChatMessage);
route.post("/chat/send/:chapter_id", createMessage);
route.delete("/chat/clear/:chapter_id", clearChatMessage);

export default route;
