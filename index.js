// const http = require(`http`);
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.setHeader("Content-Type", "text/html");
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>")
// });

// server.listen(port, () => console.log(`App running on port: ${port}`));


// const express = require(`express`);
// const app = express();
// const port = 3000; 

// app.get(`/`, (req, res) => {
//     res.send(`Hello world`);
// })

// app.listen(port, () => console.log(`App runnign on port ${port}`));


// app.get(`/penguins`, (req, res) => {
//     //res.statusCode(204).send();
//     res.send(`Here and the penguins`);
// })


// app.get(`/penguins/:name`, (req, res) => {
//     res.send(req.query);
// })

require(`dotenv`).config();
const express = require(`express`);
const app = express();
const port = process.env.PORT;
const cors = require(`cors`);

const fruits = require(`./fruits.js`);

app.use(cors());
app.use(express.json());


app.get(`/`, (req, res) => {
    res.send(`Hello fruity`);
});

app.get(`/fruits`, (req, res) => {
    res.send(fruits);
});




app.get(`/fruits/:name`, (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if(fruit === undefined) {
        res.status(404).send("The fruit doesn't exist")
    } else{
        res.send(fruit);
    }
});

let fruitID = {}

app.post(`/fruits`, (req, res)=> {
    const fruitPost = req.body;
    const fruitDupe = fruits.find((fruit) => fruit[`name`] == fruitPost['name'])

    if(fruitDupe) {
            res.status(400).send(`This is a dupe`)
            console.log(`This is a dupe`)
    } else {
    console.log(fruitPost)
    res.status(200).send(`New fruit created`)
    fruitID['name'] = fruitPost['name']
    fruitID['id'] = Math.floor(100000000 + Math.random() * 900000000)
    console.log(fruitID)
    fruits.push(fruitID)

    }

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);
    if(fruitIndex == -1) {
        res.status(404).send("The fruit doesn't exist")
    } else {
        fruits.splice(fruitIndex, 1);
        res.sendStatus(204);
    }
})




});


app.listen(port, () => console.log(`App running on port ${port}`));




//exercise how to prevent a dupe fruit - how to create a unique id for a fruit - what are the appropriate status code - how to prevent the user from adding whatever data - delete a fruit from a list - 