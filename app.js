const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const checkinRouter = require("./routes/checkin");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.disable("etag");

// 定义自定义中间件函数
const jsonResponseMiddleware = (req, res, next) => {
  // 为 res 对象添加一个新的方法，用于统一返回 JSON 格式的响应
  res.jsonResponse = function (data, code = 200) {
    // 构造响应对象
    const response = {
      data: data,
      code: code,
    };

    // 发送 JSON 格式的响应
    res.json(response);
  };

  // 继续处理下一个中间件或路由处理函数
  next();
};

app.use(jsonResponseMiddleware);

app.use("/checkin", checkinRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
