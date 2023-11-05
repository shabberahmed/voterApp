import { Router } from "express";
import { AdminLogin, AdminsignUp, getMyUsers } from "../controllers/Authcontroller.js";
import { postData, userSignIn, userSignUp } from "../controllers/UserController.js";
const route=Router()
route.post('/admin/signup',AdminsignUp)
route.post('/admin/login',AdminLogin)
route.post('/user/signup',userSignUp)
// route.post('/user/login',userSignIn)
route.post('/post/form',postData)
route.get('/getusers/:id',getMyUsers)
export default route
