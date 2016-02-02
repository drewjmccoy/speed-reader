/*
Author: Drew McCoy
This is the JavaScript file to bring functionality to the Speed Reader website.
*/

(function() {
	"use strict";

	var timer = null;
	var words;
	var delay;

	// Sets up the event handlers
	window.onload = function() {
		document.getElementById("start").onclick = start;
		document.getElementById("stop").onclick = stop;
		document.getElementById("medium").onclick = changeSize;
		document.getElementById("big").onclick = changeSize;
		document.getElementById("bigger").onclick = changeSize;
		document.getElementById("speed").onchange = changeSpeed;
	};

	// Starts the animation in the display
	function start() {
		toggleButtons();
		words = document.getElementById("text").value.split(/[ \t\n]+/);
		words.reverse();
		resetDelay();
		timer = setInterval(setDisplay, delay);
	}

	// Returns the correct delay, as specified by the option element
	function resetDelay() {
		var options = document.getElementById("speed");
		delay = options[options.selectedIndex].value;
	}

	// Sets the display to show the next word
	function setDisplay() {
		if (words.length == 0) {
			stop();
		} else {
			var word = words.pop();
			if (word.charAt(word.length - 1) == "," || word.charAt(word.length - 1) == "." ||
				word.charAt(word.length - 1) == "!" || word.charAt(word.length - 1) == "?" ||
				word.charAt(word.length - 1) == ";" || word.charAt(word.length - 1) == ":") {
				word = word.substring(0, word.length - 1) + " ";
				words.push(word);
			}
			document.getElementById("display").innerHTML = word;
		}
	}

	// Stops the display animation
	function stop() {
		toggleButtons();
		clearInterval(timer);
		timer = null;
		document.getElementById("display").innerHTML = "";
	}

	// Toggles the Start and Stop buttons to be disabled or enabled
	function toggleButtons() {
		var startButton = document.getElementById("start");
		var stopButton = document.getElementById("stop");
		if (stopButton.disabled) {
			startButton.disabled = true;
			startButton.className = "disabled";
			stopButton.disabled = false;
			stopButton.className = "";
		} else {
			startButton.disabled = false;
			startButton.className = "";
			stopButton.disabled = true;
			stopButton.className = "disabled";
		}
	}

	// Changes the size of the font in the display
	function changeSize() {
		document.getElementById("display").style.fontSize = this.value;
	}

	// Changes the speed of the animation
	function changeSpeed() {
		if (timer !== null) {
			clearInterval(timer);
			resetDelay();
			timer = setInterval(setDisplay, delay);
		}
	}
}) ();