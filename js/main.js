// phaser config

var config = {
	type: Phaser.WEBGL, // Phaser.AUTO
	width: 16 * 16 * 2, // tilesize * aspect ratio * zoom
	height: 16 * 9 * 2,

	// MAKE LIST IN ORDER (MAIN MENU FIRST THEN ALL LEVELS)
	scene: [TitleScreen, MainMenu, ForestA, ForestB, CliffsA, EndGame],

	pixelArt: true,

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 650 },
			debug: false
		}
    },
    
    callbacks: {
        postBoot: function () {
            resize();
        }
    }
}

// initialise game & variables

var game = new Phaser.Game(config);

var worlds = ['forest', 'cliffs'];
var world;
var moveLeft, moveRight, jumpUp;
var inventory = [], inventoryImage;
var springs, keys;
var fireAbilities, waterAbilities, electricAbilities;
var fireElementals, poisonElementals, waterElementals;
var paused;
var largeBlocks;
var portals;
var completeLevels = {
    forest: [false, false],
    cliffs: [false]
};

// gtag variables
var forestRestartsA = 0;
var forestRestartsB = 0;
var cliffsRestartsA = 0;

// initialise fuctions

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }

    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

function trackEvent(action, label, value) {
    var str = "iteration 2: action = " + action + ", label = " + label + ", value = " + value;
    console.log(str);
    gtag('event', action, {
        'event_category': 'Iteration2',
        'event_label': label,
        'value': value
    });
}