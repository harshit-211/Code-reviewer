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

mongoose.connect("mongodb+srv://gauravrajpal:gaurav123@cluster0.1zgbogd.mongodb.net/admin?authSource=admin&replicaSet=atlas-birgew-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { dbName : "Code-Reviewer"});

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});