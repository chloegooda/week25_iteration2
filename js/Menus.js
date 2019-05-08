class BaseMenu extends Phaser.Scene {
	constructor(id) {
		super(id);
		this.id = id;
	}

	preload() {
		this.load.image('forest-background', 'assets/environment/forest-background.png');
        this.load.image('forest-midground', 'assets/environment/forest-middleground.png');
        this.load.image('cliffs-background', 'assets/environment/cliffs-background.png');
        this.load.image('cliffs-midground', 'assets/environment/cliffs-foreground.png');
	}

	create() {

	}

	update(time, delta) {
		
	}
}

class TitleScreen extends BaseMenu {
	constructor() {
		super('titleScreen');
	}

	preload() {
		super.preload();
		this.load.image('main-background', 'assets/environment/cliffs-middleground.png');
		this.load.image('startText', 'assets/sprites/ui/start.png');
	}

	create() {
		super.create();
		this.bg = this.add.image(config.width / 2, config.height / 2, 'main-background').setScale(6, 4);
		var startButton = this.add.image(config.width / 2, config.height / 2, 'startText').setScale(3, 3).setScrollFactor(0);
		startButton.setInteractive();
		startButton.on('pointerdown', function() {
			this.scene.start('mainMenu');
        }, this);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}

class MainMenu extends BaseMenu {
	constructor() {
		super('mainMenu');
	}

	preload() {
		super.preload();
		this.load.image('leftMenuBTN', 'assets/sprites/ui/leftMenuBTN.png');
		this.load.image('rightMenuBTN', 'assets/sprites/ui/rightMenuBTN.png');
		this.load.image('startText', 'assets/sprites/ui/start.png');
		this.load.spritesheet(
			'star-filled',
			'assets/sprites/ui/star-spritesheet.png', {
				frameWidth: 26,
				frameHeight: 26,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'star-empty',
			'assets/sprites/ui/star-empty-spritesheet.png', {
				frameWidth: 26,
				frameHeight: 26,
				margin: 0,
				spacing: 0
			}
		)
	}

	create() {
		super.create();
		this.bg = this.add.image(config.width / 2, config.height / 2, "forest-background").setScale(3, 2);
		this.mg = this.add.image(config.width / 2, config.height / 2, "forest-midground").setScale(1.6, 1.6);
		this.createStarAnims();
        this.checkComplete();
		this.checkBackground();
		// navigation buttons
		var leftMenuBTN = this.add.image(50, config.height / 2, 'leftMenuBTN').setScale(2, 2).setScrollFactor(0);
		leftMenuBTN.setInteractive();
		var rightMenuBTN = this.add.image(config.width - 50, config.height / 2, 'rightMenuBTN').setScale(2, 2).setScrollFactor(0);
		rightMenuBTN.setInteractive();
		leftMenuBTN.on('pointerdown', function() {
			this.carousel('left');
		}, this);
		rightMenuBTN.on('pointerdown', function() {
			this.carousel('right');
		}, this);
		// start button
		var startButton = this.add.image(config.width / 2, config.height / 2, 'startText').setScale(3, 3).setScrollFactor(0);
		startButton.setInteractive();
		startButton.on('pointerdown', function() {
			this.startGame();
        }, this);
	}

	update(time, delta) {
		super.update(time, delta);
        this.checkBackground();
		this.checkStarsVisible();
	}

	carousel(direction) {
		if (direction === 'right') {
			var temp = worlds.shift();
			worlds.push(temp);
		} else if (direction === 'left') {
			var temp = worlds.splice(1, 1);
			worlds.unshift(temp[0]);
		}
	}

	checkBackground() {
		world = worlds[0];
		if (world === 'forest') {
			this.bg.setTexture('forest-background').setScale(3, 2);
			this.mg.setTexture('forest-midground').setScale(1.6, 1.6);
		}
		else if (world === 'cliffs') {
			this.bg.setTexture('cliffs-background').setScale(3, 2);
			this.mg.setTexture('cliffs-midground').setScale(1.2);
		}
    }

    checkComplete() {
		// create stars groups
		this.forestStars = this.physics.add.staticGroup();
		this.cliffsStars = this.physics.add.staticGroup();
		
		// forest stars
		this.forestStars.create(config.width / 2 - 25, config.height / 2 + 70, "star-empty")
		this.forestStars.create(config.width / 2 + 25, config.height / 2 + 70, "star-empty")
		// cliffs stars
		this.cliffsStars.create(config.width / 2, config.height / 2 + 70, "star-empty")
		
		// check completed levels
		if (completeLevels.forest[0] === true) {
			this.forestStars.children.entries[0].setTexture('star-filled');
			this.forestStars.children.entries[0].anims.play('star-filled-anims', true);
			if (completeLevels.forest[1] === false) {
				this.forestStars.children.entries[1].setTexture('star-empty');
				this.forestStars.children.entries[1].anims.play('star-empty-anims', true);
			} else if (completeLevels.forest[1] === true) {
				this.forestStars.children.entries[1].setTexture('star-filled');
				this.forestStars.children.entries[1].anims.play('star-filled-anims', true);
			}
		} else {
			this.forestStars.children.entries[1].setTexture('star-empty');
			this.forestStars.children.entries[1].anims.play('star-empty-anims', true);
			this.forestStars.children.entries[0].setTexture('star-empty');
			this.forestStars.children.entries[0].anims.play('star-empty-anims', true);
		}

        if (completeLevels.cliffs[0] === true) {
			this.cliffsStars.children.entries[0].setTexture('star-filled');
			this.cliffsStars.children.entries[0].anims.play('star-filled-anims', true);
        } else {
			this.cliffsStars.children.entries[0].setTexture('star-empty');
			this.cliffsStars.children.entries[0].anims.play('star-empty-anims', true);
        }
    }

	checkStarsVisible() {
		// forest stars
		if (world === 'forest') {
			this.forestStars.children.iterate(function (star) {
				star.setVisible(true);
			})
			this.cliffsStars.children.iterate(function (star) {
				star.setVisible(false);
			})
		}
		else if (world === 'cliffs') {
			this.forestStars.children.iterate(function (star) {
				star.setVisible(false);
			})
			this.cliffsStars.children.iterate(function (star) {
				star.setVisible(true);
			})
		}
	}

	createStarAnims() {
		this.anims.create({
			key: 'star-filled-anims',
			frames: this.anims.generateFrameNumbers('star-filled', { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'star-empty-anims',
			frames: this.anims.generateFrameNumbers('star-empty', { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1
		})
	}

    startGame() {
		if (world === 'forest') {
			this.scene.start('forestA');
		}
		else if (world === 'cliffs') {
			this.scene.start('cliffsA');
		}
    }
}

class EndGame extends BaseMenu {
	constructor() {
		super('endGame');
	}

	preload() {
		super.preload();
		this.load.image('finishText', 'assets/sprites/ui/finish.png');
		this.load.spritesheet('restartBTN', 'assets/sprites/ui/restartBTN.png', { frameWidth: 24, frameHeight: 24, margin: 0, spacing: 0 });
	}

	create() {
        super.create();
        this.bg = this.add.image(config.width / 2, config.height / 2, "forest-background").setScale(3, 2);
        this.mg = this.add.image(config.width / 2, config.height / 2, "forest-midground").setScale(1.6, 1.6);
		// start button
		var finishScreen = this.add.image(config.width / 2, config.height / 2 - 10, 'finishText').setScale(3, 3).setScrollFactor(0);
		var restartBTN = this.add.image(config.width / 2, config.height / 2 + 50, 'restartBTN').setScale(2, 2).setScrollFactor(0);
		restartBTN.setInteractive();
		restartBTN.on('pointerdown', function() {
			this.restartGame();
		}, this);
	}

	update(time, delta) {
        super.update(time, delta);
        this.checkBackground();
	}

    checkBackground() {
        if (world === 'forest') {
            this.bg.setTexture('forest-background').setScale(3, 2);
            this.mg.setTexture('forest-midground').setScale(1.6, 1.6);
        }
        else if (world === 'cliffs') {
            this.bg.setTexture('cliffs-background').setScale(3, 2);
            this.mg.setTexture('cliffs-midground').setScale(1.2);
        }
    }

	restartGame() {
		this.scene.start('titleScreen');
	}
}