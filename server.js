const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'vidtest/build')));

function sendChunk(path,req,res){
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  }
  res.writeHead(200, head)
  fs.createReadStream(path).pipe(res)
}

app.get('/video/:chunknum', function(req, res) {
  let path = 'assets/chunk'+req.params.chunknum+'.mp4'
  sendChunk(path,req,res)
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
