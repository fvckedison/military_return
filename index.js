var linebot = require('linebot');

var bot = linebot({
  channelId: '1656828545',
  channelSecret: 'd3729fab1a39345828dd300e95f2f2d4',
  channelAccessToken: '6AcSOYuoJpyOoD7W3c5DxMTR8qmA69lveDOiJlvqghgSrO3X4uz7y/+h+YpFkWbcJt/gg2LDzG9tJtBwlZow6Inyc+nIDT1768GdV7MAXkMeOLdPLw3DdPuJic3uU18BZPYvt6wAjyt7btFOl61QygdB04t89/1O/w1cDnyilFU=',

});
bot.listen('/', 80, function () {
  console.log('[BOT已準備就緒]');
});
bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    // success
    console.log(data)
  }).catch(function (error) {
    console.log(error)

    // error
  });
});
