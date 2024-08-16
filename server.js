const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsSetup");
const sliderRouter = require("./routes/slider.route");
const { successResponse } = require("./services/responseHandler");
const errorHandler = require("./middlewares/errorHandler");
const { connectDB } = require("./config/db");
const advisorRouter = require("./routes/advisors.route");
const programRouter = require("./routes/program.route");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const ecRouter = require("./routes/ec.route");
const devConsole = require("./helper/devConsole");
const subscriberRouter = require("./routes/subscriber.route");
const imagesRouter = require("./routes/images.route");

// dotenv  config
dotenv.config();

// port
const PORT = process.env.SERVER_PORT || 8000;

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// cors setup
app.use(cors(corsOptions));

// morgan setup
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// static files
app.use("/public", express.static("./public"));

// routes
app.use("/api/v1/subscribers", subscriberRouter);
app.use("/api/v1/advisors", advisorRouter);
app.use("/api/v1/programs", programRouter);
// app.use("/api/v1/sliders", sliderRouter);
app.use("/api/v1/posts", postRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ec", ecRouter);
app.use("/api/v1/images", imagesRouter);

// org
// app.use("/api/v1/org-members", orgRouter);

// invalid route handler
app.get("/", (req, res) => {
  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to the KIN API",
  });
});

// invalid route handler
app.use((req, res, next) => {
  next(createError(404, "Couldn't find this route."));
});

// error handler
app.use(errorHandler); // error handler

// server listen
app.listen(PORT, () => {
  connectDB();
  devConsole(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection error handler
process.on("unhandledRejection", async (error, promise) => {
  devConsole(error.name);
});
