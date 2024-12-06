document.addEventListener("DOMContentLoaded", () => {
	var test = 0;

	function numeroRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	window.addEventListener("reload", () => {
		test = numeroRandom(1, 2);
		if (test == 1) {
			location.href = "404 Error.html";
		} else {
			location.href = "chiant.html";
		}
	});
});
