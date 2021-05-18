const express = require('express') // 
const shortid = require('shortid')

const server = express(); // 
server.use(express.json())

const PORT = 5000

let channels = []
let lessons = []

// to do an update, you need both req.body and req.params

server.get('/', (req, res) => {
    res.json({kaiman: 'gyoza'})
})

server.get('/f', (req, res) => {
    res.json({archer: 'shirou'})
})

server.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons)
})

server.post('/api/lessons', (req, res) => {
    const lessonInfo = req.body;
    lessonInfo.id = shortid.generate()
    lessons.push(lessonInfo)
    res.status(201).json(lessonInfo)
})

server.get('/api/lessons/:id', (req, res) => {
    const {id} = req.params
    // find returns the JSON
    const found = lessons.find(lesson => lesson.id === id)
    if(found){
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "Lesson you are looking for does not exist"})
    }
})

// this is more dangerous than patch because you can potentially delete something important
server.put('/api/lessons/:id', (req, res) => {
    const { id } = req.params; // used as a getter
    const changes = req.body; // used as a setter

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // findIndex returns the index position
    const index = lessons.findIndex(lesson => lesson.id === id)

    if(index !== -1 ){
        // put makes a complete change of the req.body (include all fields)
        lessons[index] = changes
        res.status(200).json(index)
    } else {
        res.status(404).json({message: "Lesson you are looking for does not exist"})
    }
})

server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params; // used as a getter
    const changes = req.body; // used as a setter

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // findIndex returns the index position
    const found = lessons.find(lesson => lesson.id === id)
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    if(found){
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "Lesson you are looking for does not exist"})
    }
})

server.delete('/api/lessons/:id', (req, res) => {
    const {id} = req.params
    const deleted = lessons.find(lesson => lesson.id === id)
    if (deleted) {
        console.log(deleted)
        lessons = lessons.filter(lesson => lesson.id !== id) // channels array equals itself then perform filter on it
        res.status(200).json(deleted)
    } else{
        res.status(404).json({message: "Lesson you are looking for does not exist"})
    }
})


server.get('/api/channels', (req, res) => {
    res.status(200).json(channels)
})

// we can attach the information we want to post on the 'req'
server.post('/api/channels', (req, res) => {
    const channelInfo = req.body; // in this body we can create a JSON where we put info in Insomnia that we can send up
    channelInfo.id = shortid.generate()
    channels.push(channelInfo) // channels gets filled with data set of channelInfo
    res.status(201).json(channelInfo)
})

server.put('/api/channels/:id', (req, res) => {
    const { id } = req.params; // used as a getter
    const changes = req.body; // used as a setter

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // findIndex returns the index position
    const index = channels.findIndex(channel => channel.id === id)

    if(index !== -1 ){
        // put makes a complete change of the req.body (include all fields)
        channels[index] = changes
        res.status(200).json(index)
    } else {
        res.status(404).json({message: "Channels you are looking for does not exist"})
    }
})

server.patch('/api/channels/:id', (req, res) => {
    const { id } = req.params; // used as a getter
    const changes = req.body; // used as a setter

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // findIndex returns the index position
    const found = channels.find(channel => channel.id === id)
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    if(found){
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "Channel you are looking for does not exist"})
    }
})

server.delete('/api/channels/:id', (req, res) => {
    const {id} = req.params // we deconstruct the id here
    // console.log(id)
    const deleted = channels.find(channel => channel.id === id)
    if (deleted) {
        console.log(deleted)
        channels = channels.filter(channel => channel.id !== id) // channels array equals itself then perform filter on it
        res.status(200).json(deleted)
    } else{
        // console.log(deleted)
        res.status(404).json({message: "Channel you are looking for does not exist"})
    }
})

server.get('/api/channels/:id', (req, res) => {
    const {id} = req.params
    const found = channels.find(channel => channel.id === id)
    if(found){
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "Channel you are looking for does not exist"})
    }
})

server.listen(PORT, () => {
    console.log(`dog ${PORT}`)
})
