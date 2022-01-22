const line = require('@line/bot-sdk');
var express = require('express');
const config = {
  channelAccessToken: '6AcSOYuoJpyOoD7W3c5DxMTR8qmA69lveDOiJlvqghgSrO3X4uz7y/+h+YpFkWbcJt/gg2LDzG9tJtBwlZow6Inyc+nIDT1768GdV7MAXkMeOLdPLw3DdPuJic3uU18BZPYvt6wAjyt7btFOl61QygdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd3729fab1a39345828dd300e95f2f2d4'
};
// create LINE SDK client
const client = new line.Client(config);
// create Express app
// about Express itself: <https://expressjs.com/>
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to docgit 
app.post('/callback', line.middleware(config), (req, res) => {
	console.log(req, res)
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
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});