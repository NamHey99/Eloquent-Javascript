<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  function circle(pos, state, dispatch) {
    function drawCircle(to) {
      let radius = Math.sqrt((to.x - pos.x)**2 +
                             (to.y - pos.y)**2);
      let radiusC = Math.ceil(radius);
      let drawn = [];
      for (let dy = -radiusC; dy <= radiusC; dy++) {
        for (let dx = -radiusC; dx <= radiusC; dx++) {
          let dist = Math.sqrt(dx ** 2 + dy ** 2);
          if (dist > radius) continue;
          let y = pos.y + dy, x = pos.x + dx;
          if (y < 0 || y >= state.picture.height ||
              x < 0 || x >= state.picture.width) continue;
          drawn.push({x, y, color: state.color});
        }
      }
      dispatch({picture: state.picture.draw(drawn)});
    }
    drawCircle(pos);
    return drawCircle;
  }

  let dom = startPixelEditor({
    tools: Object.assign({}, baseTools, {circle})
  });
  document.querySelector("div").appendChild(dom);
</script>
