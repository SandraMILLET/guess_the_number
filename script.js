/*logique
1. L'utilisateur doit deviner un nombre entre 1 et 100.
2. Si le nombre est inférieur, afficher "C'est plus !"
3. Si le nombre est supérieur, afficher "C'est moins !"
4. Si le nombre est correct, afficher "Bravo !"
5. Ne pas limiter les essaies, l'utilisateur peut continuer à deviner jusqu'à trouver le bon nombre.
6. Afficher le nombre de tentatives effectuées.
// 7. Afficher le nombre à deviner dans la console pour le débogage.
// 8. Ajouter un bouton pour réinitialiser le jeu.
*/
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const result = document.getElementById("result");
const attempts = document.getElementById("attempts");
const resetButton = document.getElementById("resetButton");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
let tryCount = 0;

function resetGame() {
  numberToGuess = Math.floor(Math.random() * 100) + 1;
  tryCount = 0;
  result.textContent = "";
  result.className = "";
  attempts.textContent = "";
  guessInput.value = "";
  resetButton.style.display = "none";
  guessButton.disabled = false;
  guessInput.disabled = false;
  guessInput.focus();
}

guessButton.addEventListener("click", () => {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    result.textContent = "Veuillez entrer un nombre entre 1 et 100.";
    result.className = "error";
    return;
  }

  tryCount++;
  if (userGuess === numberToGuess) {
    result.textContent = `🎉 Bravo ! Le nombre était ${numberToGuess}.`;
    result.className = "success";
    guessButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = "inline-block";
  } else {
    result.textContent = userGuess < numberToGuess ? "🔼 Trop petit !" : "🔽 Trop grand !";
    result.className = "error";
  }

  attempts.textContent = `Essais : ${tryCount}`;
  guessInput.focus();
  guessInput.select();
});

resetButton.addEventListener("click", resetGame);

window.addEventListener("load", () => {
  guessInput.focus();
});

