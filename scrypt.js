// Variables globales
let championsList = [];
let selectedChampion = null;
let languageEn = 'en_US';
let languageEs = 'es_ES';
let parche = '14.2.1';

// Lista de campeones permitidos
const allowedChampions = [
    "Diana",
    "Kha'Zix",
    "LeeSin",
    "Yi",
    "Nocturne",
    "Warwick",
    "Amumu",
    "Vi"
];

// Cargar la lista de campeones desde la API
async function loadChampions() {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${parche}/data/${languageEs}/champion.json`);
    const data = await response.json();
    championsList = Object.values(data.data);
    console.log("Campeones cargados:", championsList);
}

// Seleccionar un campeón aleatorio de la lista permitida
function selectRandomChampion() {
    do {
        const randomIndex = Math.floor(Math.random() * championsList.length);
        selectedChampion = championsList[randomIndex];
    } while (!allowedChampions.includes(selectedChampion.id));

    displayChampion();
    updatePlaceholders();
    resetResults();
}

// Mostrar la imagen del campeón seleccionado
function displayChampion() {
    const championImage = document.getElementById("champion-image");
    championImage.src = `https://ddragon.leagueoflegends.com/cdn/${parche}/img/champion/${selectedChampion.id}.png`;
    championImage.style.display = "block";
}

// Actualizar placeholders con las respuestas correctas
function updatePlaceholders() {
     // Deja el valor del placeholder como estaba (solo el nombre del campo)
     setPlaceholder("guess-champion-name", "Nombre del campeón");
     setPlaceholder("guess-champion-title", "Título del campeón");
 
     // Estadísticas base
     setPlaceholder("guess-hp", "Salud base");
     setPlaceholder("guess-mp", "Maná base");
     setPlaceholder("guess-movespeed", "Velocidad de movimiento");
     setPlaceholder("guess-armor", "Armadura");
     setPlaceholder("guess-spellblock", "Bloqueo de hechizos");
     setPlaceholder("guess-attackrange", "Rango de ataque");
     setPlaceholder("guess-hpregen", "Regeneración de salud");
     setPlaceholder("guess-mpregen", "Regeneración de maná");
     setPlaceholder("guess-crit", "Probabilidad de crítico");
     setPlaceholder("guess-attackdamage", "Daño de ataque");
     setPlaceholder("guess-attackspeed", "Velocidad de ataque");
 
     // Estadísticas de escalado
     setPlaceholder("guess-hpperlevel", "Salud por nivel");
     setPlaceholder("guess-mpperlevel", "Maná por nivel");
     setPlaceholder("guess-armorperlevel", "Armadura por nivel");
     setPlaceholder("guess-spellblockperlevel", "Bloqueo de hechizos por nivel");
     setPlaceholder("guess-attackdamageperlevel", "Daño de ataque por nivel");
     setPlaceholder("guess-attackspeedperlevel", "Velocidad de ataque por nivel");
}

// Asignar un placeholder a un input
function setPlaceholder(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.placeholder = value;
    }
}

// Comprobar la respuesta del usuario para un campo específico
function checkAnswer(inputId, fieldPath, resultId) {
    const userInput = document.getElementById(inputId).value.trim();
    const correctValue = getValueFromPath(selectedChampion, fieldPath);
    const resultElement = document.getElementById(resultId);

    if (userInput.toLowerCase() === correctValue.toString().toLowerCase()) {
        resultElement.textContent = "¡Correcto!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `Incorrecto. Respuesta correcta: ${correctValue}`;
        resultElement.style.color = "red";
    }
    setTimeout(() => {
        resultElement.textContent = "";
    }, 2000);
}

// Obtener un valor de un objeto usando un "path" (campo anidado)
function getValueFromPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Reiniciar resultados
function resetResults() {
    const resultElements = document.querySelectorAll("div[id$='result']");
    resultElements.forEach((element) => (element.textContent = ""));
}

// Inicializar eventos de botones
function initializeEvents() {
    document.getElementById("random-champion").addEventListener("click", selectRandomChampion);

    // Botones de comprobación
    document.getElementById("check-name").addEventListener("click", () =>
        checkAnswer("guess-champion-name", "name", "name-result")
    );
    document.getElementById("check-title").addEventListener("click", () =>
        checkAnswer("guess-champion-title", "title", "title-result")
    );
    document.getElementById("check-hp").addEventListener("click", () =>
        checkAnswer("guess-hp", "stats.hp", "base-stats-result")
    );
    document.getElementById("check-mp").addEventListener("click", () =>
        checkAnswer("guess-mp", "stats.mp", "base-stats-result")
    );
    document.getElementById("check-movespeed").addEventListener("click", () =>
        checkAnswer("guess-movespeed", "stats.movespeed", "base-stats-result")
    );
    document.getElementById("check-armor").addEventListener("click", () =>
        checkAnswer("guess-armor", "stats.armor", "base-stats-result")
    );
    document.getElementById("check-spellblock").addEventListener("click", () =>
        checkAnswer("guess-spellblock", "stats.spellblock", "base-stats-result")
    );
    document.getElementById("check-attackrange").addEventListener("click", () =>
        checkAnswer("guess-attackrange", "stats.attackrange", "base-stats-result")
    );
    document.getElementById("check-hpregen").addEventListener("click", () =>
        checkAnswer("guess-hpregen", "stats.hpregen", "base-stats-result")
    );
    document.getElementById("check-mpregen").addEventListener("click", () =>
        checkAnswer("guess-mpregen", "stats.mpregen", "base-stats-result")
    );
    document.getElementById("check-crit").addEventListener("click", () =>
        checkAnswer("guess-crit", "stats.crit", "base-stats-result")
    );
    document.getElementById("check-attackdamage").addEventListener("click", () =>
        checkAnswer("guess-attackdamage", "stats.attackdamage", "base-stats-result")
    );
    document.getElementById("check-attackspeed").addEventListener("click", () =>
        checkAnswer("guess-attackspeed", "stats.attackspeed", "base-stats-result")
    );

    // Eventos para estadísticas de escalado
    document.getElementById("check-hpperlevel").addEventListener("click", () =>
        checkAnswer("guess-hpperlevel", "stats.hpperlevel", "scaling-stats-result")
    );
    document.getElementById("check-mpperlevel").addEventListener("click", () =>
        checkAnswer("guess-mpperlevel", "stats.mpperlevel", "scaling-stats-result")
    );
    document.getElementById("check-armorperlevel").addEventListener("click", () =>
        checkAnswer("guess-armorperlevel", "stats.armorperlevel", "scaling-stats-result")
    );
    document.getElementById("check-spellblockperlevel").addEventListener("click", () =>
        checkAnswer("guess-spellblockperlevel", "stats.spellblockperlevel", "scaling-stats-result")
    );
    document.getElementById("check-attackdamageperlevel").addEventListener("click", () =>
        checkAnswer("guess-attackdamageperlevel", "stats.attackdamageperlevel", "scaling-stats-result")
    );
    document.getElementById("check-attackspeedperlevel").addEventListener("click", () =>
        checkAnswer("guess-attackspeedperlevel", "stats.attackspeedperlevel", "scaling-stats-result")
    );

    // Agregar evento de "Enter" para cada campo de entrada
    addEnterKeyEvent("guess-champion-name", "name", "name-result");
    addEnterKeyEvent("guess-champion-title", "title", "title-result");
    addEnterKeyEvent("guess-hp", "stats.hp", "base-stats-result");
    addEnterKeyEvent("guess-mp", "stats.mp", "base-stats-result");
    addEnterKeyEvent("guess-movespeed", "stats.movespeed", "base-stats-result");
    addEnterKeyEvent("guess-armor", "stats.armor", "base-stats-result");
    addEnterKeyEvent("guess-spellblock", "stats.spellblock", "base-stats-result");
    addEnterKeyEvent("guess-attackrange", "stats.attackrange", "base-stats-result");
    addEnterKeyEvent("guess-hpregen", "stats.hpregen", "base-stats-result");
    addEnterKeyEvent("guess-mpregen", "stats.mpregen", "base-stats-result");
    addEnterKeyEvent("guess-crit", "stats.crit", "base-stats-result");
    addEnterKeyEvent("guess-attackdamage", "stats.attackdamage", "base-stats-result");
    addEnterKeyEvent("guess-attackspeed", "stats.attackspeed", "base-stats-result");

    // Agregar eventos de "Enter" para estadísticas de escalado
    addEnterKeyEvent("guess-hpperlevel", "stats.hpperlevel", "scaling-stats-result");
    addEnterKeyEvent("guess-mpperlevel", "stats.mpperlevel", "scaling-stats-result");
    addEnterKeyEvent("guess-armorperlevel", "stats.armorperlevel", "scaling-stats-result");
    addEnterKeyEvent("guess-spellblockperlevel", "stats.spellblockperlevel", "scaling-stats-result");
    addEnterKeyEvent("guess-attackdamageperlevel", "stats.attackdamageperlevel", "scaling-stats-result");
    addEnterKeyEvent("guess-attackspeedperlevel", "stats.attackspeedperlevel", "scaling-stats-result");
}

// Función para manejar la tecla "Enter"
function addEnterKeyEvent(inputId, fieldPath, resultId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                checkAnswer(inputId, fieldPath, resultId);
            }
        });
    }
}

// Inicialización
loadChampions();
initializeEvents();
