var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('moethod-overrid');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);     // 커넥트하려면 환경변수 필요함
var db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(){
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extende:true}));
app.use(methodOverride('_method'));

//Routes
app.use('/', require('./routes/home'));

//Port setting
var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:'+port);
});