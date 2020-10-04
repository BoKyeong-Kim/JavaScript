const Display = function (canvas) {
  (this.buffer = document.createElement("canvas").getContext("2d")),
    (this.context = canvas.getContext("2d"));

  this.fill = function (color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  };

  this.drawMap = function (img, img_col, map_list, tile_size) {
    //console.log(map_list)
    let rows = map_list.length;
    let cols = map_list[0].length;
    //console.log(rows, cols)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let value = map_list[i][j];

        if (value === -1) {
          continue;
        }

        let source_x = (value % img_col) * 16;
        let source_y = Math.floor(value / img_col) * 16;

        let destination_x = j * tile_size;
        let destination_y = i * tile_size;

        this.buffer.drawImage(
          img,
          source_x,
          source_y,
          16,
          16,
          destination_x,
          destination_y,
          tile_size,
          tile_size
        );
      }
    }
  };

  this.drawObject = function (
    image,
    source_x,
    source_y,
    source_w,
    source_h,
    destination_x,
    destination_y,
    width,
    height
  ) {
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      source_w,
      source_h,
      Math.round(destination_x),
      Math.round(destination_y),
      width,
      height
    );
  };

  this.resize = function (width, height, height_width_ratio) {
    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }

    this.render = function () {
      this.context.drawImage(
        this.buffer.canvas,
        0,
        0,
        this.buffer.canvas.width,
        this.buffer.canvas.height,
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );
    };

    this.context.imageSmoothingEnabled = false;
  };
};

Display.prototype = {
  constructor: Display,
};
