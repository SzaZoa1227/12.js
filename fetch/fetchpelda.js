function fetching(id){
    fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    megjelenites(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function megjelenites(adatok){
    document.getElementById("id").textContent = adatok.id;
    document.getElementById("Modell").textContent = adatok.model;
    document.getElementById("Márka").textContent = adatok.brand;
    document.getElementById("Évjárat").textContent = adatok.year;
}

function kereses(){
    id = document.getElementById("userID").value
    fetching(id);
}