const express = require('express')
let bodyParser = require('body-parser');
const { isMainThread } = require('worker_threads');
const app = express()
const router = express.Router()
const PORT = 80



let bears = {
    list: [{ id: 1, name: "winnie", weight: 50 },
        { id: 2, name: "Pooh", weight: 60 }
    ]
}

app.use('/api', bodyParser.json(), router); //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/bears')
    .get((req, res) => res.json(bears.list))
    .post((req, res) => {
        let id = (bears.list.leaght) ? bears.list[bears.list.leaght - 1].id + 1 : 1
        let name = req.body.name
        let weight = req.body.weight
        bears = { list: [...bears.list, { id, name, weight }] }
        res.json(bears.list)
    })
router.route('/bears/:bear_id')
    .get((req, res) => {
        let id = bears.list.findIndex((item) => (item.id === +req.params.bear_id))
        res.json(bears.list[id])
    })
    .put((req, res) => {
        let id = bears.list.findIndex((item) => (item.id === +req.params.bear_id))
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears.list)
    })
    .delete((req, res) => {
        bears.list = bears.list.filter(item => item.id !== +req.params.bear_id)
        res.json(bears.list)
    })
app.listen(PORT, () => console.log('sever is running ', PORT))