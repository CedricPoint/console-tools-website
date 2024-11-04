# Console Tools Project

Une interface en ligne de commande (CLI) dans le navigateur, offrant un ensemble d'outils interactifs et personnalisés. Ce projet permet d'accéder à divers outils directement depuis une console, sans besoin de pages supplémentaires. Idéal pour un usage rapide et efficace.

## Démo

Vous pouvez explorer et utiliser les fonctionnalités de cette console sur [tools.informaclique.fr](https://tools.informaclique.fr).

---

## Fonctionnalités

### Outils Disponibles

Cette console offre une gamme de commandes, chacune avec des fonctionnalités uniques :

- **help** : Affiche la liste des commandes disponibles.
- **clear** : Efface l'écran de la console.
- **date** : Affiche la date et l'heure actuelles.
- **whoami** : Affiche l'utilisateur actuel.
- **password [taille]** : Génère un mot de passe robuste de la longueur spécifiée (par défaut 12 caractères).
- **upper [texte]** : Convertit un texte en majuscules.
- **lower [texte]** : Convertit un texte en minuscules.
- **reverse [texte]** : Inverse l'ordre des caractères d'un texte.
- **calc [expression]** : Calcule une expression mathématique simple (ex. `calc 5 + 3 * 2`).
- **quote** : Affiche une citation motivante aléatoire.
- **convert [montant] [de] [à]** : Convertit un montant entre USD et EUR avec un taux fixe.
- **uuid** : Génère un identifiant unique (UUID).
- **encrypt [texte]** / **decrypt [texte]** : Chiffre ou déchiffre un texte en utilisant le chiffrement ROT13.
- **contact [nom] [email] [message]** : Envoie un message de contact via un webhook Discord.
- **datediff [date1] [date2]** : Calcule le nombre de jours entre deux dates (format `YYYY-MM-DD`).
- **color** : Génère une couleur aléatoire en hexadécimal avec un aperçu.
- **wordcount [texte]** : Compte le nombre de mots et de caractères dans un texte.
- **sysinfo** : Affiche des informations système basiques (agent utilisateur, résolution de l'écran, heure locale).
- **timer [secondes]** : Lance un minuteur pour le nombre de secondes spécifié.
- **roll [nombre de faces]** : Lance un dé avec le nombre de faces spécifié.
- **tempconvert [valeur] [C/F]** : Convertit une température entre Celsius et Fahrenheit.

---

## Installation

Pour cloner et exécuter ce projet localement, suivez les étapes ci-dessous :

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/votre_nom_d_utilisateur/console-tools.git
    ```
   
2. Accédez au dossier du projet :
    ```bash
    cd console-tools
    ```

3. Ouvrez le fichier `index.html` dans votre navigateur pour démarrer la console.

---

## Utilisation

Tapez les commandes dans le champ de saisie pour accéder aux outils et fonctionnalités. Utilisez `help` pour voir toutes les commandes disponibles et leur utilisation.

### Exemples

- **Générer un mot de passe robuste** : `password 16`
- **Convertir du texte en majuscules** : `upper hello world`
- **Calculer une expression** : `calc 8 * (5 + 3)`
- **Afficher des informations système** : `sysinfo`
- **Lancer un dé à 6 faces** : `roll 6`

---

## Technologies Utilisées

- **JavaScript** : Pour la logique de la console et les fonctions des outils.
- **HTML/CSS** : Pour l’interface utilisateur et le style de la console.
- **Fetch API** : Utilisé pour envoyer des messages de contact vers un webhook Discord.

---

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des suggestions, ouvrez une issue ou faites un pull request. 

---

## Auteur

Développé par Cédric Frank - [Informaclique](https://informaclique.fr).

---

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE]([LICENSE](https://github.com/CedricPoint/console-tools-website/blob/main/LICENCE)) pour plus de détails.
