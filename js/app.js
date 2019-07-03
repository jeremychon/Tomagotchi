console.log('hey');

class Tamagotchi {
	constructor (name) {
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.sleepiness = 0;
	}

	attrOverTime () {
		if (game.time % 5 === 0 && game.time !== 0) {
			this.age += 1;
			$('#petAge').text(`Age: ${this.age}`)
			console.log(this.age);
		}
	}

	// displayPetInfo (name) {
	// 	game.clearInputField()

	// 	$('#petName').text(`Name: ${this.name}`) 
	// 	$('#petAge').text(`Age: ${this.age}`)
	// 	$('#time').text(`Time: 0`)
	// 	$('#petHunger').text(`Hunger: ${this.hunger}`)
	// 	$('#petSleep').text(`Sleepiness: ${this.sleepiness}`)
	// 	$('#petPlay').text(`Boredom: ${this.boredom}`)
	// }
}


const game = {

	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	pet: [],

	createPet (name) {
		const tamagotchi = new Tamagotchi(name);
		console.log(tamagotchi);
		
		this.clearInputField()

		$('#petName').text(`Name: ${tamagotchi.name}`) 
		$('#petAge').text(`Age: ${tamagotchi.age}`)
		$('#time').text(`Time: 0`)
		$('#petHunger').text(`Hunger: ${tamagotchi.hunger}`)
		$('#petSleep').text(`Sleepiness: ${tamagotchi.sleepiness}`)
		$('#petPlay').text(`Boredom: ${tamagotchi.boredom}`)

		this.pet.push(tamagotchi)
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
			this.pet[0].hunger -= 3
			$('#petHunger').text(`Hunger: ${this.pet[0].hunger}`)

		// if 'Lights' button is pressed, sleepiness will go down by 2
		} else if (button.text() === "Lights") {
			console.log('Time to go to sleep!');
			this.pet[0].sleepiness -= 2
			$('#petSleep').text(`Sleepiness: ${this.pet[0].sleepiness}`)

		// if 'Play' button is pressed, boredom will go down by 3
		} else if (button.text() === "Play") {
			console.log(`Let's go play!`);
			this.pet[0].boredom -= 3
			$('#petPlay').text(`Boredom: ${this.pet[0].boredom}`)
		}
	},

	setTimer () {
		const timer = setInterval( () => {
			// increase timer -- shows hours, minutes, and seconds
			this.time.seconds++;

			if (this.time.seconds === 60) {
				this.time.minutes++
				this.time.seconds = 0;
			}

			if (this.time.minutes === 60) {
				this.time.hours++
			}

			$('#time').text(`Time: ${this.time.hours}h ${this.time.minutes}m ${this.time.seconds}s`)

			// increases age every certain amount of seconds
			if (this.time.seconds % 5 === 0) {
				this.pet[0].age++
				$('#petAge').text(`Age: ${this.pet[0].age}`)
			}
			// set hunger schedule
			if (this.time.seconds % 3 === 0) {
				this.pet[0].hunger++
				$('#petHunger').text(`Hunger: ${this.pet[0].hunger}`)	
			}

			// set sleepiness schedule
			if (this.time.seconds % 2 === 0) {
				this.pet[0].sleepiness++
				$('#petSleep').text(`Sleepiness: ${this.pet[0].sleepiness}`)	
			}

			// set boredom schedule
			if (this.time.seconds % 4 === 0) {
				this.pet[0].boredom++
				$('#petPlay').text(`Boredom: ${this.pet[0].boredom}`)	
			}
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
	game.createPet($input)
	game.setTimer();
})

// feed pet, turn off lights, play with pet
$('.buttons').on('click', (e) => {
	const $buttonClicked = $(e.target);

	game.useButtons($buttonClicked);
	


})


