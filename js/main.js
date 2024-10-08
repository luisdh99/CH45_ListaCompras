const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
const tablalistacompras = document.getElementById("tablalistacompras");
const cuerpoTabla = tablalistacompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal")
const precioTotal = document.getElementById("precioTotal")





// bandera, al ser true permite agregar los datos a la tabla
let isValid = true;
let contador =0;
let precio=0;
let costoTotal=0;
let totalEnProductos=0;

let datos =new Array(); 

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if(Number(txtNumber.value)<=0){
        return false;
    }
    return true;
}//validarcantidad


function getPrecio(){
 return Math.round((Math.random()*10000))/100;
}






btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    txtNombre.style.border="";
    txtNombre.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    isValid =  true;

 //validar nombre del producto
    if(txtNombre.value.length<3){
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML="El nombre no es correcto";
        alertValidaciones.style.display="block";
        isValid = false;
        //return false;
        
    }
    //validar la cantidad
    if (! validarCantidad()){
        txtNumber.style.border="solid red medium";
        alertValidacionesTexto.innerHTML+="La cantidad no es correcta";
        alertValidaciones.style.display="block";
        isValid = false;
    }//!validar cantidad

    if(isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                       <td>${contador}</td>
                       <td>${txtNombre.value}</td>
                       <td>${txtNumber.value}</td>
                       <td>${precio}</td>
        
        </tr>`;

        let elemento ={"contador": contador,
                        "nombre": txtNombre.value,
                        "cantidad":txtNumber.value,
                        "precio":precio};

        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));



        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText =totalEnProductos;
        precioTotal.innerText="$" + costoTotal;
        precioTotal.innerText="$" +costoTotal.toFixed(2);

        localStorage.setItem("contador", contador );
        localStorage.setItem("totalenProductos", totalEnProductos );
        localStorage.setItem("costoTotal", costoTotal );


        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }


});//btnagregar.   addeventlistener
btnClear.addEventListener("click",function(event){
    event.preventDefault();
    //limpiar el valor de los campos
    txtNombre.value="";
    txtNombre.value="";
    //limpiar localStorage
    //elimina por cad allave un soloelemento
    //localStorage.removeItem("contador");
    //localStorage.removeItem("costoTotal");

    
    localStorage.clear();

    //limpiar tabla
    cuerpoTabla.innerHTML="";



    //reiniciar las variables, contador
    contador=0;
    costoTotal=0;
    totalEnProductos=0;
    //asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText =totalEnProductos;
    precioTotal.innerText="$" +costoTotal.toFixed(2);
    //ocultar la alterna
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    //quitar los bordes
    txtNombre.style.border="";
    txtNombre.style.border="";

});


//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
})

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
})




window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador")!=null){
        contador = Number(this.localStorage.getItem("contador"));
    }
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    if(this.localStorage.getItem("costoTotal")!=null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }
    contadorProductos.innerText = contador;
        productosTotal.innerText =totalEnProductos;
        precioTotal.innerText="$" +costoTotal.toFixed(2);

    if (this.localStorage.getItem("datos") !=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    datos.forEach(r => {
        let row = `<tr>
                        <td>${r.contador}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                        </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
});
