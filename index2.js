const express = require('express')
let bodyParser = require('body-parser');
const { isMainThread } = require('worker_threads');
const app = express()
const router = express.Router()
const PORT = 80



let students = {
    list: [{ id: 6135512001, name: "winnie", surname: "eiei", major: "COE", grade: 4 },
        { id: 6135512002, name: "winasd", surname: "aswd", major: "COE", grade: 2 },
        { id: 6135512145, name: "wswswsz", surname: "aswd", major: "se", grade: 3.2 },
        { id: 6135512013, name: "yuoikiz", surname: "aswiood", major: "seo", grade: 3 }
    ]
}

app.use('/api', bodyParser.json(), router); //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/students')
    .get((req, res) => res.json(students.list))
    .post((req, res) => {
        let id = req.body.id
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let grade = req.body.grade
        students = { list: [...students.list, { id, name, surname, major, grade }] }
        res.json(students.list)
    })
router.route('/students/:student_id')
    .get((req, res) => {
        let id = students.list.findIndex((item) => (item.id === +req.params.student_id))
        res.json(students.list[id])
    })
    .put((req, res) => {
        let id = students.list.findIndex((item) => (item.id === +req.params.student_id))
        students.list[id].name = req.body.name
        students.list[id].surname = req.body.surname
        students.list[id].major = req.body.major
        students.list[id].grade = req.body.grade
        res.json(students.list)
    })
    .delete((req, res) => {
        students.list = students.list.filter(item => item.id !== +req.params.student_id)
        res.json(students.list)
    })
app.listen(PORT, () => console.log('sever is running ', PORT))