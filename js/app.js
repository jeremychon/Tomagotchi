console.log('hey');

class Tamagotchi {
	constructor (name) {
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.sleepiness = 0;
	}

	createPet (name) {
		
		game.clearInputField()

		$('#petName').text(`Name: ${this.name}`) 
		$('#petAge').text(`Age: ${this.age}`)
		$('#time').text(`Time: 0`)
		$('#petHunger').text(`Hunger: ${this.hunger}`)
		$('#petSleep').text(`Sleepiness: ${this.sleepiness}`)
		$('#petPlay').text(`Boredom: ${this.boredom}`)
	}

}


const game = {

	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	pet: null,
	isAlive: false,

	petGame (name) {
		const tamagotchi = new Tamagotchi(name);
		console.log(tamagotchi);

		tamagotchi.createPet(name);

		this.pet = tamagotchi
		this.isAlive = true; 

		this.setTimer();
	},

	isDead () {
		if(this.pet.hunger >= 10 || this.pet.boredom >= 10 || this.pet.sleepiness >= 10) {
			this.isAlive = false
		}
	},

 	petDies () {
		if (this.isAlive === true) {
			console.log(`${this.pet.name} is alive!`);
		} else {
			console.log(`${this.pet.name} is dead!`);
		}
	},

	clearInputField () {
		$('#inputName').remove();
		$('span').remove();
	},

	chooseDisplayColor () {
		// let user choose color of display when picking name
	},

	useButtons (button) {
		// if 'Feed' button is pressed, hunger will go down by 3
		if (button.text() === "Feed") {
			console.log('Thanks for the food!');
			this.pet.hunger -= 3
			$('#petHunger').text(`Hunger: ${this.pet.hunger}`)

		// if 'Lights' button is pressed, sleepiness will go down by 2
		} else if (button.text() === "Lights") {
			console.log('Time to go to sleep!');
			this.pet.sleepiness -= 2
			$('#petSleep').text(`Sleepiness: ${this.pet.sleepiness}`)

		// if 'Play' button is pressed, boredom will go down by 3
		} else if (button.text() === "Play") {
			console.log(`Let's go play!`);
			this.pet.boredom -= 3
			$('#petPlay').text(`Boredom: ${this.pet[0].boredom}`)
		}
	},

	setTimer () {
		const timer = setInterval( () => {
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

			// increases age every certain amount of seconds
			if (this.time.seconds % 5 === 0) {
				this.pet.age++
				$('#petAge').text(`Age: ${this.pet.age}`)
			}
			// increase hunger level over time
			if (this.time.seconds % 3 === 0) {
				this.pet.hunger++
				$('#petHunger').text(`Hunger: ${this.pet.hunger}`)	
			}

			// increase sleepiness level over time
			if (this.time.seconds % 1 === 0) {
				this.pet.sleepiness++
				console.log(this.pet.sleepiness);
				$('#petSleep').text(`Sleepiness: ${this.pet.sleepiness}`)	
			}

			// increase boredom level over time
			if (this.time.seconds % 4 === 0) {
				this.pet.boredom++
				$('#petPlay').text(`Boredom: ${this.pet.boredom}`)	
			}

			this.isDead();
			this.petDies();

		}, 1000)
	}
}

// game object will run the game

// create a tomagotchi pet to play with

	// picture of tomagotchi will appear (hopefully moving)

// pet's age will increase over time
	// pet will change appearance over time
// pet's hunger boredom and sleepiness will increase over time
// pet dies if any of these 3 become 10




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

	game.useButtons($buttonClicked);
	


})


