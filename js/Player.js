// player class

// TODO make movement from clicking buttons into functions.

class Player {
	constructor(scene, x, y, spritesheet, frame) {
        this.scene = scene;
		this.bunny = scene.physics.add.sprite(x, y, spritesheet, frame)
		this.bunny.body.setSize(this.bunny.body.width - 17, this.bunny.body.height - 4);
		this.bunny.setCollideWorldBounds(true);
		this.bunny.body.setOffset(8, 5);
		this.currentSpeed = 0;
		this.maxJumps = 2;
		this.jumpCount = 0;
		this.keys = scene.input.keyboard.addKeys(
			{
				left: Phaser.Input.Keyboard.KeyCodes.LEFT,
				right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
				up: Phaser.Input.Keyboard.KeyCodes.UP,
				down: Phaser.Input.Keyboard.KeyCodes.DOWN
			}
		);
	}

	enableCollision(destructibleLayer) {
		this.scene.physics.add.collider(this.bunny.body, destructibleLayer); 
	}

	checkMovement() {
		var cursors = this.scene.input.keyboard.createCursorKeys();
		if (! paused) {
			// right movement
			if (moveRight === true) {
				this.bunny.setVelocityX(100);
				if (this.bunny.body.velocity.y === 0) {
					this.bunny.anims.play('player-run', true);
				}
				this.bunny.flipX = false;
			}

			// left movement
			else if (moveLeft === true) {
				this.bunny.setVelocityX(-100);
				if (this.bunny.body.velocity.y === 0) {
					this.bunny.anims.play('player-run', true);
				}
				this.bunny.flipX = true;
			}

			// idle
			else {
				if (this.bunny.body.velocity.y === 0) {
					this.bunny.anims.play('player-idle', true);
				}
				this.bunny.setVelocityX(0);
				moveRight = false;
				moveLeft = false;
			}

			if (this.bunny.body.blocked.down) {
				this.jumpCount = 0;
			}

			if (jumpUp === true) {
				if (this.jumpCount < this.maxJumps) {
					this.jumpCount++;
					this.bunny.setVelocityY(-275);
					jumpUp = false;
				}
			}

			if (this.bunny.body.velocity.y < 0) {
				this.bunny.anims.play('player-jump', true);
			} else if (this.bunny.body.velocity.y > 0) {
				this.bunny.anims.play('player-fall', true);
			}
		}
	}

	update() {
	    this.checkMovement();
	}
};