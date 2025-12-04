function toCamelCase(str){
  if (str === "") return "";


  
  let splitChar = "";
  for (let i = 0; i < str.length;i++){
    let c = str[i];
      if(c === "_"){
        splitChar = c;
        }
      else if(c === "-"){
        splitChar = c;
        }
  }
  console.log(splitChar);
  if (splitChar = "") return str;
  
  
  
  let out = "";
  let strSplit = str.split(splitChar);
  console.log(strSplit);
  for(let i = 0; i < strSplit.length; i++){
    if(strSplit[i].at(0) === strSplit[i].at(0).toUpperCase()){
      out += strSplit[i];
      console.log(strSplit[i]);
    }
    else if(i > 0){
      let temp = "";
      temp += strSplit[i].at(0).toUpperCase();
      temp += strSplit[i].substring(1,strSplit[i].length);
    }
  }
  return out
}
console.log(toCamelCase("the_sthealth_warrior"))