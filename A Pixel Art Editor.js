class PixelEditor {
	constructor(state, config) {
  	let {tools, controls, dispatch} = config;
    this.state = state;
    
    this.canvas = new PictureCanvas(state.picture, pos => {
    	let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);
      if (onMove) return pos => onMove(pos, this.state);
      
    });
    this.controls = controls.map(
    	Control => new Control(state, config));
    this.dom = elt("div", {}, this.canvas.dom, elt("br"),
    							...this.controls.reduce((a, c) => a.concat(" ", c.dom), []));
  }
  syncState(state) {
  	this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls)
    	ctrl.syncState(state);
  }
}
class ToolSelect {
  constructor(state, {tools, dispatch}) {
    this.select = elt("select", {
      onchange: () => dispatch({tool: this.select.value})
    }, ...Object.keys(tools).map(name => elt("option", {
      selected: name == state.tool
    }, name)));
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }
  syncState(state) { this.select.value = state.tool; }
}
class ColorSelect {
	constructor(state, {dispatch}) {
  	this.input = elt("input", {
    	type: "color",
      value: state.color,
      onchange: () => dispatch({color: this.input.value})
    });
    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  syncState(state) {
  	this.input.value = state.color;
  }
}
function draw(pos, state, dispatch) {
	function drawPixel({x, y}, state) {
  	let drawn = {x, y, color: state.color};
    dispatch({picture: state.picture.drawn([drawn])});
  }
  drawPixel(pos, state);
  return drawPixel;
}
function rectangle(start, state, dispatch) {
	function drawRectangle(pos) {
  	let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
    	for (let x = xStart; x <= xEnd; x++) {
      	drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawRectangle(start);
  return drawRectangle;
}
const around = [{dx: -1, dy: 0}, {dx: 1, dy: 0},
								 {dx: 0, dy: -1}, {dx: 0, dy: 1}];

function fill({x, y}, state, dispatch) {
	let targetColor = state.picture.pixel(x, y);
  let drawn = [{x, y, color: state.color}];
  let visited = new Set();
  for (let done = 0; done < drawn.length; done++) {
  	for (let {dx, dy} of around) {
    	let x = drawn[done].x + dx, y = drawn[done].y + dy;
      if (x >= 0 && x < state.picture.width &&
      		y >= 0 && y < state.picture.height &&
          !visited.has(x + "," + y) && 
          state.picture.pixel(x, y) == targetColor) {
          	drawn.push({x, y, color: state.color});
            visited.add(x + "," + y);
          }
    }
  }
  dispatch({picture: state.picture.draw(drawn)});
}
function pick(pos, state, dispatch) {
	dispatch({color: state.picture.pixel(pos.x, pos.y)});
}
class SaveButon {
	constructor(state) {
  	this.picture = state.picture;
    this.dom = elt("button", {
    	onclick: () => this.save()
    }, "💾 Save");
  }
  save() {
  	let canvas = elt("canvas");
    drawPicture(this.picture, canvas, 1);
    let link = elt("a", {
    	href: canvas.toDataURL(),
      download: "pixelart.png"
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  syncState(state) {
  	this.picture = state.picture;
  }
}
class LoadButton {
	constructor(_, {dispatch}) {
  	this.dom = elt("button", {
    	onclick: () => startLoad(dispatch)
    }, "📁 Load");
  }
  syncState() {}
}

function startLoad(dispatch) {
	let input = elt("input", {
  	type: "file",
    onchange: () => finishLoad(input.files[0], dispatch)
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}
function finishLoad(file, dispatch) {
	if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
  	let image = elt("img", {
    	onload: () => dispatch({
      	picture: pictureFromImage(image)
      }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

function pictureFromImage(image) {
	let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = elt("canvas", {width, height});
  let cx = canvas.getContext("2d");
  cx.drawImage(image, 0, 0);
  let pixels = [];
  let {data} = cx.getImageData(0, 0, width, height);
  
  function hex(n) {
  	return n.toString(16).padStart(2, "0");
  }
  
  for (let i = 0; i < data.length; i+= 4) {
  	let [r, g, b] = data.slice(i, i + 3);
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}

function historyUpdateState(state, action) {
	if (action.undo == true) {
  	if (state.done.length == 0)
    	return state;
    return {
    	...state,
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0
    };
  } else if (action.picture && 
  					 state.doneAt < Date.now() - 1000) {
  		return {
      	...state,
        ...action,
        done: [state.picture, ...state.done],
        doneAt: Date.now()
      };
  } else {
  	return {...state, ...action};
  }
}

class UndoButton {
	constructor(state, {dispatch}) {
  	this.dom = elt("button", {
    	onclick: () => dispatch({undo: true}),
      disabled: state.done.length == 0
    }, "⮪ Undo");
  }
  syncState(state) {
  	this.dom.disabled = state.done.length == 0;
  }
}

const startState = {
	tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0
};

const baseTools = {draw, fill, rectangle, pick};

const baseControls = [
	ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({state = startState,
														tools = baseTools,
                            controls = baseControls}) {
	let app = new PixelEditor(state, {
  	tools,
    controls,
    dispatch(action) {
    	state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });                      
  return app.dom;
}
