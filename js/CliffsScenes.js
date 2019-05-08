// cliffs scenes
/*
class BaseCliffs extends BaseScene {
	constructor() {
		this.load.image('background', 'assets/environment/cliffs-background.png');
		this.load.image('midground', 'assets/environment/cliffs-middleground.png');
		this.load.image('tileset', 'assets/cliffs-tileset.png');
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();
		// map
		var background = this.add.image(config.width / 2, config.height / 2, "background").setScale(1.4, 1).setScrollFactor(0);
		var midground = this.add.image(config.width / 2, config.height / 2, "midground").setScale(1.6, 1.6).setScrollFactor(0.5);
		this.map = this.make.tilemap({ key: this.tileDataKey });
		var tileset = this.map.addTilesetImage('tileset', 'tileset');
		this.map.createStaticLayer('background', tileset, 0, 0);

		// collision layer
		this.collisionLayer = this.map.createStaticLayer('collisions', tileset, 0, 0);
		this.collisionLayer.setCollisionBetween(0, 1000);

		// destructibles layer
		this.destructibleLayer = this.map.createDynamicLayer('destructibles', tileset, 0, 0);
		this.destructibleLayer.setCollisionByProperty({ collides: true });

		this.map.createStaticLayer('decoration', tileset, 0, 0);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
*/

class BaseCliffs extends Phaser.Scene {
	constructor(id) {
		super(id);
		this.id = id;
		this.tileDataKey;
		this.tileDataSource;
	}

	preload() {
		this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
		this.load.image('cliffs-background', 'assets/environment/cliffs-background.png');
		this.load.image('cliffs-midground', 'assets/environment/cliffs-foreground.png');
		this.load.image('cliffs-tileset', 'assets/cliffs-tileset-extruded.png');
		// player
		this.load.spritesheet(
			'player-idle',
			'assets/sprites/player/idle.png', {
				frameWidth: 37,
				frameHeight: 32,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'player-run',
			'assets/sprites/player/skip.png', {
				frameWidth: 37,
				frameHeight: 32,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'player-jump',
			'assets/sprites/player/jump.png', {
				frameWidth: 37,
				frameHeight: 32,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'player-fall',
			'assets/sprites/player/fall.png', {
				frameWidth: 37,
				frameHeight: 32,
				margin: 0,
				spacing: 0
			}
        )
		// shooting
		this.load.spritesheet(
			'sparks',
			'assets/sprites/player/sparks.png', {
				frameWidth: 17,
				frameHeight: 5,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'abilities',
			'assets/sprites/abilities/abilities.png', {
				frameWidth: 16,
				frameHeight: 16,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'spring',
			'assets/environment/spring.png', {
				frameWidth: 28,
				frameHeight: 22,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'portal',
			'assets/environment/portal2.png', {
				frameWidth: 26,
				frameHeight: 31,
				margin: 0,
				spacing: 0
			}
		)
        this.load.spritesheet(
            'largeBlocks',
            'assets/environment/largeBlocks.png', {
                frameWidth: 32,
                frameHeight: 32,
                margin: 0,
                spacing: 0
            }
        )
		// enemies
		this.load.spritesheet(
			'fireElemental',
			'assets/sprites/elementals/fire.png', {
				frameWidth: 16,
				frameHeight: 16,
				margin: 0,
				spacing: 0
			}
        )
		this.load.spritesheet(
			'poisonElemental',
			'assets/sprites/elementals/poison.png', {
				frameWidth: 61,
				frameHeight: 45,
				margin: 0,
				spacing: 0
			}
		)
		this.load.spritesheet(
			'waterElemental',
			'assets/sprites/normals/slug.png', {
				frameWidth: 32,
				frameHeight: 21,
				margin: 0,
				spacing: 0
			}
		)

		// TODO make UI buttons into spritesheet
        this.load.image('leftBTN', 'assets/sprites/ui/leftBTN.png');
        this.load.image('rightBTN', 'assets/sprites/ui/rightBTN.png');
        this.load.image('shootBTN', 'assets/sprites/ui/shootBTN.png');
        this.load.image('jumpBTN', 'assets/sprites/ui/jumpBTN.png');
        this.load.image('inventoryBTN', 'assets/sprites/ui/inventory.png');
		this.load.spritesheet('restartBTN', 'assets/sprites/ui/restartBTN.png', { frameWidth: 24, frameHeight: 24, margin: 0, spacing: 0 });
		this.load.spritesheet('pauseBTN', 'assets/sprites/ui/pauseBTN.png', { frameWidth: 24, frameHeight: 24, margin: 0, spacing: 0 });
		this.load.image('paused', 'assets/sprites/ui/paused.png');
	}

    create() {
        // reset window
        window.addEventListener("resize", resize, false);
		paused = false;
		inventory = [];

		// map
		var background = this.add.image(config.width / 2, config.height / 2, "cliffs-background").setScale(1.5, 1).setScrollFactor(0);
		var midground = this.add.image(config.width / 2, config.height + 300, "cliffs-midground").setScale(2.5, 2.5).setScrollFactor(0.6);
		this.map = this.make.tilemap({ key: this.tileDataKey });
		var tileset = this.map.addTilesetImage('cliffs-tileset', 'cliffs-tileset', 16, 16, 1, 2);
		this.map.createStaticLayer('background', tileset, 0, 0);
		this.map.createStaticLayer('background2', tileset, 0, 0);

		// collision layer
		this.collisionLayer = this.map.createStaticLayer('collisions', tileset, 0, 0);
        this.collisionLayer.setCollisionBetween(0, 1000);
   
		this.map.createStaticLayer('decoration', tileset, 0, 0);

        // destructibles layer
        this.destructibleLayer = this.map.createDynamicLayer('destructibles', tileset, 0, 0);
		this.destructibleLayer.setCollisionByProperty({ collides: true });

		// abilities
		fireAbilities = this.physics.add.staticGroup();
		waterAbilities = this.physics.add.staticGroup();
		electricAbilities = this.physics.add.staticGroup();
		this.map.findObject('items', function(ability) {
			if (ability.type === 'ability') {
				if (ability.name === 'fire') {
					fireAbilities.create(ability.x + 8, ability.y - 8, 'abilities', 1);
				} else if (ability.name === 'water') {
					waterAbilities.create(ability.x + 8, ability.y - 8, 'abilities', 2);
				} else if (ability.name === 'electric') {
					electricAbilities.create(ability.x + 8, ability.y - 8, 'abilities', 3);
				}
			}
		});

		// enemies (elemental)
		fireElementals = this.physics.add.staticGroup();
		poisonElementals = this.physics.add.staticGroup();
		waterElementals = this.physics.add.staticGroup();
        this.map.findObject('items', function (enemy) {
            if (enemy.type === 'elemental') {
                if (enemy.name === 'fire') {
                    fireElementals.create(enemy.x + 8, enemy.y - 8, 'fireElemental');
                }
				if (enemy.name === 'poison') {
					poisonElementals.create(enemy.x + 8, enemy.y - 8, 'poisonElemental');
				}
				if (enemy.name === 'water') {
					waterElementals.create(enemy.x + 8, enemy.y - 8, 'waterElemental');
				}
            }
        });
		this.createEnemyAnims();

		// extras
		springs = this.physics.add.staticGroup();
		this.map.findObject('items', function(object) {
			if (object.type === 'spring') {
				springs.create(object.x + 14, object.y - 11, 'spring');
			}
		});

        portals = this.physics.add.staticGroup();
        this.map.findObject('items', function (object) {
            if (object.name === 'portal') {
                portals.create(object.x + 8, object.y - 8, 'portal');
            }
        });
        this.createPortalAnims();

		keys = this.physics.add.staticGroup();
        this.map.findObject('items', function (object) {
            if (object.type === 'key') {
                keys.create(object.x + 8, object.y - 8, 'abilities', 4);
            }
        });

        largeBlocks = this.physics.add.staticGroup();
        this.map.findObject('items', function (object) {
            if (object.type === 'largeBlock') {
                if (object.name === 'bull') {
                    largeBlocks.create(object.x + 8, object.y - 8, 'largeBlocks', 0);
                } else if (object.name === 'plain') {
                    largeBlocks.create(object.x + 8, object.y - 8, 'largeBlocks', 1);
                }
            }
        });

		// player
		var playerSpawn = this.map.findObject('player', function(object) {
			if (object.name === 'playerSpawn') {
				return object;
			}
		});
		
		this.createPlayerAnims();
		this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player-idle', 0);

		// camera
		var camera = this.cameras.main;
		camera.zoom = 2;
		camera.startFollow(this.player.bunny);
		camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // sparks
        this.sparks = this.physics.add.group({
            defaultKey: 'sparks',
			defaultFrame: 0,
            allowGravity: false,
            velocityX: 150,
            maxSize: 10
        });
		this.createSparkAnims();

        // buttons
        this.buttons = this.physics.add.staticGroup();
        this.createButtons();

		// inventory
		inventoryImage = this.add.image(config.width / 2 + 110, config.height / 2 - 55, 'abilities', 0).setScrollFactor(0);

        // collisions
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.add.collider(this.player.bunny, this.collisionLayer);
		this.physics.add.overlap(this.player.bunny, springs, function(player, spring) {
			player.setVelocityY(-350);
		});
		// picking up items
		this.physics.add.overlap(this.player.bunny, fireAbilities, function(player, ability) {
			inventory.pop();
			inventory.push('fire');
			ability.disableBody(true, true);
		});
		this.physics.add.overlap(this.player.bunny, waterAbilities, function(player, ability) {
			inventory.pop()
			inventory.push('water');
			ability.disableBody(true, true);
		});
		this.physics.add.overlap(this.player.bunny, electricAbilities, function(player, ability) {
			inventory.pop();
			inventory.push('electric');
			ability.disableBody(true, true);
		});
		this.physics.add.overlap(this.player.bunny, keys, function(player, key) {
			inventory.pop();
			inventory.push('key');
			key.disableBody(true, true);
		})

		// shooting elementals
		this.physics.add.overlap(this.sparks, fireElementals, function(spark, enemy) {
			if (inventory.includes('water')) {
				enemy.disableBody(true, true);
			}
			spark.disableBody(true, true);
		})
		this.physics.add.overlap(this.sparks, poisonElementals, function(spark, enemy) {
			if (inventory.includes('fire')) {
				enemy.disableBody(true, true);
			}
			spark.disableBody(true, true);
		})
		this.physics.add.overlap(this.sparks, waterElementals, function(spark, enemy) {
			if (inventory.includes('electric')) {
				enemy.disableBody(true, true);
			}
			spark.disableBody(true, true);
		})

		// elementals hurting player
        this.physics.add.overlap(this.player.bunny, fireElementals, function () {
            this.restartScene();
            trackEvent('PlayerDies');
		}, null, this);
        this.physics.add.overlap(this.player.bunny, poisonElementals, function () {
            this.restartScene();
            trackEvent('PlayerDies');
		}, null, this);
        this.physics.add.overlap(this.player.bunny, waterElementals, function () {
            this.restartScene();
            trackEvent('PlayerDies');
		}, null, this);

        // player unlock blocks
        this.physics.add.collider(this.player.bunny, this.destructibleLayer);

        this.physics.add.collider(this.player.bunny, largeBlocks, function (player, block) {
            if (inventory.includes('key')) {
                inventory.pop();
                block.disableBody(true, true);
            }
        })

        // start next level
        this.physics.add.collider(this.player.bunny, portals, this.switchScene, null, this);

        this.input.addPointer();

        this.physics.world.on('worldbounds', this.killSpark, this)
	}

	update(time, delta) {
		this.player.update();
        fireElementals.playAnimation('fireAnims', true);
		poisonElementals.playAnimation('poisonAnims', true);
		waterElementals.playAnimation('waterAnims', true);
        portals.playAnimation('portal', true);
		this.checkInventory();
	}

    // additional shooting functions
    shoot() {
		if (! paused) {
			var spark = this.sparks.get(this.player.bunny.x, this.player.bunny.y + 7);
			if (spark) {
				this.checkInventory();
				this.checkAttack();
				spark.body.collideWorldBounds = true;
				spark.body.onWorldBounds = true;
				spark.enableBody(false, this.player.bunny.x, this.player.bunny.y, true, true);
				if (this.player.bunny.flipX == true) {
					spark.setVelocityX(-150);
					spark.flipX = true;
				}
				else {
					spark.setVelocityX(150);
					spark.flipX = false;
				}
				spark.setActive(true);
				spark.setVisible(true);
				this.physics.add.collider(spark, this.destructibleLayer, this.sparkHitWall, null, this);
				this.time.delayedCall(2500, this.killSpark, [spark.body], this);
			}
		}
    }

    killSpark(body) {
        body.gameObject.disableBody(true, true);
    }

	sparkHitWall(spark, tile) {
		var tileProperties = this.destructibleLayer.tileset[0].tileProperties[tile.index];
		console.log(tile.index);
		var checkCollision = false;
		if (tileProperties) {
			if (tileProperties.collides) {
				checkCollision = true;
			}
		}
		// killed by anything
        if (tile.index === 48) {
            const newTile = this.destructibleLayer.putTileAt(108, tile.x, tile.y);
            newTile.setCollision(false);
        }
        // killed by fire
        else if (tile.index === 49 || tile.index === 51 || tile.index === 107) {
            if (inventory.includes('fire')) {
                const newTile = this.destructibleLayer.putTileAt(108, tile.x, tile.y);
                newTile.setCollision(false);
            }
        }
        this.killSpark(spark.body);
    }

	// functions to keep track of inventory
	checkInventory() {
		if (inventory.includes('fire')) {
			inventoryImage.setFrame(1);
		} else if (inventory.includes('water')) {
			inventoryImage.setFrame(2);
		} else if (inventory.includes('electric')) {
			inventoryImage.setFrame(3);
		} else if (inventory.includes('key')) {
			inventoryImage.setFrame(4);
		} else {
			inventoryImage.setFrame(0);
		}
	}

	checkAttack() {
		this.sparks.children.iterate(function(spark) {
			if (inventory.includes('fire')) {
				spark.anims.play('sparkFire');
			} else if (inventory.includes('water')) {
				spark.anims.play('sparkWater');
			} else if (inventory.includes('electric')) {
				spark.anims.play('sparkElectric');
			} else {
				spark.anims.play('sparkDefault');
			}
		})
	}

	dropItem() {
		inventory.pop();
	}


	// additional create functions
	createButtons() {
		// TODO fix pointerout so they work on mobile
        // left button
        var leftButton = this.add.image(config.width / 2 - 110, config.height / 2 + 55, 'leftBTN').setScrollFactor(0);
        leftButton.setInteractive();
        leftButton.on('pointerdown', function () { moveLeft = true }, this);
        leftButton.on('pointerup', function () { moveLeft = false }, this);
        leftButton.on('pointerout', function () { moveLeft = false }, this);

        // right button
        var rightButton = this.add.image(config.width / 2 - 80, config.height / 2 + 55, 'rightBTN').setScrollFactor(0);
        rightButton.setInteractive();
        rightButton.on('pointerdown', function () { moveRight = true }, this);
        rightButton.on('pointerup', function () { moveRight = false }, this);
        rightButton.on('pointerout', function () { moveRight = false }, this);

        // shoot button
        var shootButton = this.add.image(config.width / 2 + 110, config.height / 2 + 30, 'shootBTN').setScrollFactor(0);
        shootButton.setInteractive();
        shootButton.on('pointerdown', this.shoot, this);

        // jump button
        var jumpButton = this.add.image(config.width / 2 + 110, config.height / 2 + 55, 'jumpBTN').setScrollFactor(0);
        jumpButton.setInteractive();
        jumpButton.on('pointerdown', function () { jumpUp = true }, this);
        jumpButton.on('pointerup', function () { jumpUp = false }, this);
        jumpButton.on('pointerout', function () { jumpUp = false }, this);

        // inventory button
        var inventoryButton = this.add.image(config.width / 2 + 110, config.height / 2 - 55, 'inventoryBTN', 0).setScrollFactor(0);
        inventoryButton.setInteractive();
		// TODO fix if paused (make function one line)
        inventoryButton.on('pointerdown', function () {
			if (! paused) {
				this.dropItem();
			}
		}, this );

		// restart button
		var restartButton = this.add.image(config.width / 2 - 80, config.height / 2 - 55, 'restartBTN').setScrollFactor(0);
		restartButton.setInteractive();
		restartButton.on('pointerdown', function() {
			if (paused) {
				this.scene.start('titleScreen');
			} else {
				cliffsRestartsA++;
				trackEvent('Restart', 'CliffsRestart', cliffsRestartsA);
				this.scene.start(this.id);
			}
		}, this);

		// pause button
		var pauseButton = this.add.image(config.width / 2 - 110, config.height / 2 - 55, 'pauseBTN').setScrollFactor(0);
		var pausedText = this.add.image(config.width / 2, config.height / 2, 'paused').setScrollFactor(0).setVisible(false);
		pauseButton.setInteractive();
		pauseButton.on('pointerdown', function() {
			if (paused) {
				restartButton.setFrame(0);
				pauseButton.setFrame(0);
				paused = false;
                pausedText.setVisible(false);
				this.player.bunny.anims.resume();
				this.physics.resume();
			} else {
				restartButton.setFrame(1);
				pauseButton.setFrame(1);
				paused = true;
                pausedText.setVisible(true);
				this.player.bunny.anims.pause();
				this.physics.pause();
			}
		}, this);

        this.buttons.add(leftButton, rightButton, shootButton, jumpButton, inventoryButton, pauseButton, restartButton);
    }

	// animations
	createSparkAnims() {
		this.anims.create({
			key: 'sparkDefault',
			frames: this.anims.generateFrameNumbers('sparks', { frames: [0, 0] }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'sparkFire',
			frames: this.anims.generateFrameNumbers('sparks', { frames: [1, 1] }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'sparkWater',
			frames: this.anims.generateFrameNumbers('sparks', { frames: [2, 2] }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'sparkElectric',
			frames: this.anims.generateFrameNumbers('sparks', { frames: [3, 3] }),
			frameRate: 1,
			repeat: -1
		})
	}

	createPlayerAnims() {
		// idle
		this.anims.create({
			key: 'player-idle',
			frames: this.anims.generateFrameNumbers('player-idle', { start: 0, end: 8 }),
			frameRate: 10,
			repeat: -1
		})
		// run
		this.anims.create({
			key: 'player-run',
			frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 7 }),
			frameRate: 20,
			repeat: -1
		})
		// jump
		this.anims.create({
			key: 'player-jump',
			frames: this.anims.generateFrameNumbers('player-jump', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: 0
		})
		// fall
		this.anims.create({
			key: 'player-fall',
			frames: this.anims.generateFrameNumbers('player-fall', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
        })
	}

	createEnemyAnims() {
		this.anims.create({
			key: 'fireAnims',
			frames: this.anims.generateFrameNumbers('fireElemental', { frames: [0, 1] }),
			frameRate: 7,
			repeat: -1
		})

		this.anims.create({
			key: 'poisonAnims',
			frames: this.anims.generateFrameNumbers('poisonElemental', { start: 0, end: 13 }),
			frameRate: 7,
			repeat: -1
		})

		this.anims.create({
			key: 'waterAnims',
			frames: this.anims.generateFrameNumbers('waterElemental', { start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		})
    }

    createPortalAnims() {
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 2 }),
            frameRate: 7,
            repeat: -1
        })
    }
    
	// function for switching scenes
	switchScene() {
		switch(this.id) {
            case 'cliffsA':
                completeLevels.cliffs[0] = true;
				trackEvent('LevelComplete', 'Cliffs A');
				this.scene.start('endGame');
				break;
		}
    }

    restartScene() {
        this.scene.start(this.id);
    }
}

class CliffsA extends BaseCliffs {
	constructor() {
		super('cliffsA');
		this.tileDataKey = 'cliffs1';
		this.tileDataSource = 'assets/cliffs1.json';
	}

	preload() {
		super.preload();
	}

	create() {
		super.create();
	}

	update(time, delta) {
		super.update(time, delta);
	}
}