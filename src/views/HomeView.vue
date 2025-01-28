<script>
  export default {
    created() {
      this.ws();
    },
    data() {
      return {
        socket: null, // 將socket保存到data中
        showArr1:[],
        showArr2:[],
        inputMsg: '',
      };
    },
    methods: {
      ws() {
        this.socket = new WebSocket("ws://localhost:2887");

        this.socket.onopen = (event) => {
          console.log("webSocket已連接");
          this.sendMsg();
        };

        this.socket.onmessage = (event) => {
          console.log('收到回覆: ' + event.data);
          console.log('event==>',event);
          let res = JSON.parse(event.data)
          this.showArr1 = res.arr1.split(',').reverse();
          this.showArr2 = res.arr2.split(',');
        };

        this.socket.onclose = (event) => {
          console.log("webSocket連接已關閉");
        };
      },

      sendMsg() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(this.inputMsg);
          this.inputMsg = "";
        } else {
          console.error("webSocket未連接");
        }
      },
    },
  };
</script>

<template>
  <div class="wrapper">
    <h1 class="title">ws sample</h1>
    <div class="input_wrap">
      <input type="text" v-model="inputMsg" @keyup.enter="sendMsg()">
      <button class="send" @click="sendMsg()">送出</button>
    </div>
    <div class="show_msg_wrap show_msg_wrap1">
      <h2>由前端輸入文字傳至後端儲存 再回傳顯示出來</h2>
      <p v-for="item in showArr1">{{ item }}</p>
    </div>
    <div class="show_msg_wrap show_msg_wrap2">
      <h2>由後端每3秒自動傳新值給前端顯示</h2>
       <div class="wrap">
         <p v-for="item in showArr2">{{ item }}</p>
       </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #222;
  }
  h1.title{
    color: #fa0;
    width: 90%;
    margin: 1rem auto;
    text-align: center;
  }
  
  .input_wrap{
    position: relative;
    width: 600px;
    margin: 2rem auto;

    input[type=text] {
      display: block;
      margin: 0 auto;
      width: 200px;
      height: 40px;
      font-size: 18px;
      background: #222;
      border: 1px solid #fa0;
      outline: none;
      border-radius: 10px;
      transition: .3s;
      color: #fff;
      padding: 0 .5rem;

      &:focus{
        border: 1px solid #fa0;
        width: 300px;
        background: #111;
      }
    }

    button.send{
      position: absolute;
      width: 80px;
      height: 40px;
      border-radius: 10px;
      top: 50%;
      right: 5%;
      transform: translate(0, -50%);
      border:1px solid  #fa0;
      background: transparent;
      color: #fff;
      cursor: pointer;

      &:hover{
        background: #fa0;
      }
    }
  }

  .show_msg_wrap{
    width: 600px;
    border: 1px dashed #fa0;
    margin: 0 auto 2rem;
    padding: 1rem 0;
    border-radius: 10px;
    overflow-y: auto;
    scrollbar-color: #ffaa0040 #33333380;
    scrollbar-width:thin;
    
    p{
      color: #fff;
      font-size: 2rem;
      text-align: center;
    }

    h2{
      font-size: 20px;
      color: #fa0;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
  
  .show_msg_wrap1{
    height: 350px;
  }
  
  .show_msg_wrap2{
    height: 150px;
    .wrap{
      display: flex;
      justify-content: center;
    }
    p{
      margin-right: 10px;
    }
  }
</style>
