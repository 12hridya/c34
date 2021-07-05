var ball;           //box = x: 400, y:100
var ballPositionRef;
var database;
var boxPosition;


function setup(){

    //create a database inside a variable called 'database' = --> firebase.database()
   database = firebase.database()
    
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //refer to the x and y position inside the database using the ballPositionRef variable
    //x and y are inside the position and position is inside the box
    //to refer to the database --> database.ref('what field to refer)
ballPositionRef=database.ref('box/position');

//listen to the changes in the database --> reference_variable.on("value", function1, function2)
ballPositionRef.on("value", readposition)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('box/position').set({
        'x': boxPosition.x + x,
        'y': boxPosition.y + y
    })

}
function readposition(data){        //data --> listened data
boxPosition = data.val()            //.val()--> store the listened data

//match the ballPosition woth the boxPosition
ball.x = boxPosition.x;
ball.y = boxPosition.y;
}