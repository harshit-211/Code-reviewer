const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

const signupRoute = require("../routes/signup");
const signinRoute = require("../routes/signin");
const responseRoute = require("../routes/aiResponse");
const saveConversationRoute = require("../routes/saveConversation");
const allConversationRoute = require("../routes/getConversation");

app.use(express.json());
app.use(cors());
app.use('/', signupRoute);
app.use('/', signinRoute);
app.use('/', responseRoute);
app.use('/', saveConversationRoute);
app.use('/', allConversationRoute);

mongoose.connect("your mongodb url", { dbName : "Code-Reviewer"});

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});