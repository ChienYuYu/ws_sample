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
      ws(handler) {
        console.log(123);
        this.socket = new WebSocket("ws://localhost:2887");

        this.socket.onopen = (event) => {
          console.log("webSocket已連接");
          // 當連接成功時，如果handler為true，則發送消息
          if (handler) {
            this.sendMsg();
          }
        };

        this.socket.onmessage = (event) => {
          console.log('收到回覆: ' + event.data);
          console.log('event==>',event);
          let res = JSON.parse(event.data)
          this.showArr1 = res.arr1.split(',');
          this.showArr2 = res.arr2;
        };

        this.socket.onclose = (event) => {
          console.log("webSocket連接已關閉");
        };
      },

      sendMsg() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(this.inputMsg);
        } else {
          console.error("webSocket未連接");
        }
      },
    },
  };
</script>

<template>
  <div class="wrapper">
    <h1 class="title">ws test</h1>
    <div class="input_wrap">
      <input type="text" v-model="inputMsg">
      <button class="send" @click="sendMsg">送出</button>
    </div>
    <div class="show_msg_wrap show_msg_wrap1">
      <p v-for="item in showArr1">{{ item }}</p>
    </div>
    <div class="show_msg_wrap show_msg_wrap2">
      <p v-for="item in showArr2">{{ item }}</p>
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
    width: 50%;
    margin: 1rem auto;
    // border: 1px solid #fa0;
    text-align: center;
  }

  .input_wrap{
    position: relative;
    width: 30%;
    // border: 1px dashed #fa0;
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
        // color: #000;
      }
    }
  }

  .show_msg_wrap{
    width: 30%;
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
  }
  
  .show_msg_wrap1{
    height: 350px;
  }
  .show_msg_wrap2{
    // width: 500px;
    height: 150px;
  }
</style>
