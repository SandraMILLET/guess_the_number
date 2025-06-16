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
const progressBar = document.getElementById("progressBar");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
let tryCount = 0;
const maxVisualTries = 20;

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
  progressBar.style.width = "0%";
  guessInput.focus();
}
function updateStats(currentTries) {
  let games = Number(localStorage.getItem('games') || 0);
  let totalTries = Number(localStorage.getItem('totalTries') || 0);
  let bestScore = Number(localStorage.getItem('bestScore') || 0);

  games += 1;
  totalTries += currentTries;
  if (bestScore === 0 || currentTries < bestScore) {
    bestScore = currentTries;
  }

  localStorage.setItem('games', games);
  localStorage.setItem('totalTries', totalTries);
  localStorage.setItem('bestScore', bestScore);

  const avg = (totalTries / games).toFixed(1);
  document.getElementById('gamesPlayed').textContent = `Parties jouées : ${games}`;
  document.getElementById('averageAttempts').textContent = `Moyenne de tentatives : ${avg}`;
  document.getElementById('bestScore').textContent = `Meilleur score : ${bestScore} tentative(s)`;
}

function showStatsOnLoad() {
  const games = localStorage.getItem('games');
  if (games) {
    updateStats(0); // pour forcer l'affichage même sans victoire
  }
}

function launchConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  } else {
    console.warn("Confetti non chargé !");
  }
}

function makeGuess() {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    result.textContent = "❌ Entrez un nombre entre 1 et 100.";
    result.className = "error";
    return;
  }

  tryCount++;
  const percentage = Math.min((tryCount / maxVisualTries) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  if (userGuess === numberToGuess) {
    result.textContent = `🎉 Bravo ! Le nombre était ${numberToGuess}.`;
    result.className = "success";
    guessButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = "inline-block";
    launchConfetti();
updateStats(tryCount);

  } else {
    result.textContent = userGuess < numberToGuess ? "🔼 Trop petit !" : "🔽 Trop grand !";
    result.className = "error";
  }

  attempts.textContent = `Essais : ${tryCount}`;
  guessInput.focus();
  guessInput.select();
}

guessButton.addEventListener("click", makeGuess);
resetButton.addEventListener("click", resetGame);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    makeGuess();
  }
});
window.addEventListener("load", () => {
  guessInput.focus();
});
showStatsOnLoad();

