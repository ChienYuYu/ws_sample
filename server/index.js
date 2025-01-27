const http = require('http');
const WebSocket = require('ws');
const server = http.createServer();
const wss = new WebSocket.Server({ server });
let tempArr = [];
let tempObj = {
  arr1:"",
  arr2:[]
}

wss.on('connection', (socket) => {
  console.log('WebSocket連接已開啟');

  socket.on('message', (message) => {
    tempArr.push(message);
    console.log(`收到消息：${message}`);
    tempObj.arr1 = tempArr.join();
    let res = JSON.stringify(tempObj)
    socket.send(res)
  })

  socket.on('close',() => {
    console.log(`webSocket連接已關閉`);
  })

  setInterval(()=> {
    tempObj.arr2.push('￣▽￣y')
    let res = JSON.stringify(tempObj)
    socket.send(res)
  },5000)
})

server.on('req',(request,response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World')
});

server.listen(2887, () => {
  console.log("伺服器已啟動 port 2887");
  
})

