let tantargyakListaja = [];
let uresIdopontok = [];
let kivalasztottTantargy = null;
let hozzaadasAktiv = false;
let torlesAktiv = false;
let orarendObjektum = {};

document.addEventListener("DOMContentLoaded", () => {
    orarendBetoltese();
    tantargyakKeresese();
});

function tantargyakKeresese() {
    let osszesOracella = document.querySelectorAll(".lesson-cell");
    osszesOracella.forEach((cella) => {
        if (cella.textContent.trim() !== "") {
            cella.style.fontWeight = "bold";
            if (!tantargyakListaja.includes(cella.textContent.trim())) {
                tantargyakListaja.push(cella.textContent.trim());
            }
        }
    });
    tantargyakListaja.sort();
    console.log("Az órarendben szereplő tantárgyak:");
    tantargyakListaja.forEach((tantargy) => {
        console.log("- " + tantargy);
    });
    uresIdopontokFrissitese();
}

function uresIdopontokFrissitese() {
    uresIdopontok = [];
    let osszesOracella = document.querySelectorAll(".lesson-cell");
    osszesOracella.forEach(cella => {
        if (cella.textContent.trim() === "") {
            uresIdopontok.push(cella.id);
        }
    });
    console.log("Üres időpontok:", uresIdopontok);
}

function legorduloMenuFeltoltese(){
    const legorduloMenu = document.getElementById("dropdownMenu");
    legorduloMenu.innerHTML = "";
    
    if (tantargyakListaja.length === 0) {
        let listaElem = document.createElement("li");
        let szovegElem = document.createElement("span");
        szovegElem.className = "dropdown-item text-muted";
        szovegElem.textContent = "Nincs elérhető tantárgy";
        listaElem.appendChild(szovegElem);
        legorduloMenu.appendChild(listaElem);
        return;
    }
    
    tantargyakListaja.forEach((tantargy) => {
        let listaElem = document.createElement("li");
        let linkElem = document.createElement("a");
        linkElem.className = "dropdown-item zindex-1000";
        linkElem.href = "#";
        linkElem.textContent = tantargy;
        linkElem.onclick = (esemeny) => {
            esemeny.preventDefault();
            tantargyHozzaadasModBekapcsolasa(tantargy);
        };
        listaElem.appendChild(linkElem);
        legorduloMenu.appendChild(listaElem);
    });
}

function tantargyHozzaadasModBekapcsolasa(tantargyNeve) {
    kivalasztottTantargy = tantargyNeve;
    hozzaadasAktiv = true;
    torlesAktiv = false;
    const utmutataszoSzoveg = document.getElementById("instructionText");
    utmutataszoSzoveg.textContent = `Kattints egy üres cellára a "${tantargyNeve}" hozzáadásához, vagy kattints ide a megszakításhoz.`;
    utmutataszoSzoveg.style.cursor = "pointer";
    utmutataszoSzoveg.onclick = () => modositasModKikapcsolasa();
    uresIdopontokKiemelese();
    uresIdopontok.forEach(cellaAzonosito => {
        const cella = document.getElementById(cellaAzonosito);
        cella.onclick = () => tantargyHozzaadasaCellahoz(cellaAzonosito);
    });
}

function tantargyTorlesModBekapcsolasa() {
    torlesAktiv = true;
    hozzaadasAktiv = false;
    kivalasztottTantargy = null;
    const utmutataszoSzoveg = document.getElementById("instructionText");
    utmutataszoSzoveg.textContent = "Kattints egy tantárgyra annak törléséhez, vagy kattints ide a megszakításhoz.";
    utmutataszoSzoveg.style.cursor = "pointer";
    utmutataszoSzoveg.onclick = () => modositasModKikapcsolasa();
    foglaltIdopontokKiemelese();
    let osszesOracella = document.querySelectorAll(".lesson-cell");
    osszesOracella.forEach(cella => {
        if (cella.textContent.trim() !== "") {
            cella.classList.add("delete-highlighted", "clickable-cell");
            cella.onclick = () => tantargyTorleseCellabol(cella.id);
        }
    });
}

function uresIdopontokKiemelese() {
    document.querySelectorAll(".lesson-cell").forEach(cella => {
        cella.classList.remove("empty-highlighted", "clickable-cell", "delete-highlighted");
    });
    
    uresIdopontok.forEach(cellaAzonosito => {
        const cella = document.getElementById(cellaAzonosito);
        cella.classList.add("empty-highlighted", "clickable-cell");
    });
}

function foglaltIdopontokKiemelese() {
    document.querySelectorAll(".lesson-cell").forEach(cella => {
        cella.classList.remove("empty-highlighted", "clickable-cell", "delete-highlighted");
    });
}

function tantargyHozzaadasaCellahoz(cellaAzonosito) {
    if (!hozzaadasAktiv || !kivalasztottTantargy) return;
    
    orarendObjektum[cellaAzonosito] = {
        tantargyNev: kivalasztottTantargy,
        letrehozva: new Date().toISOString(),
        modositva: null
    };
    
    const cella = document.getElementById(cellaAzonosito);
    cella.textContent = kivalasztottTantargy;
    cella.style.fontWeight = "bold";
    
    orarendMentese();
    
    uresIdopontokFrissitese();
    
    modositasModKikapcsolasa();
    
    console.log(`${kivalasztottTantargy} hozzáadva:`, orarendObjektum[cellaAzonosito]);
}

function tantargyTorleseCellabol(cellaAzonosito) {
    if (!torlesAktiv) return;
    
    const toroltTantargy = orarendObjektum[cellaAzonosito];
    delete orarendObjektum[cellaAzonosito];
    
    const cella = document.getElementById(cellaAzonosito);
    cella.textContent = "";
    cella.style.fontWeight = "normal";
    
    orarendMentese();
    
    uresIdopontokFrissitese();
    
    modositasModKikapcsolasa();
    
    console.log(`Törölve:`, toroltTantargy);
}

function modositasModKikapcsolasa() {
    hozzaadasAktiv = false;
    torlesAktiv = false;
    kivalasztottTantargy = null;
    
    const utmutataszoSzoveg = document.getElementById("instructionText");
    utmutataszoSzoveg.textContent = "";
    utmutataszoSzoveg.onclick = null;
    
    document.querySelectorAll(".lesson-cell").forEach(cella => {
        cella.classList.remove("empty-highlighted", "clickable-cell", "delete-highlighted");
        cella.onclick = null;
    });
}

function orarendMentese() {
    localStorage.setItem("timetable", JSON.stringify(orarendObjektum));
    console.log("Órarend mentve:", orarendObjektum);
}

function orarendBetoltese() {
    const mentettAdatok = localStorage.getItem("timetable");
    if (mentettAdatok) {
        orarendObjektum = JSON.parse(mentettAdatok);
        Object.keys(orarendObjektum).forEach(cellaAzonosito => {
            const cella = document.getElementById(cellaAzonosito);
            if (cella && orarendObjektum[cellaAzonosito].tantargyNev) {
                cella.textContent = orarendObjektum[cellaAzonosito].tantargyNev;
            }
        });
        console.log("Órarend betöltve:", orarendObjektum);
    }
}

function ujTantargyHozzaadasa() {
    const beviteliMezo = document.getElementById("newClassName");
    const tantargyNeve = beviteliMezo.value.trim();
    
    if (tantargyNeve === "") {
        alert("Kérlek adj meg egy tantárgy nevet!");
        return;
    }
    
    if (tantargyakListaja.includes(tantargyNeve)) {
        alert("Ez a tantárgy már létezik!");
        return;
    }
    
    tantargyakListaja.push(tantargyNeve);
    tantargyakListaja.sort();
    beviteliMezo.value = "";
    
    console.log(`Új tantárgy hozzáadva: ${tantargyNeve}`);
    alert(`"${tantargyNeve}" tantárgy hozzáadva! Most válaszd ki a legördülő menüből és kattints egy üres cellára.`);
}
