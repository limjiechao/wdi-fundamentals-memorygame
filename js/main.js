// Hold all four cards dealt and their relevant information.
var cards = [
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

var resetGame = function() {
	score = 0;
	displayScore();
	cardsInPlay = [];
	clearBoard();
	populateBoard();	
}

// Holds all the cards that the user has flipped over.
var cardsInPlay = [];

// Clear all the cards that user has flipped over. Clear all four cards dealt out in the prior round from the parent node.
var clearBoard = function () {
	var oldBoard = document.getElementById("game-board");
	while (oldBoard.hasChildNodes()) {
		oldBoard.removeChild(oldBoard.firstChild);
	};
};

var score = 0;

// Display the score
var displayScore = function() {
	var scoreBoard = document.getElementById("score-board");
	scoreBoard.textContent = score;
}

// Check if the two flipped cards match each other. Provide feedback to the user letting them know if the two cards match, or if they should try again.
var checkForMatch = function() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
			alert("You found a match!");
			score += 1;
			displayScore();
		} else {
			alert("Sorry, try again!");
		};
		cardsInPlay = [];
		clearBoard();
		populateBoard();
	};
}

// Flip over a card. When the user flips a card over, add that card to the array of cards that are in play. If the user has flipped over two cards, check for a match.
var flipCard = function() {
	var cardId = this.getAttribute("data-id");
	cardsInPlay.push(cards[cardId]);
	console.log(cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	console.log("User flipped " + cards[cardId].rank);
	this.setAttribute("src", cards[cardId].cardImage);
	setTimeout(checkForMatch, 1250);
};

// Deal four covered cards. Listen for user clicking a card. When a card is clicked, flip over to display the card.
var populateBoard = function() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	};
	var resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", resetGame);
};

populateBoard();