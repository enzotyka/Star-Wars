let allCharacters = [];
let currentPage = 1;
const charactersPerPage = 10;

window.onload = async () => {
    try {
        await loadCharacters();
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar personagens.');
    }

    setupButtons();
    setupHomeButton();
};

async function loadCharacters() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {
        const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
        allCharacters = await response.json();
        renderCharacters();
    } catch (error) {
        console.error('Erro ao carregar personagens:', error);
        alert('Erro ao carregar os personagens.');
    }
}

function renderCharacters() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const charactersToShow = allCharacters.slice(startIndex, endIndex);

    charactersToShow.forEach((character) => {
        const card = document.createElement("div");
        card.style.backgroundImage = `url('${character.image}')`;
        card.className = "cards";

        const characterNameBG = document.createElement("div");
        characterNameBG.className = "character-name-bg";

        const characterName = document.createElement("span");
        characterName.className = "character-name";
        characterName.innerText = `${character.name}`;

        characterNameBG.appendChild(characterName);
        card.appendChild(characterNameBG);

        card.onclick = () => {
            showModal(character);
        };

        mainContent.appendChild(card);
    });

    updateButtons();
}

function setupButtons() {
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
}

function updateButtons() {
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');

    backButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * charactersPerPage >= allCharacters.length;

    backButton.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
    nextButton.style.visibility = currentPage * charactersPerPage >= allCharacters.length ? 'hidden' : 'visible';
}

function loadNextPage() {
    if (currentPage * charactersPerPage < allCharacters.length) {
        currentPage++;
        renderCharacters();
    }
}

function loadPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderCharacters();
    }
}

function setupHomeButton() {
    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function showModal(character) {
    const modal = document.getElementById("modal");
    modal.style.visibility = "visible";

    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = '';

    const characterImage = document.createElement("div");
    characterImage.style.backgroundImage = `url('${character.image}')`;
    characterImage.className = "character-image";

    const name = document.createElement("span");
    name.className = "character-details";
    name.innerText = `Nome: ${character.name}`;

    const height = document.createElement("span");
    height.className = "character-details";
    height.innerText = `Altura: ${character.height || 'desconhecida'}`;

    const mass = document.createElement("span");
    mass.className = "character-details";
    mass.innerText = `Peso: ${character.mass || 'desconhecido'}`;

    const eyeColor = document.createElement("span");
    eyeColor.className = "character-details";
    eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eyeColor || 'unknown')}`;

    const birthYear = document.createElement("span");
    birthYear.className = "character-details";
    birthYear.innerText = `Nascimento: ${character.birthYear || 'desconhecido'}`;

    modalContent.appendChild(characterImage);
    modalContent.appendChild(name);
    modalContent.appendChild(height);
    modalContent.appendChild(mass);
    modalContent.appendChild(eyeColor);
    modalContent.appendChild(birthYear);
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };
    return cores[eyeColor.toLowerCase()] || eyeColor;
}