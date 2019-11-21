const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'vidtest/build')));

function sendChunk(path,req,res){
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }

    const chunksize = (end-start)+1
    console.log(chunksize)
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges' : 'bytes',
      'Content-Length': chunksize,
      'Content-Type'  : 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  }
  else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

app.get('/video1', function(req, res) {
  let path = 'assets/chunk1.mp4'
  sendChunk(path,req,res)
})

app.get('/video2', function(req, res) {
  let path = 'assets/chunk2.mp4'
  sendChunk(path,req,res)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
