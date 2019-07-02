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
	createPet (name) {
		this.clearInputField();

		// give the pet a name
		const tamagotchi = new Tamagotchi(name);
		console.log(tamagotchi);

		$('#name').append(tamagotchi.name)


	},

	clearInputField() {
		$('#inputName').val('')
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




// listeners
// listens to the form to add the name of the pet
$('#addName').on('submit', (e) => {
	e.preventDefault();
	const $input = $(e.target[0]).val()
	game.createPet($input)
})

// feed pet, turn off lights, play with pet
