const line = require('@line/bot-sdk');
var express = require('express');
const config = {
  channelAccessToken: '6AcSOYuoJpyOoD7W3c5DxMTR8qmA69lveDOiJlvqghgSrO3X4uz7y/+h+YpFkWbcJt/gg2LDzG9tJtBwlZow6Inyc+nIDT1768GdV7MAXkMeOLdPLw3DdPuJic3uU18BZPYvt6wAjyt7btFOl61QygdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd3729fab1a39345828dd300e95f2f2d4'
};
// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
let dataArray=['','','','','','','','','','','','','','','']
// event handler
function handleEvent(event) {
  let echo=null
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else{
    
    if(event.message.text=='開始回報'){
      dataArray=['','','','','','','','','','','','','','','']
      echo = { type: 'text', text: '請各位弟兄現在開始回報' }
      return client.replyMessage(event.replyToken, echo);
    }else if(event.message.text=='查詢詳情'){
      console.log(dataArray)
      let unSignList=''
      let signList=''
      for(let i =0;i<dataArray.length;i++){
        if(dataArray[i]==''){
          unSignList+=`${i+31}未回報\n`
        }else{
          signList+=`${dataArray[i]}\n`
        }
      }
      echo = { type: 'text', text: signList+unSignList }
      return client.replyMessage(event.replyToken, echo);
      //  echo = { type: 'text', text: dataArray }
      //  return client.replyMessage(event.replyToken, echo);
    }else{
      let id=event.message.text.substr(0,2)
      dataArray[id-31]=event.message.text
    }
  }
  // create a echoing text message
  // use reply API
  
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});