function restGet() {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarTablaCabana(respuesta)
        },
        error: function (xhr, status){
            console.log("Error en el metodo restGet()");
        }
    });
}

function restGetId(id) {
    $.ajax({
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin/" + id,
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
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
        url: "https://g36a5fe994dcdbb-ctjvt6qti7t6gdht.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
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

function llenarTablaCabana(respuesta){
    $("#tabla_cabana").empty();
    for (i = 0; i < respuesta.items.length; i++) {
        let tabla;
        tabla += "<tr>";
        tabla += "<td id ="  + respuesta.items[i].id + "><a  href = \"#\" onclick=\"restGetId(";
        tabla += respuesta.items[i].id + ")\">" + respuesta.items[i].brand + "</a></td>";
        tabla += "</tr>";
        $("#tabla_cabana").append(tabla);
    }
} 

function llenarTablaDetalle(respuesta) {  
    console.log("llenar tabla detalle...");
    console.log(respuesta);
    let detalle;
    detalle = "<table id='tabla_detalle'>";
    detalle += "<tr><th>ID:</th><th>Tipo de cabaña:</th><th>Habitaciones:</th><th>Categoria:</th><th>Nombre:</th></tr>";
    detalle += "<tr>";
    detalle += "<td id = \"id_tabla_detalle\">" + respuesta.items[0].id + "</td>";
    detalle += "<td> <div contenteditable id = \"brand_tabla_detalle\">" + respuesta.items[0].brand + "</div> </td>";
    detalle += "<td> <div contenteditable id = \"rooms_tabla_detalle\">" + respuesta.items[0].rooms + "</div> </td>";
    detalle += "<td> <div contenteditable id = \"category_id_tabla_detalle\">" + respuesta.items[0].category_id + "</div> </td>";
    detalle += "<td> <div contenteditable id = \"name_tabla_detalle\">" + respuesta.items[0].name + "</div> </td>";
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
    var brand = $("#field_brand").val();
    var rooms = $("#field_rooms").val();
    var category_id = $("#field_category_id").val();
    var name = $("#field_name").val();

    document.getElementById('field_id').value = "";
    document.getElementById('field_brand').value = "";
    document.getElementById('field_rooms').value = "";
    document.getElementById('field_category_id').value = "";
    document.getElementById('field_name').value = "";
    if(!!document.getElementById(id)){return};

    let datos = {
        id: id,
        brand: brand,
        rooms: rooms,
        category_id: category_id,
        name: name
    }

    let nuevaFila = "<tr><td id ="  + id + "><a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + brand + "</a></td></tr>";
    $("#tabla_cabana").append(nuevaFila);
    restPost(datos);
    $("#field_id").empty();
    $("#field_brand").empty();
    $("#field_rooms").empty();
    $("#field_category_id").empty();
    $("#field_name").empty();
}

function funcionBotonActualizar() {
    var id = document.getElementById("id_tabla_detalle").textContent;
    var brand = document.getElementById("brand_tabla_detalle").textContent;
    var rooms = document.getElementById("rooms_tabla_detalle").textContent;
    var category_id = document.getElementById("category_id_tabla_detalle").textContent;
    var name = document.getElementById("name_tabla_detalle").textContent;

    let datos = {
        brand: brand,
        rooms: rooms,
        category_id: category_id,
        name: name,
        id: id
    }
    restPut(datos)
    $("#" + id).empty();
    $("#" + id).append("<a  href = \"#\" onclick=\"restGetId(" + id + ")\">" + brand + "</a>");
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
