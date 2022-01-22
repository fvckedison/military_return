var linebot = require('linebot');
// 用於辨識Line Channel的資訊
var bot = linebot({ channelId: '1656828545', channelSecret: 'd3729fab1a39345828dd300e95f2f2d4', channelAccessToken: '6AcSOYuoJpyOoD7W3c5DxMTR8qmA69lveDOiJlvqghgSrO3X4uz7y'
});
// 當有人傳送訊息給Bot時
bot.on('message', function (event) { // event.message.text是使用者傳給bot的訊息 // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者 event.reply(event.message.text).then(function (data) { // 當訊息成功回傳後的處理 }).catch(function (error) { // 當訊息回傳失敗後的處理 });
});
// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () { console.log('[BOT已準備就緒]');
});