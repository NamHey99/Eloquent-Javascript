<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  function drawLine(from, to, color) {
    let points = [];
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
      if (from.x > to.x) [from, to] = [to, from];
      let slope = (to.y - from.y)/(to.x - from.x);
      for (let {x, y} = from; x <= to.x; x++) {
        points.push({x, y: Math.round(y), color});
        y += slope;
      }
    } else {
      if (from.y > to.y) [from, to] = [to, from];
      let slope = (to.x - from.x)/(to.y - from.y);
      for (let {x, y} = from; y <= to.y; y++) {
        points.push({x: Math.round(x), y, color});
        x += slope;
      }
    }
    return points;
  }
  
  function draw(pos, state, dispatch) {
    function connect(newPos, state) {
      let line = drawLine(pos, newPos, state.color);
      pos = newPos;
      dispatch({picture: state.picture.draw(line)});
    }
    connect(pos, state);
    return connect;
  }

  function line(pos, state, dispatch) {
    return end => {
      let line = drawLine(pos, end, state.color);
      dispatch({picture: state.picture.draw(line)});
    };
  }

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>
