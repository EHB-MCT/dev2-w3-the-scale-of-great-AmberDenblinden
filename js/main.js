import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
	//TODO: 1 Data ophalen via getAdjectives
	let data = getAdjectives();

	//TODO: 2 data parsen (omzetten)
	adjectives = JSON.parse(data);
	console.log(adjectives);

	//TODO: 3 Call render functie
	render();
	//TODO: 4 Call AddSortEvents
	addSortEvents();
}

function addSortEvents() {
	document.querySelector("#sort-up").addEventListener("click", function () {
		sortDirection = "up";
		sort();
		render();
	});

	document.querySelector("#sort-down").addEventListener("click", function () {
		sortDirection = "down";
		sort();
		render();
	});
}

function addVoteEvents() {
	const upvoteButtons = document.querySelectorAll(".upvote-button");
	const downvoteButtons = document.querySelectorAll(".downvote-button");

	upvoteButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const word = button.value;
			updateScore(word, 1);
			render();
		});
	});

	downvoteButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const word = button.value;
			updateScore(word, -1);
			render();
		});
	});
}

function sort() {
	if (sortDirection === "up") {
		adjectives.sort((a, b) => a.score - b.score);
	} else {
		adjectives.sort((a, b) => b.score - a.score);
	}
}

function render() {
	//TODO: 3.1 Create empty string variable
	let html = "";
	let status;
	//TODO: 3.2 Add HTML string for each adjective in adjectives
	adjectives.forEach(function (adjective) {
		// TODO: add html painting to string <article> ... ${...} </article>
		if (adjective.score >= 6) {
			status = "good";
		} else {
			status = "bad";
		}

		html += `<div class="word-item"> 
            <span class="word-score ${status}">${adjective.score}</span>
            <span>${adjective.word}</span>
            <div class="vote-buttons">
                <button value=${adjective.word} class="upvote-button">👍</button>
                <button value=${adjective.word} class="downvote-button">👎</button>
            </div>
        </div>`;
	});

	//TODO: 3.3 Add HTML string to #container
	document.getElementById("container").innerHTML = html;
	// of document.querySelector("#container").innerHTML = html;
	addVoteEvents();
}

function upVote(target) {}

function downVote(target) {}

function updateScore(word, scoreChange) {
	const foundIndex = adjectives.findIndex(function (item, index) {
		if (item.word == word) {
			return true;
		}
	});

	if (foundIndex != null) {
		let newScore = adjectives[foundIndex]["score"] + scoreChange;
		adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
	}
}

init();
