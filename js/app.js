// Enemies Array.
var allEnemies = [];

// Gems Array.


// Pause the game by default to prevent the player moving around
// when arrow keys are pressed. Set to false when the start or
// game over screens are hidden from view


var constants = {
    // Default canvas text font family
        FONT : '20pt ArcadeClassic',
        // Default canvas text font color
        FONT_COLOR: 'white',
        // Game element height
        ENTITY_HEIGHT : 50,
        // Game element width
        ENTITY_WIDTH : 50,
        // Enemy minimum speed
        MIN_SPEED : 50,
        // Enemy max speed
        MAX_SPEED : 400,
        // Player's start x-position on the canvas
        PLAYER_START_X : 300,
        // Player's start y-position on the canvas
        PLAYER_START_Y : 470,
        // Player movement distance
        PLAYER_MOVEMENT : 50,
        // X position array for game elements 
        POSITION_X : [0, 100, 200, 300, 400, 500, 600],
        // Y position array for game elements
        POSITION_Y : [160, 230, 310, 390],
        // Left canvas boundary
        LEFT_BOUNDARY : 0,
        // Top canvas boundary
        TOP_BOUNDARY : 20,
        // Right canvas boundary
        RIGHT_BOUNDARY : 600,
        // Bottom canvas boundary
        BOTTOM_BOUNDARY : 470
}

function setRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 这是我们的玩家要躲避的敌人 
var Enemy = function(positionY, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = setRandomInt(-1000, -100);
    this.y = positionY;
    this.height = constants.ENTITY_HEIGHT;
    this.width = constants.ENTITY_WIDTH;
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed * dt;

    if(this.x > canvas.width) {
        this.x = setRandomInt(-2000, -100);
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemies = function() {
    this.enemiesArray = [];
};

Enemies.prototype.spawn = function(number) {
    for(var i = 0; i < number; i++) {
        var speed = setRandomInt(constants.MIN_SPEED, constants.MAX_SPEED);
        var position = setRandomInt(0, 3);
        this.enemiesArray[allEnemies.length] = new Enemy(constants.POSITION_Y[position], speed);
        allEnemies.push(this.enemiesArray[allEnemies.length]);
    }
};

Enemies.prototype.reset = function() {
    var enemyCount = allEnemies.length;
    for(i = 0; i < enemyCount; i++) {
        allEnemies.splice(i, allEnemies.length);
    }
    // console.log(allEnemies);
};

var enemies = new Enemies();

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {


    this.sprite = 'images/char-boy.png';
    this.x = constants.PLAYER_START_X;
    this.y = constants.PLAYER_START_Y;
    this.height = constants.ENTITY_HEIGHT;
    this.width = constants.ENTITY_WIDTH;
    this.live = 3;
};

Player.prototype.update = function(dt) {
    this.xNow = this.x;
    this.yNow = this.y;

};

Player.prototype.reset = function() {
    this.x = constants.PLAYER_START_X;
    this.y = constants.PLAYER_START_Y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    continue;
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(!pasued) {
     player.handleInput(allowedKeys[e.keyCode]);
  }
});
