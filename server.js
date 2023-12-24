const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); // Загрузка переменных окружения из .env файла

const PORT = process.env.PORT || 3000;
const BACK_IP = process.env.BACK_IP;

// Маршрут для отдачи клиентского JavaScript файла
app.get('/src/components/index.js', (req, res) => {
  // Чтение содержимого файла и подстановка переменных
  console.log("AAAAAA")
  const fs = require('fs');
  // const path = require('path');
  const filePath = path.join(__dirname, 'src', 'components', 'index.js');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Подстановка переменных
    const modifiedData = data.replace(/{{BACK_IP}}/g, BACK_IP);
    // console.log('Modified JavaScript file:', modifiedData);

    // Отправка модифицированного JavaScript файла
    res.type('application/javascript');
    res.send(modifiedData);
  });
});


app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname, 'src', 'components')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} and ${BACK_IP}`);
});
