
/**
 * Obtener datos Tabla CABAÑA
 */
function getDatos(){
    
    $.ajax({    
        url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin',
        type : 'GET',
        dataType : 'json',      
        error : function(xhr, status) {
            alert('ha sucedido un problema, '+xhr.status);
        },
        complete : function(xhr, status) {
            console.log('Datos Obtenidos correctamente code: '+xhr.status);
        },
        success : function(json) {
            $("#resultadoCabin").empty();
            tabla = "<center><table border='1'><tr><th>ID<th>MARCA<th>HABITACIONES<th>CATEGORIA<th>NOMBRE"
            filas = ""
            for(i = 0;  i < json.items.length; i++){
               filas += "<tr>"
               filas +="<td>"+json.items[i].id  
               filas +="<td>"+json.items[i].brand
               filas +="<td>"+json.items[i].rooms
               filas +="<td>"+json.items[i].category_id
               filas +="<td>"+json.items[i].name   
            }
            $("#resultadoCabin").append(tabla + filas+"</center>")
            console.log(json)
        }
    });   
}

 /**
 * Guardar datos Tabla CABAÑA
 */
function guardar(){
    
    if($("#id").val() =="" || $("#brand").val() =="" || $("#rooms").val() =="" || $("#category_id").val() == "" || $("#name").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin',
            data : { 
                id: $("#id").val(),
                brand: $("#brand").val(),
                rooms: $("#rooms").val(),
                category_id: $("#category_id").val(),
                name: $("#name").val() },
            type : 'POST',
            dataType: 'json',
            success : function(json, textStatus, xhr) {
            },
            error : function(xhr, status) {         
            },
            complete : function(xhr, status) {
            console.log('Datos guardados Correctamente, codigo: '+xhr.status);
            alert('Datos guardados Correctamente');
            limpiarCamposCabin();
            getDatos()
            }
        });
    } 
}

/**
 * Actualizar datos Tabla CABAÑA
 */
function actualizar(){

    if($("#id").val() =="" || $("#brand").val() == "" || $("#rooms").val() =="" || $("#category_id").val() == "" || $("#name").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            id:$("#id").val(),
            brand:$("#brand").val(),
            rooms:$("#rooms").val(),
            category_id:$("#category_id").val(),
            name:$("#name").val(),
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
               // $("#resultado").empty();
                $("#id").val("");
                $("#brand").val("");
                $("#rooms").val("");
                $("#category_id").val("");
                $("#name").val("");
                console.log('codigo: '+xhr.status);
                alert('Datos Actualizados Correctamente');
                limpiarCamposCabin();
                getDatos()
            }
        });
    }  
}

/**
 * Eliminar por ID Tabla CABAÑA
 */
function eliminar(){
    let idElemento = document.getElementById("id").value;
    if(validarId(idElemento)){
        alert("Debe ingresar el ID que desea borrar");
    }else{
        let myData={
            id:idElemento
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                alert('Elemento borrado Correctamente');
                limpiarCamposCabin();
                getDatos()
            }
        }); 
    }             
}

/**
 * Buscar por ID Tabla CABAÑA
 */
function buscarPorId(){
    let idElemento = document.getElementById("id").value;
    if(idElemento == ""){
        alert("Debe ingresar un ID para realizar ese tipo de busqueda");
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin/'+idElemento,
            dataType : 'json',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                tabla = "<center><table border='1'>"
                filas =""
                if(json.items.length > 0){
                    console.log(json)
                    $("#resultadoCabin").empty();
                    filas +="<tr><th> ID:<td>"+json.items[0].id  
                    filas +="<tr><th>MARCA:<td>"+json.items[0].brand
                    filas +="<tr><th>HABITACIONES:<td>"+json.items[0].rooms
                    filas +="<tr><th>CATEGORIA:<td>"+json.items[0].category_id
                    filas +="<tr><th>NOMBRE:<td>"+json.items[0].name
                    
                    $("#resultadoCabin").append(tabla + filas+"</center>")  
                    alert("Elemento encontrado satisfactoriamente")
                }
                else{
                    alert("Elemento con Id: "+idElemento+", no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                console.log('Petición realizada codigo: '+xhr.status);
                limpiarCamposCabin();
            }
        });
    }       
}

/**
 * Traer la tabla cliente
 */
function getDatosCliente(){
    $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type : 'GET',
            dataType : 'json',      
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            complete : function(xhr, status) {
                console.log('Datos Obtenidos correctamente code: '+xhr.status);
            },
            success : function(json) {
                $("#resultadoCliente").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>EMAIL<th>EDAD"
                filas = ""
                for(i = 0;  i < json.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+json.items[i].id  
                   filas +="<td>"+json.items[i].name
                   filas +="<td>"+json.items[i].email
                   filas +="<td>"+json.items[i].age                 
                }
                $("#resultadoCliente").append(tabla + filas+"</center>")
                console.log(json);
                limpiarCamposCliente();
            }
        });
}

/**
 * Guardar datos Tabla cliente
 */
function guardarCliente(){

    if($("#idCliente").val() =="" || $("#nameCliente").val() || $("#emailCliente").val() =="" || $("#ageCliente").val() == "" ){
        alert("Todos los campos son obligatorios")
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            data : { 
                id: $("#idCliente").val(),
                name: $("#nameCliente").val(),
                email: $("#emailCliente").val(),
                age: $("#ageCliente").val()},
                type : 'POST',
                dataType: 'json',
            success : function(json, textStatus, xhr) {
            },
            error : function(xhr, status) {         
            },
            complete : function(xhr, status) {
            console.log('Petición realizada '+xhr.status);
            console.log('Datos guardados Correctamente, codigo: '+xhr.status);
            alert('Datos guardados Correctamente');
            limpiarCamposCliente();
            getDatosCliente();
            }
        });
    } 
}

/**
 * Actualizar datos Tabla cliente
 */
function actualizarCliente(){
    if($("#idCliente").val() =="" || $("#nameCliente").val() || $("#emailCliente").val() =="" || $("#ageCliente").val() == "" ){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            id:$("#idCliente").val(),
            name:$("#nameCliente").val(),
            email:$("#emailCliente").val(),
            age:$("#ageCliente").val(),
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#idCliente").val("");
                $("#nameCliente").val("");
                $("#emailCliente").val("");
                $("#ageCliente").val("");
                alert('Datos Actualizados Correctamente');
                limpiarCamposCliente();
                getDatosCliente();
            }
        });
    }  
}

/**
 * Eliminar por ID datos Tabla cliente
 */
function eliminarCliente(){
    let idElemento = document.getElementById("idCliente").value;
    if(validarId(idElemento)){
        alert("Debe ingresar el ID a borrar");
    }else{
        let myData={
            id:idElemento
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                alert("Elemento borrado Correctamente")
                limpiarCamposCliente();
                getDatosCliente();
            }
        }); 
    }             
}

/**
 * Buscar por ID datos Tabla cliente
 */
function buscarPorIdCliente(){
    let idElemento = document.getElementById("idCliente").value;
    if(idElemento == ""){
        alert("Debe ingresar un ID para realizar ese tipo de busqueda");
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/'+idElemento,
            dataType : 'json',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                tabla = "<center><table border='1'>"
                filas =""
                if(json.items.length > 0){
                    console.log(json)
                    $("#resultadoCliente").empty();
                    filas +="<tr><th> ID:<td>"+json.items[0].id  
                    filas +="<tr><th>NOMBRE:<td>"+json.items[0].name
                    filas +="<tr><th>EMAIL:<td>"+json.items[0].email
                    filas +="<tr><th>EDAD:<td>"+json.items[0].age
                    $("#resultadoCliente").append(tabla + filas+"</center>")  
                    alert("Elemento encontrado satisfactoriamente");
                }
                else{
                    alert("Elemento con id: "+idElemento+", no existente")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                console.log('Petición realizada '+xhr.status);
                limpiarCamposCliente();
            }
        });  
    }     
}

/**
 * Obtener datos Tabla MENSAJE
 */

function getDatosMensaje(){
    $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'GET',
            dataType : 'json',      
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            complete : function(xhr, status) {
                console.log('Datos Obtenidos correctamente code: '+xhr.status);
            },
            success : function(json) {
                $("#resultadoMensaje").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>MENSAJE"
                filas = ""
                for(i = 0;  i < json.items.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+json.items[i].id  
                   filas +="<td>"+json.items[i].messagetext                 
                }
                $("#resultadoMensaje").append(tabla + filas+"</center>")
                console.log(json)
                limpiarCamposMensaje(); 
            }
        });
}

/**
 * Guardar datos Tabla MENSAJE
 */
function guardarMensaje(){
    if($("#idMessage").val() =="" || $("#message").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            data : { 
                id: $("#idMessage").val(),
                messagetext: $("#message").val()},
                type : 'POST',
                dataType: 'json',
            success : function(json, textStatus, xhr) {
            },
            error : function(xhr, status) {         
            },
            complete : function(xhr, status) {
            console.log('Petición realizada '+xhr.status);
            alert('Datos guardados Correctamente');
            limpiarCamposMensaje();
            getDatosMensaje();
            }
        });
    } 
}

/**
 * Actualizar datos Tabla MENSAJE
 */
function actualizarMensaje(){
    if($("#idMessage").val() =="" || $("#message").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let myData={
            id:$("#idMessage").val(),
            messagetext:$("#message").val(),
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#idMessage").val("");
                $("#message").val("");
                alert('Datos Actualizados Correctamente');
                limpiarCamposMensaje();
                getDatosMensaje();
            }
        });
    }   
}

/**
 * Eliminar por ID datos Tabla MENSAJE
 */
function eliminarMensaje(){
    let idElemento = document.getElementById("idMessage").value;
    if(validarId(idElemento)){
        alert("Debe ingresar un ID para poder Eliminar");
    }else{
        let myData={
            id:idElemento
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultado").empty();
                alert("Elemento borrado Correctamente");
                limpiarCamposMensaje();
                getDatosMensaje();
            }
        }); 
    }             
}

/**
 * Buscar por ID datos Tabla MENSAJE
 */
function buscarPorIdMensaje(){
    
    let idElemento = document.getElementById("idMessage").value;
    if(idElemento == ""){
        alert("Debe ingresar un ID para realizar ese tipo de busqueda");      
    }else{
        $.ajax({    
            url : 'https://g5effebe5eb1c3b-dbcabin.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+idElemento,
            dataType : 'json',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                tabla = "<center><table border='1'>"
                filas =""
                if(json.items.length > 0){
                    console.log(json)
                    $("#resultadoMensaje").empty();
                    filas +="<tr><th> ID:<td>"+json.items[0].id  
                    filas +="<tr><th>NOMBRE:<td>"+json.items[0].messagetext
                    $("#resultadoMensaje").append(tabla + filas+"</center>") 
                    alert("Elemento encontrado satisfactoriamente"); 
                }
                else{
                    alert("Elemento con id: "+idElemento+", no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                console.log('Petición realizada '+xhr.status);
                limpiarCamposMensaje();
            }
        });
    }      
}
/* VALIDAR CAMPOS DE ID*/
function validarId(campo){
    if(campo == "")
        return true
    else
        return false;

}
/* LIMPIAR CAMPOS*/
function limpiarCamposCabin(){
    $("#id").val("");
    $("#brand").val("");
    $("#rooms").val("");
    $("#category_id").val("");
    $("#name").val("");
}
/* LIMPIAR CAMPOS*/
function limpiarCamposCliente(){
    $("#idCliente").val("");
    $("#nameCliente").val("");
    $("#ageCliente").val("");
    
    $("#emailCliente").val("");
}
/* LIMPIAR CAMPOS*/
function limpiarCamposMensaje(){
    $("#idMessage").val("");
    $("#message").val("");
}