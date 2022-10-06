function restGet() {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarTablaMensaje(respuesta)
        },
        error: function (xhr, status){
            console.log("Error en el metodo restGet()");
        }
    });
}

function restGetId(id) {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message/" + id,
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
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

function llenarTablaMensaje(respuesta){
    $("#tabla_mensaje").empty();
    for (i = 0; i < respuesta.items.length; i++) {
        let tabla;
        tabla += "<tr>";
        tabla += "<td id ="  + respuesta.items[i].id + "><a  href = \"#\" onclick=\"restGetId(";
        tabla += respuesta.items[i].id + ")\">" + respuesta.items[i].messagetext + "</a></td>";
        tabla += "</tr>";
        $("#tabla_mensaje").append(tabla);
    }
} 

function llenarTablaDetalle(respuesta) {  
    console.log("llenar tabla detalle...");
    console.log(respuesta);
    let detalle;
    detalle = "<table id='tabla_detalle'>";
    detalle += "<tr><th> ID: </th><th> Mensaje: </th></tr>";
    detalle += "<tr>";
    detalle += "<td id = \"id_tabla_detalle\">" + respuesta.items[0].id + "</td>";
    detalle += "<td> <div contenteditable id = \"mensaje_tabla_detalle\">" + respuesta.items[0].messagetext + "</div> </td>";
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
    var messagetext= $("#field_mensaje").val();

    document.getElementById('field_id').value = "";
    document.getElementById('field_mensaje').value = "";
    if(!!document.getElementById(id)){return};

    let datos = {
        id: id,
        messagetext: messagetext
    }

    let nuevaFila = "<tr><td id ="  + id + "><a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + messagetext + "</a></td></tr>";
    $("#tabla_mensaje").append(nuevaFila);
    restPost(datos);
    $("#field_id").empty();
    $("#field_mensaje").empty();
}

function funcionBotonActualizar() {
    var id = document.getElementById("id_tabla_detalle").textContent;
    var messagetext = document.getElementById("mensaje_tabla_detalle").textContent;

    let datos = {
        messagetext: messagetext,
        id: id
    }

    restPut(datos)
    $("#" + id).empty();
    $("#" + id).append("<a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + messagetext + "</a>");
    
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