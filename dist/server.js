import app from "./src/app.js";
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server is listening on port: ".concat(port));
});
