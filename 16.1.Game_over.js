<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>
<script src="code/_stop_keys.js"></script>

<link rel="stylesheet" href="css/game.css">

<body>
<script>
  // The old runGame function. Modify it...
  async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
      console.log(`Level: ${level + 1}       Lives: ${lives}`);
      let status = await runLevel(new Level(plans[level]),
                                  Display);
      if (status == "won") level++;
      else lives--;
    }
    if (lives > 0) 
        console.log("You've won!");
    else 
        console.log("Game over");
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>
