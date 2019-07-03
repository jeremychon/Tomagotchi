console.log('hey');

class Tamagotchi {
	constructor (name) {
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.boredom = 0;
		this.sleepiness = 0;
	}
}


const game = {

	timer: 0,

	createPet () {
		// shows the pet's info in the bottom of the display
		this.displayPetInfo(name);


	},

	clearInputField () {
		$('#inputName').remove();
	},

	chooseDisplayColor () {
		// let user choose color of display when picking name
	},

	displayPetInfo (name) {
		this.clearInputField()

		const tamagotchi = new Tamagotchi(name);
		console.log(tamagotchi);

		$('#petNameAndAge').text(`Name: ${tamagotchi.name} Age: ${tamagotchi.age}`)
		$('#petInfo').text(`Hunger: ${tamagotchi.hunger} Sleepiness: ${tamagotchi.sleepiness} Boredom: ${tamagotchi.boredom}`)
	},

	useButtons (button) {
		if (button.text() === "Feed") {
			console.log('Thanks for the food!');
		} else if (button.text() === "Lights") {
			console.log('Time to go to sleep!');
		} else if (button.text() === "Play") {
			console.log(`Let's go play!`);
		}
	}
}

// game object will run the game

// create a tomagotchi pet to play with

	// picture of tomagotchi will appear (hopefully moving)
	// tomagotchi will have a name, age, 
		// hunger, boredom, and sleepiness

// pet's age will increase over time
	// pet will change appearance over time
// pet's hunger boredom and sleepiness will increase over time
// pet dies if any of these 3 become 10
// 




// LISTENERS

// listens to the form to add the name of the pet
$('#addName').on('submit', (e) => {
	e.preventDefault();
	const $input = $(e.target[0]).val()
	game.displayPetInfo($input)
})

// feed pet, turn off lights, play with pet
$('.buttons').on('click', (e) => {
	const $buttonClicked = $(e.target);

	game.useButtons($buttonClicked);


})


