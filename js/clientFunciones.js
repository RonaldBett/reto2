function restGet() {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarTablaCliente(respuesta)
        },
        error: function (xhr, status){
            console.log("Error en el metodo restGet()");
        }
    });
}

function restGetId(id) {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client/" + id,
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarTablaDetalle(respuesta);
        },
        error: function (xhr, status){
            console.log("Error en el metodo restGetId()");
        }
    });
}

function restPost(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        data: datospeticion,
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("datos enviados");
        },
        error: function (xhr, status){
            console.log("Error en el metodo restPost()");
        }
    });
}

function restPut(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        data: datospeticion,
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("datos enviados");
        },
        error: function (xhr, status){
            console.log("Error en el metodo restPut()");
        }
    });
}

function restDelete(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        data: datospeticion,
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("Elemento eliminado");
        },
        error: function (xhr, status){
            console.log("Error en el metodo restPut()");
        }
    });
}

function llenarTablaCliente(respuesta){
    $("#tabla_cliente").empty();
    for (i = 0; i < respuesta.items.length; i++) {
        let tabla;
        tabla += "<tr>";
        tabla += "<td id ="  + respuesta.items[i].id + "><a  href = \"#\" onclick=\"restGetId(";
        tabla += respuesta.items[i].id + ")\">" + respuesta.items[i].name + "</a></td>";
        tabla += "</tr>";
        $("#tabla_cliente").append(tabla);
    }
} 

function llenarTablaDetalle(respuesta) {  
    console.log("llenar tabla detalle...");
    console.log(respuesta);
    let detalle;
    detalle = "<table id='tabla_detalle'>";
    detalle += "<tr><th> ID: </th><th> Nombre: </th><th> Email: </th><th> Edad: </th></tr>";
    detalle += "<tr>";
    detalle += "<td id = \"id_tabla_detalle\">" + respuesta.items[0].id + "</td>";
    detalle += "<td> <div contenteditable id = \"name_tabla_detalle\">" + respuesta.items[0].name + "</div> </td>";
    detalle += "<td> <div contenteditable id = \"email_tabla_detalle\">" + respuesta.items[0].email + "</div> </td>";
    detalle += "<td> <div contenteditable id = \"age_tabla_detalle\">" + respuesta.items[0].age + "</div> </td>";
    detalle += "</tr>";
    detalle += "</table>";
    $("#div_tabla_detalle").empty();
    $("#div_tabla_detalle").append(detalle);
    $("#div_tabla_detalle").append("<button id = 'botonActualizar' onclick='funcionBotonActualizar()'>Actualizar</button>");
    $("#div_tabla_detalle").append("<button id = 'botonEliminar' onclick='funcionBotonEliminar()'>Eliminar</button>");
    $("#div_tabla_detalle").append("<button id = 'botonCerrar' onclick='funcionBotonCerrar()'>Cerrar</button>");
}

function funcionBotonAgregar() {
    var id = $("#field_id").val();
    var name = $("#field_name").val();
    var email = $("#field_email").val();
    var age = $("#field_age").val();

    if(validarAgregar(id, name)){
        alert("Debe ingresar 'id' y 'nombre'")
        return
    };

    if(!!document.getElementById(id)){
        alert("Ya existe un elemento con ese id")
        return
    };

    document.getElementById('field_id').value = "";
    document.getElementById('field_name').value = "";
    document.getElementById('field_email').value = "";
    document.getElementById('field_age').value = "";

    let datos = {
        id: id,
        name: name,
        email: email,
        age: age
    }

    let nuevaFila = "<tr><td id ="  + id + "><a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + name + "</a></td></tr>";
    $("#tabla_cliente").append(nuevaFila);
    restPost(datos);
    $("#field_id").empty();
    $("#field_name").empty();
    $("#field_email").empty();
    $("#field_age").empty();
}

function funcionBotonActualizar() {
    var id = document.getElementById("id_tabla_detalle").textContent;
    var name = document.getElementById("name_tabla_detalle").textContent;
    var email = document.getElementById("email_tabla_detalle").textContent;
    var age = document.getElementById("age_tabla_detalle").textContent;

    if(email == "null"){email = ""}
    if(age == "null"){age = ""}

    if(name == ""){
        alert("El campo 'Nombre' no puede estar vacío")
        return
    }

    let datos = {
        name: name,
        email: email,
        age: age,
        id: id
    }
    restPut(datos)
    $("#" + id).empty();
    $("#" + id).append("<a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + name + "</a>");
    
}

function funcionBotonEliminar() {
    var id = document.getElementById("id_tabla_detalle").textContent;
    let datos = {
        id: id
    }
    restDelete(datos)
    $("#" + id).remove();
    $("#div_tabla_detalle").empty();
}

function funcionBotonCerrar() {
    $("#div_tabla_detalle").empty();
}

function validarAgregar(a,b){
    if(a == "" || b == ""){
        return true;
    }
    return false
}