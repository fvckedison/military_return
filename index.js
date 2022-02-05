const line = require('@line/bot-sdk');
var express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ returnMessage: [] })
  .write();
const config = {
  channelAccessToken: '6AcSOYuoJpyOoD7W3c5DxMTR8qmA69lveDOiJlvqghgSrO3X4uz7y/+h+YpFkWbcJt/gg2LDzG9tJtBwlZow6Inyc+nIDT1768GdV7MAXkMeOLdPLw3DdPuJic3uU18BZPYvt6wAjyt7btFOl61QygdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd3729fab1a39345828dd300e95f2f2d4'
};
const client = new line.Client(config);

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
// event handler
function handleEvent(event) {
  let echo = null
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else {
    if (event.message.text == '開始回報') {
      echo = { type: 'text', text: '請各位弟兄現在開始回報\n請複製以下格式\n\n12001 陳威助\n在哪：家\n做什麼：玩手機\n有無飲酒：無\n2200後是否在家不出門：是\n' }
      return client.replyMessage(event.replyToken, echo);
    } else if (event.message.text == '查詢詳情') {
      let result = db.get('returnMessage').orderBy('id:', 'asc').value()
      let signNumber = ''
      let signList = ''
      result.forEach(element => {
        signList += `${element.message}\n\n`;
        signNumber += `${element.id} `
      });
      if(db.get('returnMessage').value().length!=0){
        echo = { type: 'text', text: `${signList}已完成回報名單:\n${signNumber}` }
        return client.replyMessage(event.replyToken, echo);
      }else{
        echo = { type: 'text', text: '尚未有人回報' }
        return client.replyMessage(event.replyToken, echo);
      }
      
      
    } else if (parseInt(event.message.text.substr(0, 5), 10) != NaN && parseInt(event.message.text.substr(0, 5), 10) > 10000&& parseInt(event.message.text.substr(0, 5), 10) < 99999) {
      let id = parseInt(event.message.text.substr(0, 5), 10)
      let result = db.get('returnMessage')
        .find({ id: id })
        .value()
      if (result != undefined) {
        db.get('users')
          .find({ id: id })
          .assign({ message: event.message.text })
          .write();
      } else {
        db.get('returnMessage')
          .push({ message: event.message.text })
          .last()
          .assign({ id: id })
          .write();
      }
    }
    else if (event.message.text.substr(0, 2) == '刪除') {
      let id =parseInt(event.message.text.substr(2, 5), 10)
      db.get('returnMessage')
        .remove({ id: id })
        .write();
    }
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});