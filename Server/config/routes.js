var home = require('../controllers/home.js');
var path = require('path');

module.exports = function(app){

	app.get('/api', function(req, res) {
        home.get(req,res);
    });
    app.get('/api/:id', function(req, res) {
        home.getone(req,res);
    });
    app.get('/api/:id/like', function(req, res) {
        home.like(req,res);
    });
    app.post('/api', function(req, res) {
        home.create(req,res);
    });
    app.patch('/api/:id', function(req, res) {
        home.update(req,res);
    });
    app.delete('/api/:id', function(req, res) {
        home.delete(req,res);
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
      });
}
