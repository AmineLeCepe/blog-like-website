import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
let storedPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogPosts: storedPosts,
    });
});

app.post("/submit", (req, res) => { // Post upload feature

    console.log(req.body);
    storedPosts.push(req.body);
    console.log("Previous post has been pushed to the database.")
    res.render("index.ejs", {
        blogPosts: storedPosts,
    });
});

app.post("/delete", (req, res) => { // Post deletion feature
    console.log(req.body);
    for(var i=0; i<storedPosts.length; i++) {
        if (storedPosts[i].id === req.body.id) {
            storedPosts.splice(i, 1);
        }
    }
    console.log(`Post ${req.body['id']} has been deleted from the database.`)
    res.render("index.ejs", {
        blogPosts: storedPosts,
    });
})

app.listen(port, () => {
    console.log("Server started on port " + port);
});








