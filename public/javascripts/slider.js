//Despliega primera opción
var catIndex = 1;
mostrarCat(catIndex);

// Controlador
function cambiarCat(n) {
  //let temp = catIndex + n;
  //console.log(temp);
  mostrarCat(catIndex += n);
}
//Cambia entre categorías
function mostrarCat(n) {
  var i;
  var categoria = document.getElementsByClassName("categoria");
  if (n > categoria.length) {catIndex = 1} 
  if (n < 1) {catIndex = categoria.length}
  for (i = 0; i < categoria.length; i++) {
      categoria[i].style.display = "none"; 
  }
 
  categoria[catIndex-1].style.display = "block"; 
  
}