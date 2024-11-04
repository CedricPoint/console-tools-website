const output = document.getElementById("console-output");
const input = document.getElementById("command-input");

// URL du webhook Discord (à remplacer par votre propre URL)
const discordWebhookURL = "VOTRE WEEBHOOK";

// Commandes disponibles
const commands = {
    help: `Commandes disponibles :
    <br> - help : Affiche cette liste
    <br> - clear : Efface l'écran
    <br> - date : Affiche la date et l'heure actuelles
    <br> - whoami : Affiche l'utilisateur actuel
    <br> - password [taille] : Génère un mot de passe robuste (par défaut 12 caractères)
    <br> - upper [texte] : Convertit un texte en majuscules
    <br> - lower [texte] : Convertit un texte en minuscules
    <br> - reverse [texte] : Inverse l'ordre des caractères d'un texte
    <br> - calc [expression] : Calcule une expression mathématique simple
    <br> - quote : Affiche une citation motivante aléatoire
    <br> - convert [montant] [de] [à] : Convertit un montant USD/EUR avec un taux fixe
    <br> - uuid : Génère un identifiant unique
    <br> - encrypt [texte] : Chiffre un texte en utilisant le chiffrement ROT13
    <br> - decrypt [texte] : Déchiffre un texte chiffré avec ROT13
    <br> - contact [nom] [email] [message] : Envoie un message de contact via Discord
    <br> - datediff [date1] [date2] : Calcule le nombre de jours entre deux dates (YYYY-MM-DD)
    <br> - color : Génère une couleur aléatoire en hexadécimal avec un aperçu
    <br> - wordcount [texte] : Compte le nombre de mots et de caractères dans le texte
    <br> - sysinfo : Affiche des informations système basiques
    <br> - timer [secondes] : Lance un minuteur et avertit à la fin
    <br> - roll [nombre de faces] : Lance un dé avec le nombre de faces spécifié
    <br> - tempconvert [valeur] [C/F] : Convertit une température entre Celsius et Fahrenheit`
};

// Fonctions utilitaires pour les commandes

function generatePassword(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function sendToDiscordWebhook(name, email, message) {
    const payload = {
        content: `**Nouveau message de contact**\n**Nom**: ${name}\n**Email**: ${email}\n**Message**: ${message}`
    };
    fetch(discordWebhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        displayResponse("Message de contact envoyé via Discord.");
    })
    .catch(error => {
        displayResponse(`Erreur lors de l'envoi du message : ${error.message}. Vérifiez l'URL du webhook.`);
    });
}

function generateQuote() {
    const quotes = [
        "La meilleure façon de prédire l'avenir est de le créer.",
        "Le succès est la somme de petits efforts répétés jour après jour.",
        "N'abandonne jamais, car ce n'est jamais la fin.",
        "Les seules limites sont celles que tu te fixes.",
        "Sois le changement que tu veux voir dans le monde."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function calculateExpression(expression) {
    try { return `Résultat : ${eval(expression)}`; }
    catch { return "Erreur : expression non valide."; }
}

function convertText(text, type) {
    if (type === "upper") return text.toUpperCase();
    if (type === "lower") return text.toLowerCase();
    if (type === "reverse") return text.split("").reverse().join("");
    return "Type de conversion non reconnu.";
}

function convertCurrency(amount, from, to) {
    const rate = 0.92; 
    if (from === "USD" && to === "EUR") return `${amount} USD = ${(amount * rate).toFixed(2)} EUR`;
    if (from === "EUR" && to === "USD") return `${amount} EUR = ${(amount / rate).toFixed(2)} USD`;
    return "Conversion non reconnue ou devise incorrecte.";
}

function generateUUID() {
    return `UUID généré : ${crypto.randomUUID()}`;
}

function rot13(text) {
    return text.replace(/[a-zA-Z]/g, c => String.fromCharCode(
        c <= "Z" ? ((c.charCodeAt(0) - 65 + 13) % 26) + 65 : ((c.charCodeAt(0) - 97 + 13) % 26) + 97
    ));
}

function dateDiff(date1, date2) {
    const d1 = new Date(date1), d2 = new Date(date2);
    return isNaN(d1) || isNaN(d2) ? "Erreur : format de date incorrect (YYYY-MM-DD)"
        : `Nombre de jours entre les deux dates : ${Math.abs((d1 - d2) / (1000 * 60 * 60 * 24))} jours`;
}

function generateColor() {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    return `Couleur générée : ${color} <span style="color:${color};">■</span>`;
}

function wordCount(text) {
    const words = text.trim().split(/\s+/).length, characters = text.length;
    return `Nombre de mots : ${words}<br>Nombre de caractères : ${characters}`;
}

function sysInfo() {
    return `Informations système :
    <br> - Agent utilisateur : ${navigator.userAgent}
    <br> - Résolution d'écran : ${window.screen.width}x${window.screen.height}
    <br> - Heure locale : ${new Date().toLocaleTimeString()}`;
}

function startTimer(seconds) {
    if (isNaN(seconds) || seconds <= 0) return "Erreur : spécifiez un nombre de secondes valide.";
    setTimeout(() => displayResponse(`Le minuteur de ${seconds} secondes est écoulé !`), seconds * 1000);
    return `Minuteur de ${seconds} secondes démarré...`;
}

function rollDice(faces) {
    return isNaN(faces) || faces <= 0 ? "Erreur : spécifiez un nombre de faces valide."
        : `Résultat du lancer de dé : ${Math.floor(Math.random() * faces) + 1}`;
}

function tempConvert(value, unit) {
    return isNaN(value) ? "Erreur : spécifiez une valeur numérique valide."
        : unit.toUpperCase() === "C" ? `${value}°C = ${(value * 9/5 + 32).toFixed(2)}°F`
        : unit.toUpperCase() === "F" ? `${value}°F = ${((value - 32) * 5/9).toFixed(2)}°C`
        : "Erreur : spécifiez une unité valide (C ou F).";
}

function displayResponse(responseText) {
    const response = document.createElement("p");
    response.innerHTML = responseText;
    output.appendChild(response);
    output.scrollTop = output.scrollHeight;
}

// Fonction pour traiter les commandes utilisateur
function processCommand(commandInput) {
    const [command, ...args] = commandInput.split(" ");
    displayResponse(`<span class="prompt">guest@informaclique:~$</span> ${commandInput}`);

    let response;
    switch (command) {
        case "clear": output.innerHTML = ""; break;
        case "help": response = commands.help; break;
        case "date": response = new Date().toString(); break;
        case "whoami": response = "Utilisateur : guest@informaclique"; break;
        case "password": response = generatePassword(parseInt(args[0]) || 12); break;
        case "upper": case "lower": case "reverse": response = convertText(args.join(" "), command); break;
        case "calc": response = calculateExpression(args.join(" ")); break;
        case "quote": response = generateQuote(); break;
        case "convert": response = convertCurrency(parseFloat(args[0]), args[1], args[2]); break;
        case "uuid": response = generateUUID(); break;
        case "encrypt": response = `Texte chiffré : ${rot13(args.join(" "))}`; break;
        case "decrypt": response = `Texte déchiffré : ${rot13(args.join(" "))}`; break;
        case "contact": if (args.length >= 3) sendToDiscordWebhook(args[0], args[1], args.slice(2).join(" ")); break;
        case "datediff": response = dateDiff(args[0], args[1]); break;
        case "color": response = generateColor(); break;
        case "wordcount": response = wordCount(args.join(" ")); break;
        case "sysinfo": response = sysInfo(); break;
        case "timer": response = startTimer(parseInt(args[0])); break;
        case "roll": response = rollDice(parseInt(args[0])); break;
        case "tempconvert": response = tempConvert(parseFloat(args[0]), args[1]); break;
        default: response = "Commande non reconnue. Tapez <strong>help</strong> pour voir la liste des commandes."; break;
    }

    if (response) displayResponse(response);
}

// Écouteur pour la saisie des commandes
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        processCommand(input.value.trim());
        input.value = ""; 
    }
});




// Liste des caractères de style hacking
const chars = ["0", "1", ">", "<", "/", "|", "\\", "*", "&", "%", "#", "$", "{ }", "[ ]", "echo", "sudo", "chmod 777", "ls -la", "ping 127.0.0.1", "fetch", "curl", "netstat", "nc -lvp 4444"];

// Fonction pour créer une particule
function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.textContent = chars[Math.floor(Math.random() * chars.length)];

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.fontSize = `${10 + Math.random() * 10}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 3000); // Particule disparaît après 3 secondes
}

// Vérifie si la position de la souris est à l'intérieur de la console
function isMouseInConsole(x, y) {
    const consoleElement = document.getElementById("terminal");
    const rect = consoleElement.getBoundingClientRect();
    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );
}

// Génère des particules aléatoires sur la page au démarrage
function generateInitialParticles() {
    for (let i = 0; i < 20; i++) { // Nombre initial de particules
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        if (!isMouseInConsole(x, y)) { // Génère seulement si en dehors de la console
            createParticle(x, y);
        }
    }
}

// Ajoute une particule lors du mouvement de la souris
document.addEventListener("mousemove", (event) => {
    if (!isMouseInConsole(event.clientX, event.clientY)) { // Vérifie si la souris est en dehors de la console
        createParticle(event.clientX, event.clientY);
    }
});

// Génère les particules initiales
generateInitialParticles();

