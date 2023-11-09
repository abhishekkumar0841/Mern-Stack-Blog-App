import express from "express";
import dbConnection from "./config/dbConnection.js";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes.js";
import cors from "cors";
import otherRoutes from "./routes/others.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//it help us to find/decode or parse the query-params etc from encoded url
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Home page of server",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use('/api/v1/others', otherRoutes)

app.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Error, this page does not exists!",
  });
});

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
