import express from "express"

import adminController from "../controller/admin-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"



const admin = express.Router()
admin.use(adminMiddleware)

admin.get("/users/admin/daftar", adminController.getAllDaftar)
admin.put("/users/admin/daftar/:id", adminController.updateDaftar)
admin.delete("/users/admin/daftar/delete/:id", adminController.deleteDaftar)



export {
    admin
}