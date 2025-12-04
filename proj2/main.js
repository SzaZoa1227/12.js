document.addEventListener("DOMContentLoaded", function() {
    let tds = document.querySelectorAll(".lesson-cell");
    let classes = [];
    tds.forEach(function(cell) {
        if (cell.textContent.trim() !== "") {
            cell.style.backgroundColor = "#ff5e5eff"; // világos zöld háttér
            cell.style.fontWeight = "bold"; // félkövér betű
            if (!classes.includes(cell.textContent)) {
                classes.push(cell.textContent);
            }
        }
    });
    classes.sort();
    console.log("Az órarendben szereplő tantárgyak:");
    classes.forEach(function(ora) {
        console.log("- " + ora);
    });
});