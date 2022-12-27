import express from "express";
import "./db/mongoose.js";
import { exerciseRouter } from "./routers/exercise.router.js";
import { router } from "./routers/user.router.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(router)
app.use(exerciseRouter)

app.listen(port, () => {
  console.log("listening on port ", + port);
});
