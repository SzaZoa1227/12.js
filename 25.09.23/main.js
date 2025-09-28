import input from "./input.js";

let txt = "";
while (txt.length < 20) {
  txt = await input("Kérek egy szöveget:\t");
  if (txt.length < 20) console.log("Legalább 20 karakter legyen!\n\n");
}
function elsoF(txt) {
  return txt.slice(0, 5);
}
function masodF(txt) {
  return txt.slice(2, 8);
}
function harmadF(txt) {
  return txt.slice(4, txt.length);
}
function negyedikF(txt) {
  return txt.substr(4, 6);
}
function otodikF(txt) {
  txt.toUpperCase();
}
function hatodikF(txt) {
  let out = "";
  for (let i = 0; i < txt.length; i++) {
    if (i % 2) {
      hatodikF += txt.charAt(i);
    } else {
      hatodikF += txt.charAt(i).toUpperCase();
    }
  }
  return out;
}
function hetedikF(txt){
    return txt.replaceAll("e", "E");
}
function nyolcadikF(txt){
    return txt.split("e");
}
console.log(elsoF(txt));
console.log(masodF(txt));
console.log(harmadF(txt));
console.log(negyedikF(txt));
console.log(otodikF(txt));
console.log(hatodikF(txt));
console.log(hetedikF(txt));
console.log(nyolcadikF(txt));

