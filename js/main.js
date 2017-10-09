var cards = [
	{
		rank: "Queen",
		suit: "Hearts",
		cardImage: "/images/queen-of-hearts.png"
	},
	{
		rank: "Queen",
		suit: "Diamonds",
		cardImage: "/images/queen-of-diamonds.png"
	},
	{
		rank: "King",
		suit: "Hearts",
		cardImage: "/images/king-of-hearts.png"
	},
	{
		rank: "King",
		suit: "Diamonds",
		cardImage: "/images/king-of-diamonds.png"
	}
];
var cardsInPlay = [];
// Check if the two flipped cards match each other. Provide feedback to the user letting them know if the two cards match, or if they should try again.
var checkForMatch = function() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("You found a match!");
		} else {
			alert("Sorry, try again.");
		};
	};
}
// Flip over a card. When the user flips a card over, add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
var flipCard = function(cardId) {
	cardsInPlay.push(cards[cardId]);
	console.log(cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	console.log("User flipped " + cards[cardId].rank);
	checkForMatch();
};

flipCard(0);
flipCard(2);