var cards = ["Queen", "Queen", "King", "King"];
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
// Flipp over a card. When the user flips a card over, add that card to the array of cards that are in play. If the user has flipped over two cards, you'll want to check for a match.
var flipCard = function(cardId) {
	cardsInPlay.push(cards[cardId]);
	console.log("User flipped " + cards[cardId]);

};

flipCard(0);
flipCard(2);