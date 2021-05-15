const express = require('express') // 
const shortid = require('shortid')

const server = express(); // 
server.use(express.json())

const PORT = 5000

const channels = []
const lessons = []

server.get('/', (req, res) => {
    res.json({kaiman: 'gyoza'})
})

server.get('/f', (req, res) => {
    res.json({archer: 'shirou'})
})

server.post('/api/channels', (req, res) => {
    const channelInfo = req.body;
    channelInfo.id = shortid.generate()
    channels.push(channelInfo)
    res.status(201).json(channelInfo)
})

server.listen(PORT, () => {
    console.log(`dog ${PORT}`)
})
