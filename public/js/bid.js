const inputBid = document.getElementById("bid-amount");

const addAmountButton = document.getElementById("add-button");
const declineAmountButton = document.getElementById("decline-button");

addAmountButton.addEventListener("click", () => {
	inputBid.value = parseInt(inputBid.placeholder) + 100;
	inputBid.placeholder = parseInt(inputBid.placeholder) + 100;
	
	console.log(inputBid.placeholder)
});
declineAmountButton.addEventListener("click", () => {
	if (parseInt(inputBid.placeholder) - 100 <= 100) {
		inputBid.value = 100;
		inputBid.placeholder = 100;
	} else {
		inputBid.value = parseInt(inputBid.placeholder) - 100;
		inputBid.placeholder = parseInt(inputBid.placeholder) - 100;
	}
});
