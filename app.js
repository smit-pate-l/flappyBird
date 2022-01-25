let config = {
	type: Phaser.AUTO,
	scale: {
		width: innerWidth - 15,
		height: innerHeight - 15,
	},
	backgroundColor: '#049cd8',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 100 },
		},
	},
	scene: {
		preload,
		create,
		update,
	},
};
var game = new Phaser.Game(config);

var PipeUpClass = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,
	initialize: function PipeUpClass(scene) {
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pipeUp');
	},
});

var PipeDownClass = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,
	initialize: function PipeDownClass(scene) {
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pipeDown');
	},
});

function preload() {
	this.load.image('pipeDown', 'assets/pipeDown.png');
	this.load.image('pipeUp', 'assets/pipeUp.png');
	this.load.spritesheet('bird', 'assets/bird.png', {
		frameWidth: 90,
		frameHeight: 64,
	});
}

function create() {
	this.cursor = this.input.keyboard.createCursorKeys();

	this.bird = this.physics.add.sprite(100, game.config.height / 2, 'bird', 1);

	this.bird.setCollideWorldBounds(true);
	this.pipeUp = this.physics.add.group({
		classType: PipeUpClass,
		runChildUpdate: true,
		allowGravity: false,
	});
	this.pipeDown = this.physics.add.group({
		classType: PipeDownClass,
		runChildUpdate: true,
		allowGravity: false,
	});

	this.anims.create({
		key: 'fly',
		frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
		frameRate: 15,
		repeat: -1,
	});
	this.physics.add.collider(this.bird, this.pipeDown, birdDie, null, this);
	this.physics.add.collider(this.bird, this.pipeUp, birdDie, null, this);
}

let posX = innerWidth - 200;
function update(time, delta) {
	if (time % 9 == 0) {
		if (time % 6 == 0) {
			this.pipeU = this.pipeUp
				.get()
				.setActive(true)
				.setVisible(true)
				.setPosition(posX + 200, 140)
				.setScale(3, 3);
			this.pipeD = this.pipeDown
				.get()
				.setActive(true)
				.setVisible(true)
				.setPosition(posX + 200, game.config.height + 80)
				.setScale(3, 3);
		} else {
			this.pipeU = this.pipeUp
				.get()
				.setActive(true)
				.setVisible(true)
				.setPosition(posX + 200, 40)
				.setScale(3, 3);
			this.pipeD = this.pipeDown
				.get()
				.setActive(true)
				.setVisible(true)
				.setPosition(posX + 200, game.config.height + 140)
				.setScale(3, 3);
		}

		this.pipeUp.setVelocityX(-200);
		this.pipeDown.setVelocityX(-200);
		posX += 100;
	}
	this.bird.anims.play('fly', true);

	if (this.cursor.up.isDown) {
		this.bird.setVelocityY(-300);
	} else {
		this.bird.setVelocityY(150);
	}
}
function birdDie(b, p) {
	b.active = false;
	b.disableBody(true, true);
	this.physics.pause();
	gameOver = true;
}
