const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

var data         = require('./data.json');

var newData      = function(todoItemId, name, priority, completed) {
    this.todoItemId = todoItemId;
    this.name = name;
    this.priority = priority;
    this.completed = completed;
}

const app        = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// add your code here

app.get( '/', function( req, res ) {
    res.send( { status: res.statusCode } );
});

app.get( '/api/TodoItems', function( req, res ) { 
    res.send( data );
});

app.get( '/api/TodoItems/:number', function( req, res ) {
    var index = req.params.number;
    var value;
    data.forEach( function( datum ) {
        if ( datum.todoItemId == index ) {
            value = datum;
        }
    });
    res.send( value );
});

app.post( '/api/TodoItems/', function( req, res ) {
    var newItem = req.body;
    var replaced = false;
    data.forEach( function( datum ) {
        if ( datum.todoItemId == newItem.todoItemId ) {
            datum = newItem;
            replaced = true;
        }
    });
    if ( !replaced ) data.push( newItem );
    res.status( 201 ).send( newItem );
});

app.delete( '/api/TodoItems/:number', function( req, res ) {
    var index = req.params.number;
    var value;
    var dataI;
    data.forEach( function( datum ) {
        if ( datum.todoItemId == index ) {
            value = datum;
            dataI = data.indexOf(value);
        }
    });
    data.splice(dataI, 1);
    res.send( value );
});

module.exports = app;
