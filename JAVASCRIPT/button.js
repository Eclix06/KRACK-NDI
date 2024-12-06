document.addEventListener("DOMContentLoaded", () => {
	var fuit = document.getElementById("fuit");
	var space = document.getElementById("space");
	fuit.addEventListener("mouseover", () => {
		fuit.style.position = "absolute";

		fuit.style.left =
			Math.random() * window.innerWidth - fuit.offsetWidth + "px";
		fuit.style.top =
			Math.random() * window.innerHeight - fuit.offsetHeight + "px";
	});
});
