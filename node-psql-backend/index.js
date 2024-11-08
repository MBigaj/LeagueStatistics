const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const championModel = require('./models/championModel')
const gameModel = require('./models/gameModel')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

app.get('/champions/get/', (req, res) => {
    championModel.getChampions()
        .then(response => {
            res.status(200).send(response)
        })
})

app.get('/champions/get-one/:id', (req, res) => {
    const id = req.params.id
    championModel.getOneChampion(id)
        .then(response => {
            res.status(200).send(response)
        })
})

app.post('/champions/set-fun-factor/', (req, res) => {
    const id = req.body.id
    const funFactor = req.body.funFactor
    championModel.updateFunFactor(id, funFactor)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})

app.post('/champions/update-already-played/', (req, res) => {
    const id = req.body.id
    const alreadyPlayed = req.body.alreadyPlayed
    championModel.updateChampion(id, alreadyPlayed)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})

app.get('/champions/get-statistics/', (req, res) => {
    const filter = req.query.filter
    const order = req.query.order
    championModel.getStatisticsForChampion(filter, order)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})


app.get('/games/get/:id', (req, res) => {
    const id = req.params.id
    gameModel.getGamesForChampion(id)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})

app.post('/games/new/', (req, res) => {
    gameModel.newGame(req.body)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})