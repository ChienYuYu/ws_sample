const http = require('http');
const WebSocket = require('ws');
const server = http.createServer();
const wss = new WebSocket.Server({ server });
let tempArr1 = [];
let tempArr2 = [];
let tempObj = {
  arr1:"",
  arr2:""
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

wss.on('connection', (socket) => {
  console.log('WebSocket連接已開啟');

  socket.on('message', (message) => {
    tempArr1.push(message);
    console.log(`收到消息：${message}`);
    tempObj.arr1 = tempArr1.join();
    let res = JSON.stringify(tempObj)
    socket.send(res)
  })

  socket.on('close',() => {
    console.log(`webSocket連接已關閉`);
  })

  setInterval(()=> { // 每秒產隨機值丟給前端
    let num = generateRandomNumber();
    if(tempArr2.length < 10) {
      tempArr2.push(num);
    }else {
      tempArr2.shift();
      tempArr2.push(num);
    }
    tempObj.arr2 = tempArr2.join();
    let res = JSON.stringify(tempObj)
    socket.send(res)
  },3000)
})

server.on('request',(request,response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World')
});

server.listen(2887, () => {
  console.log("伺服器已啟動 port 2887");
  
})

