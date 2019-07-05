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

	feed () {
		this.hunger -= 1
		game.printStats()
	}

	sleep () {
		this.sleepiness -= 3
		game.printStats()
	}

	play () {
		this.boredom -= 2
		game.printStats()
	}

	getHungry () {
		this.hunger += 2
	}

	getSleepy () {
		this.sleepiness += 3
	}

	getBored () {
		this.boredom += 2
	}

	getOlder () {
		this.age += 1
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

 	petDies () {
		if (this.pet.isAlive === true) {
			console.log(`${this.pet.name} is alive!`);
		} else {
			console.log(`${this.pet.name} is dead!`);
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

			if (this.time.seconds % 5 === 0) {
				this.pet.getOlder()
			}

			if (this.time.seconds % 1 === 0) {
				this.pet.getHungry()
			}

			if (this.time.seconds % 2 === 0) {
				this.pet.getSleepy()
			}

			if (this.time.seconds % 3 === 0) {
				this.pet.getBored()
			}

			this.printStats()
			this.isDead();
			this.petDies();

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
	if ($buttonClicked.text() === "Lights") {
		game.pet.sleep()
	}
	if ($buttonClicked.text() === "Play") {
		game.pet.play()
	}

})


