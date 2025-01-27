const express = require('express');
const path = require('path');
const app = express();

// 設定靜態檔案目錄
app.use(express.static(path.join(__dirname, 'dist')));

//處理所有路由，並返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT || 2887;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});