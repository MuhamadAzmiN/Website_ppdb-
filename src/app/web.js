import express from "express";
import { publicRouter } from "../router/public-api.js"
import { userRouter } from "../router/api.js";

import { errorMiddleware } from "../middleware/error-middleware.js";
import { admin } from "../router/admin.js";


export const web = express()
web.use(express.json())

web.use(publicRouter)

web.use(userRouter)

web.use(admin)

web.use(errorMiddleware)
