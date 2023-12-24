const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); // Загрузка переменных окружения из .env файла

const PORT = process.env.PORT || 3000;
const SERV_IP = process.env.SERV_IP;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.use((req, res, next) => {
  const requestedPath = req.path;

  // Проверяем, начинается ли путь с /src/
  if (requestedPath.startsWith('/src/')) {
    // Продолжаем обработку запроса
    next();
  } else {
    // Отправляем 404, если путь не соответствует условию
    res.status(404).send('Not Found');
  }
});



// Маршрут для отдачи клиентского JavaScript файла
app.get('/src/components/:filename', (req, res) => {
  // Чтение содержимого файла и подстановка переменных
  console.log("js-replacement")
  const filename = req.params.filename;
  const fs = require('fs');
  // const path = require('path');
  const filePath = path.join(__dirname, 'src', 'components', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Подстановка переменных
    const modifiedData = data.replace(/{{SERV_IP}}/g, SERV_IP);
    // console.log('Modified JavaScript file:', modifiedData);

    // Отправка модифицированного JavaScript файла
    res.type('application/javascript');
    res.send(modifiedData);
  });
});


app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname, 'src', 'components')));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} and ${SERV_IP}`);
});
