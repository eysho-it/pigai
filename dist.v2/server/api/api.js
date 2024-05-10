import { App } from '@tinyhttp/app';
import { adminRouter } from './routes/admin.js';
import { chatRouter } from './routes/chat.js';
export const apiRouter = new App();
apiRouter.use("/admin", adminRouter);
apiRouter.use("/chat", chatRouter);
//# sourceMappingURL=api.js.map