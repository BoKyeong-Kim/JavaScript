const Engine = function(time_step, update, render) {
    
    this.accumulated_time = 0;
    this.animation_frame_request = undefined;
    this.time = 0;
    this.time_step = time_step;
    
    this.update = false;

    this.update = update;
    this.render = render;
    
    this.run = function(time_stamp) {
        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;
       
        if (this.accumulated_time >= this.time_step * 3) {
            this.accumulated_time = this.time_step;
        }

        while(this.accumulated_time >= this.time_step) {
            
            this.accumulated_time -= this.time_step;
            this.update(time_stamp);
            this.updated = true;
            
        }

        //console.log("updated", this.updated);
        if (this.updated) {
            //console.log("engine call render");
            this.updated = false;
            this.render(time_stamp);
        }

        this.animation_frame_request = window.requestAnimationFrame(this.handleRun) ;

    };

    this.handleRun = (time_step) => {
        this.run(time_step);
    };
};

Engine.prototype = {
    
    constructor:Engine,

    start:function() {
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

    },

    stop:function() {
        window.cancelAnimationFrame(this.animation_frame_request);
    }
}