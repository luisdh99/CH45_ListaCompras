const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false
    }
    if(Number(txtNumber.value)<=0){
        return false;
    }
    return true;
}//validarcantidad


btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    txtNombre.style.border="";
    txtNombre.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

 //validar nombre del producto
    if(txtNombre.value.length<3){
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML="El nombre no es correcto";
        alertValidaciones.style.display="block";
        //return false;
        
    }
    //validar la cantidad
    if (! validarCantidad()){
        txtNumber.style.border="solid red medium";
        alertValidacionesTexto.innerHTML+="La cantidad no es correcta";
        alertValidaciones.style.display="block";
    }//!validar cantidad

});//btnagregar.   addeventlistener
//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
})