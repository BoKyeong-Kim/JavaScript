window.addEventListener("load", function(event) {
    "use strict";

    var keyDownUp = function(event) {

        controller.keyDownUp(event.type, event.keyCode);

    };

    var resize = function(event) {

        display.resize(document.documentElement.clientWidth - 32 
                    , document.documentElement.clientHeight - 32 
                    , game.world.height / game.world.width);
        display.render();
    };

    var render = function() {
        //console.log("render");
        display.fill(game.world.background_color);
        //display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        
        var map_img = new Image();
        map_img.src = "resource/map.png"
        //let map_frame = game.world.tile_set.frames[1];
        //display.drawObject(map_img, map_frame.x, map_frame.y, 15, 15, 0, 0, 15, 15);

        display.drawMap(map_img, 8, game.world.map, 16);
        //console.log(game.world.map)
        
        var char_img = new Image();
        char_img.src = "resource/img_sara.png";
        let frame = game.world.character_set.frames[game.world.player.frame_value];
        display.drawObject(char_img, frame.x, frame.y, 16, 18, game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height);
        

        display.render();
    
    };

    var update = function() {

        if (controller.left.active) {
            game.world.player.moveLeft();
        }
        if (controller.right.active) {
            game.world.player.moveRight();
        }
        if (controller.up.active) {
            game.world.player.jump();
            controller.up.active = false;
        }

        game.update();
    };

    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000/30, render, update);
    
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
  
    resize();
    engine.start();

});