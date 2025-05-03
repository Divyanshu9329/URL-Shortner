const express = require("express");
const path = require("path");
const { connectToMongoDB } = require('./connect');
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const urlRouter = require("./routes/url");

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("Connected to MongoDB"));

app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.resolve("./views")); // Set the views directory for EJS templates
 
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request body
app.use(express.json()); // Middleware to parse JSON request body

// One way of server-side rendering (SSR) is to send HTML content directly from the server
// This is a simple example of server-side rendering (SSR) using Express.js
// app.get("/test", (req, res) => {
//     return res.end("<h1> Testing SSR from server </h1>");
// }
// )


// this way of server-side rendering (SSR) is to send HTML content directly from the server
// This is a very painful way of server-side rendering (SSR) using Express.js
// and it is not recommended for production use
// because it is not scalable and maintainable
app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    })
}
)

// app.get("/about", (req, res) => {
//     return res.render("about");
// })

// thats why we use EJS template engine to render HTML content from the server
// app.set("view engine", "ejs");


app.use("/url", urlRouter); 

app.use('/', staticRoute); // Serve static files from the public directory

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    { 
        shortId 
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
);
res.redirect(entry.redirectURL);

});

app.listen(PORT , ()=> console.log(`Server is Running on port ${PORT}`));