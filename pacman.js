// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];



// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\nPower-pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  for (var index = 0; index < ghosts.length; index++) {
    console.log('(' + (index + 1) + ') Eat ' + ghosts[index]['name'] + ' (' + edibleStatus(ghosts[index]) + ')') ;
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function edibleStatus(ghost) {
  if (ghost.edible === true) {
    return 'edible'
  } else {
    return 'inedible'
  }
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost['edible'] === true) {
    console.log('\n Pacman eats the ' + ghost['character'] + ' ' + ghost['name']);
    score += 200
    ghost['edible'] = false;
  }else {
    console.log('\n' + ghost['name'] + ' the ' + ghost['colour'] + ' ghost has killed Pac-man!');
    lives--
    gameOver(lives)
  }
}

function gameOver(lives) {
  if (lives < 0) {
    process.exit()
  }
}

function eatPowerPellet() {
  console.log('\nChomp! Ghosts are now edible!!!!');
  score += 50;
  for (var index = 0; index < ghosts.length; index++) {
    ghosts[index]['edible'] = true;
  }
    powerPellets -= 1;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log('\nNo Power-Pellets left!');
      }
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;

    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
