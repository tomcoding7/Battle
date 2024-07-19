let tochmon1Health = 100;
let tochmon2Health = 100;
let currentTurn = 'tochmon1'; // Keeps track of whose turn it is

function attack() {
    let damage;
    if (currentTurn === 'tochmon1') {
        // Tochmon 1 attacks Tochmon 2
        damage = Math.floor(Math.random() * 10) + 1; // Random damage between 1 and 10
        tochmon2Health -= damage;
        tochmon2Health = Math.max(tochmon2Health, 0); // Prevent negative health
        document.getElementById('tochmon2Health').innerText = `Health: ${tochmon2Health}`;
        currentTurn = 'tochmon2'; // Switch to Tochmon 2's turn
        document.getElementById('turnStatus').innerText = "Tochmon 2's turn";
    } else {
        // Tochmon 2 attacks Tochmon 1
        damage = Math.floor(Math.random() * 10) + 1; // Random damage between 1 and 10
        tochmon1Health -= damage;
        tochmon1Health = Math.max(tochmon1Health, 0); // Prevent negative health
        document.getElementById('tochmon1Health').innerText = `Health: ${tochmon1Health}`;
        currentTurn = 'tochmon1'; // Switch to Tochmon 1's turn
        document.getElementById('turnStatus').innerText = "Tochmon 1's turn";
    }

    // Check for winner
    if (tochmon1Health <= 0) {
        alert('Tochmon 2 wins!');
        resetGame();
    } else if (tochmon2Health <= 0) {
        alert('Tochmon 1 wins!');
        resetGame();
    }
}

function resetGame() {
    tochmon1Health = 100;
    tochmon2Health = 100;
    document.getElementById('tochmon1Health').innerText = `Health: ${tochmon1Health}`;
    document.getElementById('tochmon2Health').innerText = `Health: ${tochmon2Health}`;
    currentTurn = 'tochmon1'; // Reset to Tochmon 1's turn
    document.getElementById('turnStatus').innerText = "Tochmon 1's turn";
}
