import { Router } from "express";
import { getUsers, login, registerUser } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { loginSchema, registerUserSchema } from "../schemas/user.schema.js";
import { userExists, validateAddUser } from "../middlewares/users.middlewares.js";
import { authenticate } from "../middlewares/authValidate.meddleware.js";



const usersRouter = Router(); 

usersRouter.post("/signup", validateSchema(registerUserSchema), validateAddUser, registerUser);
usersRouter.post("/signin", validateSchema(loginSchema), userExists, login);
usersRouter.get("/users/me", authenticate, getUsers);

export default usersRouter;