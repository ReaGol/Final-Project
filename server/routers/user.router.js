import express from "express";
import { createUser, deleteUser, editUser, getUser, getUsers } from "../controllers/user.controller.js";

export const router = new express.Router();

router.post("/users", createUser);

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.patch("/users/:id", editUser);

router.delete("/users/:id", deleteUser);
