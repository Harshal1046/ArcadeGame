
const modalContainer = document.querySelector(".modal");


// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

//the enemy's position
Enemy.prototype.update = function(dt) {
    // multiplies the Speed By dt parameter
    this.x += this.speed*dt;

    // Enemies Reappear Randomly with different Speed After They're Off canvas
    if(this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random()*222);
    };

    // To Check Collision between player and enemy
    if(player.x < this.x + 80 &&
       player.x + 80 > this.x &&
       player.y < this.y + 60 &&
       player.y + 60 > this.y) {

        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// To Move Player Along X and Y axis
var Player = function (x, y){
    this.x = x;
    this.y = y;

    // imaage of the player
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

// Draw the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {

    //Enables LEFT arrow key to move LEFT on the x-axis
    if(keyPress == 'left' && this.x > 0){
        this.x -= 102;
    };

    //Enables RIGHT arrow key to move RIGHT on the x-axis
    if(keyPress == 'right' && this.x < 405){
        this.x += 102;
    };

    //Enables UP arrow key to move UP on the y-axis
    if(keyPress == 'up' && this.y > 0){
        this.y -= 83;
    };

    //Enables DOWN arrow key to move DOWN on the y-axis
    if(keyPress == 'down' && this.y < 405){
        this.y += 83;
    };



    // TO Go Back to Starting Poaition After Reaches Water(End)
    if(this.y < 0){
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        },800);
        ;
        modalContainer.classList.remove("hidden");
    };
};

function initGame() {
    this.x = 202;
    this.y = 405;

    modalContainer.classList.add("hidden");
}


// Placed all enemy objects in an array called allEnemies
let allEnemies = [];

// Location of the Enemies
let EnemyLocation = [63, 147, 230];

EnemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});


// Starting Position Of The Player
let player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
