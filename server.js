const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const post = process.env.PORT || 3000
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log =`${now} : ${req.method} ${req.url}`;
  fs.appendFile('node.log',log+'\n',(err)=>{
    if(err){
      console.log('Conn\'t append log to node.log');
    }
  });
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year',() =>{
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.send('hello node express first result');
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{});
});

app.get('/*',(req, res)=>{
  res.send({
    errorMasage:'404 Not found'
  });
});

app.listen(post);
