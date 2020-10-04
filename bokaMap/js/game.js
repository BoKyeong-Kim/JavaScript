const Game = function () {
  this.world = new Game.World();

  this.update = function () {
    this.world.update();
  };
};

Game.prototype = { constructor: Game };

Game.World = function (friction = 0.9, gravity = 3) {
  this.background_color = "#B0E0E6";

  this.collider = new Game.Collider();

  this.friction = friction;
  this.gravity = gravity;

  this.player = new Game.Player(184,100);
  this.tile_set = new Game.TileSet(18, 15, 16, 16);
  this.character_set = new Game.TileSet(4, 9, 18, 16);
  
  this.rows = 12;
  this.columns = 24;
  this.height = this.rows * 16;
  this.width = this.columns * 16;

  this.map = [
    [81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81],
    [14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14],
    [14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14],
    [14, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14],
    [14, -1, -1, -1, -1, -1, -1, -1, 14, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, 14],
    [14, 91, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14],
    [14, 99, -1, -1, -1, -1, -1, 14, 14, 14, 14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 14],
    [14, 14, 14, -1, -1, -1, -1, 14, 64, 65, 14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 14],
    [14, 14, 14, 14, -1, -1, -1, 14, 14, 14, 14, 14, 14, -1, -1, -1, -1, -1, -1, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 14],
    [14, 14, 14, 14, 14, 14, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, 14, 14],
    [14, 14, 14, 14, 14, 14, -1, -1, -1, -1, -1, -1, -1, -1, 14, 14, 14, 14, -1, -1, -1, -1, 14, 14],
  ]

  this.collision_map = [
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [2, 0, 0, 1, 1, 5, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [2, 0, 0, 0, 0, 0, 0, 4, 7, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 3, 0, 0, 8],
    [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [15, 3, 0, 0, 0, 0, 0, 9, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8],
    [15, 0, 3, 0, 0, 0, 0, 8, 2, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
    [15, 0, 0, 3, 0, 0, 0, 15, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 5, 5, 5, 8, 0],
    [15, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 8, 0],
    [15, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 3, 0, 0,  0, 0, 8, 0],
    [15, 16, 16, 16, 16, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 8, 0],
    //[15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  ] 
};

Game.World.prototype = {
  constructor: Game.World,

  // tile_detection
  collideObject: function (object) {
    var bottom, left, right, top, value;

    if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
    else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
    if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
    else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

  
    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top][left];
    //console.log(value);
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top][right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom][left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom][right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  update: function () {
    //console.log("update",this.player.update);
    this.player.updatePosition(this.gravity, this.friction);

    this.collideObject(this.player);
    this.player.updateAnimation();
  },
};

Game.Animator = function (frame_set, delay) {
  this.count = 0;
  this.delay = delay >= 1 ? delay : 1;
  this.frame_set = frame_set;
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode = "pause";
};

Game.Animator.prototype = {
  constructor: Game.Animator,

  animate: function () {
    switch (this.mode) {
      case "loop":
        this.loop();
        break;
      case "pause":
        break;
    }
  },

  changeFrameSet: function (frame_set, mode, delay = 10, frame_index = 0) {
    //console.log(`frame set ${this.frame_set} vs ${frame_set}`)
    if (this.frame_set == frame_set) {
      return;
    }

    this.count = 0;
    this.delay = delay;
    this.frame_set = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode = mode;
  },

  loop: function () {
    this.count++;

    while (this.count > this.delay) {
      this.count -= this.delay;

      this.frame_index =
        this.frame_index < this.frame_set.length - 1 ? this.frame_index + 1 : 0;
      this.frame_value = this.frame_set[this.frame_index];
    }
  },
};


// map 충돌 방지
Game.Collider = function() {
  this.collide = function(value, object, tile_x, tile_y, tile_size) {
    //console.log(value);
    switch(value) {

      case  1:     this.collidePlatformTop    (object, tile_y            ); break;
      case  2:     this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  4:     this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight  (object, tile_x + tile_size)) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  8:     this.collidePlatformLeft   (object, tile_x            ); break;
      case  9: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 10: if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 12: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 13: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 14: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 15: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;

    }

  }

};

Game.Collider.prototype = {
  constructor: Game.Collider,
  
    collidePlatformBottom:function(object, tile_bottom) {
  
      if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
        //console.log(object.getTop(), object.getOldTop(), tile_bottom);
        console.log("top");
        console.log(object.getTop(), object.getOldTop());
        object.setTop(tile_bottom);
        object.velocity_y = 0;
        return true;
  
      } return false;
  
    },
  
    collidePlatformLeft:function(object, tile_left) {
  
      if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
        console.log("left");
        object.setRight(tile_left - 0.01);
        object.velocity_x = 0;
        return true;
  
      } return false;
  
    },
  
    collidePlatformRight:function(object, tile_right) {
  
      if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
        console.log("right");
        object.setLeft(tile_right);
        object.velocity_x = 0;
        return true;
  
      } return false;
  
    },
  
    collidePlatformTop:function(object, tile_top) {
  
      if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
        console.log("bottom");
        object.setBottom(tile_top - 0.01);
        object.velocity_y = 0;
        object.jumping    = false;
        return true;
  
      } return false;
  
    }
};

Game.Frame = function (x, y, width, height, offset_x, offset_y) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;
};

Game.Frame.prototype = {
  constructor: Game.Frame,
};

Game.Object = function(x, y, width, height) {
  
  this.height = height;
  this.width  = width;
  this.x      = x;
  this.y      = y;
 
};

Game.Object.prototype = {
  
  constructor:Game.Object,

  getBottom : function()  { return this.y + this.height - 0.01;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }

};

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {
  
  Game.Object.call(this, x, y, width, height);

  this.jumping      = false;
  this.velocity_max = velocity_max;
  this.velocity_x   = 0;
  this.velocity_y   = 0;
  this.x_old        = x;
  this.y_old        = y;

};

Game.MovingObject.prototype = {
  
  getOldBottom : function()  { return this.y_old + this.height;       },
  getOldCenterX: function()  { return this.x_old + this.width  * 0.5; },
  getOldCenterY: function()  { return this.y_old + this.height * 0.5; },
  getOldLeft   : function()  { return this.x_old;                     },
  getOldRight  : function()  { return this.x_old + this.width;        },
  getOldTop    : function()  { return this.y_old;                     },
  setOldBottom : function(y) { this.y_old = y    - this.height;       },
  setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; },
  setOldCenterY: function(y) { this.y_old = y    - this.height * 0.5; },
  setOldLeft   : function(x) { this.x_old = x;                        },
  setOldRight  : function(x) { this.x_old = x    - this.width;        },
  setOldTop    : function(y) { this.y_old = y;                        }

};

Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

Game.TileSet = function (rows, cols, row_size, col_size) {
  
  this.rows = rows;
  this.cols = cols;
  this.row_size = row_size;
  this.col_size = col_size;
  this.tile_size = 16;

  this.frames = []

  let f = Game.Frame;
  
  for(let row=0; row<rows; row++) {
    for(let col=0; col<cols; col++){
      this.frames.push(new f(col*col_size, row*row_size, col_size, row_size, 0, 0));
    }
  }
  
};

Game.Player = function (x, y) {

  Game.MovingObject.call(this, x, y, 16, 18);
  Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

  this.color = "#ff0000";
  this.jumping = true;
  this.direction_x = -1;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.frame_value = 19;
};

Game.Player.prototype = {
  constructor: Game.Player,

  frame_sets: {
    "idle-left": [27],
    "idle-right": [9],
    "move-left": [27,28,29,28],
    "move-right": [9,10,11,10],
    "jump-left":[34,33,32],
    "jump-right": [14,15,16]
  },

  jump: function () {
    if (!this.jumping) {
      this.jumping = true;
      this.velocity_y -= 16;
    }
  },

  moveLeft: function () {
    this.velocity_x -= 0.55;
    this.direction_x = -1;
  },
  moveRight: function () {
    this.velocity_x += 0.55;
    this.direction_x = 1;
  },

  update: function () {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },

  updateAnimation: function () {
    //console.log("updateAnimation");
    if (this.velocity_y < 0) {
      if (this.direction_x < 0)
        this.changeFrameSet(this.frame_sets["jump-left"], "pause");
      else this.changeFrameSet(this.frame_sets["jump-right"], "pause");
    } else if (this.direction_x < 0) {
      if (this.velocity_x < -0.1) {
        //console.log("move-left")
        this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
      }
      else this.changeFrameSet(this.frame_sets["idle-left"], "pause");
    } else if (this.direction_x > 0) {
      if (this.velocity_x > 0.1) {
        //console.log("move right");
        this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
      }
      else this.changeFrameSet(this.frame_sets["idle-right"], "pause");
    }
    this.animate();
  },

  updatePosition:function(gravity, friction) {
  
    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x    += this.velocity_x;
    this.y    += this.velocity_y;

  }
};

Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;
