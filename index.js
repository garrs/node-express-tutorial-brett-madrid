const express = require('express') // 
const shortid = require('shortid')

const server = express(); // 
server.use(express.json())

const PORT = 5000

let channels = []
let lessons = []

server.get('/', (req, res) => {
    res.json({kaiman: 'gyoza'})
})

server.get('/f', (req, res) => {
    res.json({archer: 'shirou'})
})

// we can attach the information we want to post on the 'req'
server.post('/api/channels', (req, res) => {
    const channelInfo = req.body; // in this body we can create a JSON where we put info in Insomnia that we can send up
    channelInfo.id = shortid.generate()
    channels.push(channelInfo) // channels gets filled with data set of channelInfo
    res.status(201).json(channelInfo)
})

server.get('/api/channels', (req, res) => {
    res.status(200).json(channels)
})


server.post('/api/lessons', (req, res) => {
    const lessonInfo = req.body;
    lessonInfo.id = shortid.generate()
    lessons.push(lessonInfo)
    res.status(201).json(lessonInfo)
})

server.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons)
})

server.delete('/api/channels/:id', (req, res) => {
    const {id} = req.params // we deconstruct the id here
    console.log(id)
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

server.listen(PORT, () => {
    console.log(`dog ${PORT}`)
})
