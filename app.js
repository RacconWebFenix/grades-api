import express from "express";
import bodyParser from "body-parser";
import { gradeRouter } from "./routes/gradeRouter.js";
import cors from "cors";
import { db } from "./models/index.js";

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(gradeRouter);

app.get("/", (req, res) => {
  res.send("API em execucao");
});

app.listen(process.env.PORT || 8081, () => {});
