import express from "express";
import { auth } from "../middleware/auth.js";
import { createUser, deleteUser, editProfile, editUser, getProfile, getUser, getUsers, LogoutAllUsers, userLogin, userLogout } from "../controllers/user.controller.js";

export const router = new express.Router();

router.post("/users/new", createUser);

router.post("/users/login", userLogin)

router.get("/users/me", auth, getProfile);

router.patch("/user/me", auth, editProfile)

router.post("/users/logout", auth, userLogout)

router.post("/users/logoutAll", auth, LogoutAllUsers)

router.get("/users", getUsers);

router.get("/users/:id", auth, getUser);

router.patch("/users/:id", auth, editUser);

router.delete("/users/:id", deleteUser);


