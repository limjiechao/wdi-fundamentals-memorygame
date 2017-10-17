// This holds the four cards at the beginning of every game.
var deck = [
	{
		rank: "Queen",
		suit: "Hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "Queen",
		suit: "Diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "King",
		suit: "Hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "King",
		suit: "Diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

// This will hold the shuffled cards.
var dealtCards = [];

// This will return dealt cards in `cards `to `deck` and empties `dealtCards` array.
var returnCardsToDeck = function() {
	deck = dealtCards;
	dealtCards = [];
};

// This will remove a random card from `deck` and push it into `cards`.
var shuffleCards = function() {
	var randomNumber;
	while (deck.length !== 0) {
		randomNumber = Math.floor(Math.random() * (deck.length));
		dealtCards.push(deck[randomNumber]);
		deck.splice(randomNumber, 1);
	};
};

// Holds all the cards that the user has flipped over.
var cardsInPlay = [];

// Clear all four cards dealt out in the prior round from the parent node.
var clearBoard = function () {
	var oldBoard = document.getElementById("game-board");
	while (oldBoard.hasChildNodes()) {
		oldBoard.removeChild(oldBoard.firstChild);
	};
};

// Display, update, and reset the score and rounds played.
var score = {
	score: 0,
	rounds: 0,
	// Display the score
	display: function() {
		var scoreBoard = document.getElementById("score-board");
		scoreBoard.textContent = score.score + " / " + score.rounds;
	},
	// If cards match, add 1 to both `score` and `rounds`. Otherwise, just add 1 to `rounds`.
	update: function(cardsMatch) {
		if (cardsMatch === true) {
			score.rounds += 1;
			score.score += 1;
		} else {
			score.rounds += 1;
		};
	},
	// Reset score and rounds
	reset: function() {
		score.rounds = 0;
		score.score = 0;
	}
}

// Reset the score and start a new game.
var resetGame = function() {
	console.clear();
	console.log("Game has been reset");
	score.reset();
	score.display();
	cardsInPlay = [];
	clearBoard();
	returnCardsToDeck();
	startGame();
};

// Check if the two flipped cards match each other. Provide feedback to the user letting them know if the two cards match, or if they should try again.
var checkForMatch = function() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
			score.update(true);
			score.display();
			alert("You found a match!");
		} else {
			score.update(false);
			score.display();
			alert("Sorry, try again!");
		};
		cardsInPlay = [];
		clearBoard();
		returnCardsToDeck();
		startGame();
	};
}

// Flip over a card. When the user flips a card over, add that card to the array `cardsInPlay`. If the user has flipped over two cards, check for a match.
var flipCard = function() {
	var cardId = this.getAttribute("data-id");
	// If the second card the user flipped is the same as the first, it will not be added to the array of cards in play. User will be prompted to choose a different card.
	if (cardsInPlay.length === 1) {
		if (dealtCards[cardId] === cardsInPlay[0]) {
			console.log("User attempted to flip the same card")
			alert("Choose a different card!");
		} else {
			// If user did not choose the card again, the newly chosen card will be added to the the array `cardsInPlay`.
			console.log("Second card flipped")
			console.log(dealtCards[cardId].suit);
			console.log(dealtCards[cardId].cardImage);
			console.log("User flipped " + dealtCards[cardId].rank);
			cardsInPlay.push(dealtCards[cardId]);
			this.setAttribute("src", dealtCards[cardId].cardImage);
			setTimeout(checkForMatch, 250);
		};
	} else {
		// If this is the first card the user flipped, it will be added to the array `cardsInPlay` through this flow.
		console.log("First card flipped")
		console.log(dealtCards[cardId].suit);
		console.log(dealtCards[cardId].cardImage);
		console.log("User flipped " + dealtCards[cardId].rank);
		cardsInPlay.push(dealtCards[cardId]);
		this.setAttribute("src", dealtCards[cardId].cardImage);
		setTimeout(checkForMatch, 250);
	};
};

// Deal four covered cards. Listen for user clicking a card. When a card is clicked, flip over to display the card.
var populateBoard = function() {
	for (var i = 0; i < dealtCards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	};
	// Activates the reset button.
	var resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", resetGame);
};

// Overall function to start the game.
var startGame = function() {
	console.log("Cards in deck: ");
	console.log(deck);
	shuffleCards();
	console.log("Cards dealt: ");
	console.log(dealtCards);
	populateBoard();
}

startGame();
