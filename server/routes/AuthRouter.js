import { Router } from "express";
import {
  AdminLogin,
  AdminsignUp,
  getMyUsers,
} from "../controllers/Authcontroller.js";
import {
  data,
  formData,
  postData,
  userSignUp,
  vid,
  voter,
} from "../controllers/UserController.js";
const route = Router();
route.post("/admin/signup", AdminsignUp);
route.post("/admin/login", AdminLogin);
route.post("/user/signup", userSignUp);
// route.post('/user/login',userSignIn)
route.post("/post/form", postData);
route.get("/getusers/:id", getMyUsers);
route.get("/voter", voter);
route.get("/voterdata", data);
route.get("/form/:id", formData);
export default route;
