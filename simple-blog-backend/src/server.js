import express from 'express';

const app = express();
app.use(express.json());

const articles = [
    {
        "name": "learn-react",
        "upvotes" : 0,
        "comments": []
    }, 
    {
        "name": "learn-node",
        "upvotes": 0,
        "comments": []
    },
    {
        "name": "mongoDb",
        "upvotes": 0,
        "comments": []
    },
]

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articles.find(article => article.name === name);

    if (article){
        article.upvotes += 1;
        res.send(`The article ${article.name} has now ${article.upvotes} upvotes!`);
    }
});

app.post('/api/articles/:name/comment', (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const article = articles.find(article => article.name === name);

    if(article){
        article.comments.push({postedBy, text})
        res.send(article.comments);
    } else {
        res.send('This article doesn\'t exist');
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000.');
});