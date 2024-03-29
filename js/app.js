console.log('hey');

class Tamagotchi {
	constructor (name) {
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.sleepiness = 0;
		this.isAlive = true
	}

	createPet () {
		
		game.clearInputField()

		$('#petName').text(`Name: ${this.name}`) 
		$('#petAge').text(`Age: ${this.age}`)
		$('#time').text(`Time: 0`)
		$('#petHunger').text(`Hunger: ${this.hunger}`)
		$('#petSleep').text(`Sleepiness: ${this.sleepiness}`)
		$('#petPlay').text(`Boredom: ${this.boredom}`)
	}

	// feeds the pet
	feed () {
		this.hunger -= 3
		game.printStats()
		$('#character').removeClass('anim');
		// use old bear eating then after 5 secs old bear standing
		if (this.age >= 5) {
			$('#character').attr("src", "images/bear-drawings/bear-old-eat.png");
			setTimeout ( () => {
				$('#character').attr('src', 'images/bear-drawings/bear-drawing.png').addClass('anim').css({
					height: "200px",
					width: "120px"
				})
			}, 5000)
		// use young bear eating then after 5 secs young bear standing
		} else {
			$('#character').attr("src", "images/bear-drawings/bear-young-eat.png");
			setTimeout( () => {
				$('#character').attr("src", "images/bear-drawings/bear-young.png").addClass('anim');
			}, 5000)	
		}
	}

	// puts the pet to sleep
	sleep () {
		this.sleepiness -= 2
		game.printStats()
		$('#character').removeClass('anim');
		// use old bear sleeping then after 5 secs old bear standing
		if (this.age >= 5) {
			$('#character').attr("src", "images/bear-drawings/bear-old-sleep.png").css({
				height: "160px",
				width: "240px"
			});
			setTimeout ( () => {
				$('#character').attr('src', 'images/bear-drawings/bear-drawing.png').addClass('anim').css({
					height: "200px",
					width: "120px"
				})
			}, 5000)
		// use young bear sleeping then after 5 secs young bear standing
		} else {
			$('#character').attr("src", "images/bear-drawings/bear-young-sleep.png").css({
				height: "160px",
				width: "240px"
			});
			setTimeout( () => {
				$('#character').attr("src", "images/bear-drawings/bear-young.png").addClass('anim');
			}, 5000)	
		}
	}

	// plays with the pet
	play () {
		this.boredom -= 2
		game.printStats()

		// use old bear playing then after 5 secs old bear standing
		if (this.age >= 5) {
			$('#character').attr("src", "images/bear-drawings/bear-old-play.png")
			setTimeout ( () => {
				$('#character').attr('src', 'images/bear-drawings/bear-drawing.png').addClass('anim').css({
					height: "200px",
					width: "120px"
				})
			}, 5000)
		// use young bear playing then after 5 secs young bear standing
		} else {
			$('#character').attr("src", "images/bear-drawings/bear-young-play1.png");
			setTimeout( () => {
				$('#character').attr("src", "images/bear-drawings/bear-young.png").addClass('anim');
			}, 5000)	
		}
	}

	getHungry () {
		this.hunger += 2;
	}

	getSleepy () {
		this.sleepiness += 1;
	}

	getBored () {
		this.boredom += 1;
	}

	getOlder () {
		this.age += 1

		// change bear from young to old at age 5
		if (this.age === 5) {
			$('#character').attr('src', 'images/bear-drawings/bear-drawing.png').css({
				height: "200px",
				width: "120px"
			})
		}
	}

 	petDies () {
		if (this.isAlive === true) {
			console.log(`${this.name} is alive!`);
		} else {
			console.log(`${this.name} is dead!`);


			clearInterval(game.intervalID)

			// displays that the game is over
			const $gameOverTag = $('<div/>').text("GAME OVER!");
			$gameOverTag.css({
				backgroundColor: "rgba(0, 0, 0)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "white",
				fontSize: "45px",
				width: "400px",
				height: "360px",
				animation: "fadein 3s",
				zIndex: "2",
				position: "absolute"
			})

			$('#screen').append($gameOverTag)

			$('#character').fadeOut(2000)
		}
	}
}


const game = {

	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	pet: null,
	intervalID: null,

	petGame (name) {
		const tamagotchi = new Tamagotchi(name);

		tamagotchi.createPet();

		this.pet = tamagotchi
		console.log(this.pet);

		this.setTimer();
	},

	isDead () {
		if(this.pet.hunger >= 10 || this.pet.boredom >= 10 || this.pet.sleepiness >= 10) {
			this.pet.isAlive = false
		}
	},

	clearInputField () {
		$('#inputName').remove();
		$('span').remove();
	},

	// chooseDisplayColor () {
	// 	// let user choose color of display when picking name
	// },

	printStats() {
		$('#petPlay').text(`Boredom: ${this.pet.boredom}`)
		$('#petHunger').text(`Hunger: ${this.pet.hunger}`)
		$('#petSleep').text(`Sleepiness: ${this.pet.sleepiness}`)
		$('#petAge').text(`Age: ${this.pet.age}`)
	},

	setTimer () {
		this.intervalID = setInterval( () => {
			// increase timer -- shows hours, minutes, and seconds
			this.time.seconds++;

			// every 60 seconds, increase the minute by 1
			if (this.time.seconds === 60) {
				this.time.minutes++
				this.time.seconds = 0;
			}

			// every 60 minutes, increase the hour by 1
			if (this.time.minutes === 60) {
				this.time.hours++
			}

			// display the time as such 0h 0m 0s
			$('#time').text(`Time: ${this.time.hours}h ${this.time.minutes}m ${this.time.seconds}s`)

			if (this.time.seconds % 3 === 0) {
				this.pet.getOlder()
			}

			if (this.time.seconds % 5 === 0) {
				this.pet.getHungry()
			}

			if (this.time.seconds % 4 === 0) {
				this.pet.getSleepy()
			}

			if (this.time.seconds % 3 === 0) {
				this.pet.getBored()
			}

			this.printStats()
			this.isDead();
			this.pet.petDies();

		}, 1000)
	}
}


// LISTENERS

// listens to the form to add the name of the pet
$('#addName').on('submit', (e) => {
	e.preventDefault();
	const $input = $(e.target[0]).val()
	game.petGame($input)
})

// feed pet, turn off lights, play with pet
$('.buttons').on('click', (e) => {
	const $buttonClicked = $(e.target);

	console.log($buttonClicked);
	
	// either feed, turn off the lights, or play with your pet
	if ($buttonClicked.text() === "Feed") {
		game.pet.feed();
	}
	if ($buttonClicked.text() === "Sleep") {
		game.pet.sleep()
	}
	if ($buttonClicked.text() === "Play") {
		game.pet.play()
	}

})


