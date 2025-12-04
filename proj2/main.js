let classes = [];
let periodsWithoutLessons = [];
document.addEventListener("DOMContentLoaded", function() {
    let tds = document.querySelectorAll(".lesson-cell");
    tds.forEach(function(cell) {
        if (cell.textContent.trim() !== "") {
            cell.style.backgroundColor = "#ff5e5eff"; 
            cell.style.fontWeight = "bold";
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
    let allPeriods = document.querySelectorAll(".lesson-cell");
    allPeriods.forEach(cell => {
        if (cell.textContent.trim() === "") {
            periodsWithoutLessons.push(cell.id);
        }
    })
});

