document.addEventListener("DOMContentLoaded", () => {
	var chiant = document.getElementById("chiant_input");
	var text = "";
	var test = 0;
	chiant.addEventListener("mouseout", () => {
		chiant.value = "";
	});

	function numeroRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	chiant.addEventListener("keydown", (e) => {
		if (e.key == " ") {
			for (let i = 0; i < numeroRandom(1, 5000); i++) {
				chiant.value += " ";
				// deselectionner l'input
			}
		} else if (e.key == "Enter") {
			test = numeroRandom(1, 3);
			if (test == 1) {
				location.href = "404 Error.html";
			} else {
				alert(
					"Merci de ne pas utiliser la touche entrer tant que vous n'avez pas bien mis les prérequis"
				);
				setTimeout(() => {
					location.reload();
				}, 100);
			}
		} else if (e.key == "Backspace") {
			text = chiant.value;
			chiant.value = text.slice(0, text.length - numeroRandom(1, 20));
		}
	});
});
