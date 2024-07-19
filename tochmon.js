// Pokémon class to represent a Pokémon
class Pokemon {
    constructor(name, health, attack, defense, speed, moves) {
        this.name = name;
        this.maxHealth = health;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.moves = moves;
        this.isFainted = false;
    }

    // Method to perform an attack on another Pokémon
    attackOpponent(move, opponent) {
        if (this.isFainted) return { damage: 0, isCritical: false }; // Cannot attack if fainted

        // Determine if the attack is a critical hit
        const isCritical = Math.random() < 0.1; // 10% chance for a critical hit
        const criticalMultiplier = isCritical ? 1.5 : 1.0; // Critical hits deal 50% more damage

        const movePower = move.power;
        const damage = Math.max(0, ((this.attack / opponent.defense) * movePower) * criticalMultiplier);

        opponent.health -= damage;
        if (opponent.health <= 0) {
            opponent.health = 0;
            opponent.isFainted = true;
        }

        return { damage, isCritical };
    }

    // Reset Pokémon to full health
    reset() {
        this.health = this.maxHealth;
        this.isFainted = false;
    }
}

// Move class to represent a move
class Move {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
}

// Example moves
const tackle = new Move("Tackle", 50);
const scratch = new Move("Scratch", 40);

// Example Pokémon
const tochmon1 = new Pokemon("Tochmon 1", 100, 55, 40, 60, [tackle, scratch]);
const tochmon2 = new Pokemon("Tochmon 2", 100, 60, 45, 50, [tackle, scratch]);

let currentAttacker = tochmon1;
let currentDefender = tochmon2;

// Function to determine which Pokémon attacks first based on speed
function determineTurnOrder() {
    if (tochmon1.speed > tochmon2.speed) {
        currentAttacker = tochmon1;
        currentDefender = tochmon2;
    } else {
        currentAttacker = tochmon2;
        currentDefender = tochmon1;
    }
}

// Update the HTML with the results
function updateStatus(damage, isCritical) {
    document.getElementById('pokemon1-health').textContent = `Health: ${tochmon1.health.toFixed(2)}`;
    document.getElementById('pokemon2-health').textContent = `Health: ${tochmon2.health.toFixed(2)}`;

    if (tochmon1.isFainted) {
        document.getElementById('status').textContent = `${tochmon1.name} has fainted! ${tochmon2.name} wins!`;
    } else if (tochmon2.isFainted) {
        document.getElementById('status').textContent = `${tochmon2.name} has fainted! ${tochmon1.name} wins!`;
    } else {
        const criticalText = isCritical ? " (A Critical Hit!)" : "";
        document.getElementById('status').textContent = `${currentAttacker.name} attacks! ${currentDefender.name} loses ${damage.toFixed(2)} HP${criticalText}. ${currentAttacker.name}'s turn.`;
    }
}

// Battle function
function battle() {
    if (currentAttacker.isFainted || currentDefender.isFainted) {
        document.getElementById('status').textContent = `${currentDefender.name} has fainted! ${currentAttacker.name} wins!`;
        return;
    }

    const move = currentAttacker.moves[0]; // Choose the first move for simplicity
    const { damage, isCritical } = currentAttacker.attackOpponent(move, currentDefender);

    // Update the HTML with the results
    updateStatus(damage, isCritical);

    // Switch turns
    if (currentDefender.isFainted) {
        updateStatus(damage, isCritical);
        return;
    }

    [currentAttacker, currentDefender] = [currentDefender, currentAttacker];
}

// Set up the button click event
document.getElementById('attack-btn').addEventListener('click', () => {
    battle();
});
