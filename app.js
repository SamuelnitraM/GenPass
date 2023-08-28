// Fonction pour générer un mot de passe aléatoire
function generatePassword(lenght) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";

    for (let i = 0; i < lenght; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
}

function calculateCrackTime(password) {
    // Formules simplifiées pour l'estimation du temps de craquage
    const combinations = Math.pow(72, password.length); // 72 caractères possibles (lettres, chiffres, caractères spéciaux)
    const guessesPerSecond = 1e9; // Supposons 1 milliard de tentatives par seconde
    
    const seconds = combinations / guessesPerSecond;
    const timeFormats = [
        { value: 60, unit: 'secondes' },
        { value: 60, unit: 'minutes' },
        { value: 24, unit: 'heures' },
        { value: 365, unit: 'jours' },
        { value: 12, unit: 'mois' },
        { value: 1000, unit: 'années' }
    ];
    
    let time = seconds;
    let unit = 'secondes';
    
    for (const format of timeFormats) {
        if (time < format.value) {
            break;
        }
        time /= format.value;
        unit = format.unit;
    }

    // Afficher "plus de 1000 ans" si la durée estimée dépasse 1000 ans
    if (unit === 'années' && time >= 1000) {
        return 'Plus de 1000 ans';
    }
    
    return `${Math.round(time)} ${unit}`;
}

// Fonction appelée lors du clic sur le bouton "Générer"
document.getElementById("generate").addEventListener("click", function() {
    const passwordLength = document.getElementById("length").value;
    const errorMessage = document.getElementById("error-message");

    // Récupérer les valeurs min et max de l'input
    const minLength = parseInt(document.getElementById("length").getAttribute("min"));
    const maxLength = parseInt(document.getElementById("length").getAttribute("max"));
    
    // Vérifier si la longueur est valide
    if (passwordLength < minLength || passwordLength > maxLength) {
        errorMessage.textContent = `La longueur doit être entre ${minLength} et ${maxLength}.`;
        return; // Sortir de la fonction si la longueur n'est pas valide
    }
    
    errorMessage.textContent = ""; // Réinitialiser le message d'erreur

    const password = generatePassword(passwordLength);
    document.getElementById("password").textContent = password;

    const crackTime = calculateCrackTime(password);
    document.getElementById("crack-time").textContent = `Temps de craquage estimé : ${crackTime}`;
});