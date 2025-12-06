let orak = [];
let lyukasorak = [];
let kivalasztottOra = null;
let hozzaadBool = false;

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    initializeTimetable();
});

function initializeTimetable() {
    let tdk = document.querySelectorAll(".lesson-cell");
    tdk.forEach((cell) => {
        if (cell.textContent.trim() !== "") {
            cell.style.fontWeight = "bold";
            if (!orak.includes(cell.textContent.trim())) {
                orak.push(cell.textContent.trim());
            }
        }
    });
    orak.sort();
    console.log("Az órarendben szereplő tantárgyak:");
    orak.forEach((ora) => {
        console.log("- " + ora);
    });
    updateEmptyPeriods();
}

function updateEmptyPeriods() {
    lyukasorak = [];
    let mindenTD = document.querySelectorAll(".lesson-cell");
    mindenTD.forEach(td => {
        if (td.textContent.trim() === "") {
            lyukasorak.push(td.id);
        }
    });
    console.log("Üres időpontok:", lyukasorak);
}

function populateDropdown(){
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.innerHTML = "";
    
    if (orak.length === 0) {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.className = "dropdown-item text-muted";
        span.textContent = "Nincs elérhető tantárgy";
        li.appendChild(span);
        dropdownMenu.appendChild(li);
        return;
    }
    
    orak.forEach((ora) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.className = "dropdown-item";
        a.href = "#";
        a.textContent = ora;
        a.onclick = (e) => {
            e.preventDefault();
            selectClassForAdding(ora);
        };
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });
}

function selectClassForAdding(className) {
    kivalasztottOra = className;
    hozzaadBool = true;
    const instructionText = document.getElementById("instructionText");
    instructionText.textContent = `Kattints egy üres cellára a "${className}" hozzáadásához, vagy kattints ide a törléshez.`;
    instructionText.style.cursor = "pointer";
    instructionText.onclick = cancelAddingMode;
    highlightEmptyCells();
    lyukasorak.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.onclick = () => addClassToCell(cellId);
    });
}

function highlightEmptyCells() {
    // Remove previous highlights
    document.querySelectorAll(".lesson-cell").forEach(cell => {
        cell.classList.remove("empty-highlighted", "clickable-cell");
    });
    
    // Highlight empty cells
    lyukasorak.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.classList.add("empty-highlighted", "clickable-cell");
    });
}

function addClassToCell(cellId) {
    if (!hozzaadBool || !kivalasztottOra) return;
    
    const cell = document.getElementById(cellId);
    cell.textContent = kivalasztottOra;
    cell.style.fontWeight = "bold";
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Update empty periods list
    updateEmptyPeriods();
    
    // Cancel adding mode
    cancelAddingMode();
    
    console.log(`${kivalasztottOra} hozzáadva: ${cellId}`);
}

function cancelAddingMode() {
    hozzaadBool = false;
    kivalasztottOra = null;
    
    // Clear instruction text
    const instructionText = document.getElementById("instructionText");
    instructionText.textContent = "";
    instructionText.onclick = null;
    
    // Remove highlights and click handlers
    document.querySelectorAll(".lesson-cell").forEach(cell => {
        cell.classList.remove("empty-highlighted", "clickable-cell");
        if (cell.textContent.trim() === "") {
            cell.onclick = null;
        }
    });
}

function addNewClass() {
    const input = document.getElementById("newClassName");
    const className = input.value.trim();
    
    if (className === "") {
        alert("Kérlek adj meg egy tantárgy nevet!");
        return;
    }
    
    if (orak.includes(className)) {
        alert("Ez a tantárgy már létezik!");
        return;
    }
    
    orak.push(className);
    orak.sort();
    input.value = "";
    
    console.log(`Új tantárgy hozzáadva: ${className}`);
    alert(`"${className}" tantárgy hozzáadva! Most válaszd ki a legördülő menüből és kattints egy üres cellára.`);
}

function saveToLocalStorage() {
    const timetableData = {};
    document.querySelectorAll(".lesson-cell").forEach(cell => {
        if (cell.textContent.trim() !== "") {
            timetableData[cell.id] = cell.textContent.trim();
        }
    });
    localStorage.setItem("timetable", JSON.stringify(timetableData));
    console.log("Órarend mentve");
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem("timetable");
    if (saved) {
        const timetableData = JSON.parse(saved);
        Object.keys(timetableData).forEach(cellId => {
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = timetableData[cellId];
            }
        });
        console.log("Órarend betöltve");
    }
}
