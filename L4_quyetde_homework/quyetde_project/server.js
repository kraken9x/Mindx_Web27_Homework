
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
})

app.get('/ask', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/ask.html'));
})

app.post('/create-question', (req, res) => {
 
  const newQuestion = {
    content : req.body.questionContent,
    like : 0,
    dislike : 0,
    id: new Date().getTime()
  };

  fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
    if (error) {
      res.status(500).json({
        sucess: false,
        message: error.message
      })
    }else{
      const questionsArr = JSON.parse(data);
      questionsArr.push(newQuestion);

      fs.writeFile('./data.json', JSON.stringify(questionsArr), (err) => {
        if (err) {
          res.status(500).json({
            sucess: false,
            message: error.message
          })
        }else{
          res.status(201).json({
            sucess: true,
            data: newQuestion
          })
        }
      });
    }

  })
})

app.get('/questions/:questionId', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/question-detail.html'));
})

app.get('/get-question-by-id', (req, res) => {
  const questionId = req.query.questionId;
  let questionContent = undefined;
  fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
    if (error) {
      res.status(500).json({
        sucess: false,
        message: error.message
      })
    }else{
      const questionsArr = JSON.parse(data);
      for (let i = 0; i < questionsArr.length; i++) {
        const element = questionsArr[i];
        //console.log(element.id);
        if (element.id == questionId) {
          questionContent = element;
          //console.log(questionContent);
          res.status(201).json({
            sucess: true,
            questionContent: questionContent
          })
        }
      }
      
    }

  })
  
})
app.get('/get-random-question', (req, res) => {
  fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
    if (error) {
      res.status(500).json({
        sucess: false,
        message: error.message
      })
    }else{
      const questionsArr = JSON.parse(data);
      const randomI = Math.floor(Math.random() * questionsArr.length)
      const randomQuestion = questionsArr[randomI];

      res.status(201).json({
        sucess: true,
        message: randomQuestion
      })
    }

  })


})

app.post('/save-question-db', (req, res) => {
  const newData = req.body.questionContent.message;
  const id = req.body.questionContent.message.id;
  let index = undefined;
  fs.readFile('./data.json', {encoding: 'utf8'}, (error, data) => {
    if (error) {
      res.status(500).json({
        sucess: false,
        message: error.message
      })
    }else{
      const questionsArr = JSON.parse(data);
      for (let i = 0; i < questionsArr.length; i++) {
        const element = questionsArr[i];
        if (element.id == id) {
          questionsArr[i] = newData;  
          index = i;        
        }
        
      }
      console.log(questionsArr[index]);
      fs.writeFile('./data.json', JSON.stringify(questionsArr), (err) => {
        if (err) {
          res.status(500).json({
            sucess: false,
            message: error.message
          })
        }else{
          res.status(201).json({
            sucess: true,
            data: newData
          })
        }
      });
    }

  })
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }else{
        console.log('server listen on port 3000 ...');
    }
});