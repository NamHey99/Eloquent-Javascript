<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>
<script src="code/_stop_keys.js"></script>
<script src="code/chapter/17_canvas.js"></script>

<canvas width="600" height="300"></canvas>
<script>
  let cx = document.querySelector("canvas").getContext("2d");
  let total = results
    .reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let centerX = 300, centerY = 150;

  // Add code to draw the slice labels in this loop.
  results.forEach(function(result) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);

    let middleAngle = currentAngle + 0.5 * sliceAngle;
    let textX = Math.cos(middleAngle) * 120 + centerX;
    let textY = Math.sin(middleAngle) * 120 + centerY;
    cx.textBaseLine("middle");
    if (Math.cos(middleAngle) > 0) {
      cx.textAlign = "left";
    } else {
      cx.textAlign = "right";
    }
    cx.font = "15px sans-serif";
    cx.fillStyle = "black";
    cx.fillText(result.name, textX, textY);
    
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
  });
</script>
