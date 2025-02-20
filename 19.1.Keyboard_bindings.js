<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  // The original PixelEditor class. Extend the constructor.
  class PixelEditor {
    constructor(state, config) {
      let {tools, controls, dispatch} = config;
      this.state = state;

      this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) {
          return pos => onMove(pos, this.state, dispatch);
        }
      });
      this.controls = controls.map(
        Control => new Control(state, config));
      this.dom = elt("div", {
        tabIndex: 0,
        onkeydown: event => this.keyDown(event, config)
      }, this.canvas.dom, elt("br"),
                     ...this.controls.reduce(
                       (a, c) => a.concat(" ", c.dom), []));
    }
    keyDown(event, config) {
      if (event.key == "z" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        config.dispatch({undo: true});
      } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
        for (let tool of Object.keys(config.tools)) {
          if (tool[0] == event.key) {
            event.preventDefault();
            config.dispatch({tool});
            return;
          }
        }
      }
    }
    syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>
