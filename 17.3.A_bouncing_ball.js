<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>
<script src="code/_stop_keys.js"></script>
<script src="code/chapter/17_canvas.js"></script>

<canvas width="400" height="400"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");

  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  let x = 100, y = 300;
  let radius = 10;
  let speedX = 100, speedY = 60;
  
  function updateAnimation(step) {
    // Your code here.
    cx.clearRect(0, 0, 400, 400);
    cx.strokeStyle = "blue";
    cx.lineWidth = 4;
    cx.strokeRect(25, 25, 350, 350);

    x += step * speedX;
    y += step * speedY;
    if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
    if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
    cx.fillStyle = "red";
    cx.beginPath();
    cx.arc(x, y, radius, 0 , 7);
    cx.fill();
  }
</script>
