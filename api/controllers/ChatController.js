/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addConv: function(req, res) {
    var user = req.param('user');
    var message = req.param('message');
    if (req.method === 'POST') {
      Chat.create({
        user: user,
        message: message
      }, function chatCreated(err, newChat) {
        if (err) {
          return res.json({
            success: false
          })
        }
        else {
          Chat.publishCreate({
            id: newChat.id,
            user: newChat.user,
            message: newChat.message,
          });
          return res.json({
            success: true
          });
        }
      });
    } else if (req.method === 'GET') {
      Chat.watch(req.socket);
      console.log('User subscribed to ' + req.socket.id);
      return res.json({
        success: true
      });
    }
  }
};

