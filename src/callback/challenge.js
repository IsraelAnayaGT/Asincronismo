const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

/*Funcion principal que obtendra la informacion del producto como un objeto*/ 
function fetchData(urlApi, callback){
    /*Inicializar un objeto de tipo XMLHttpRequest*/
    let xhttp = new XMLHttpRequest();
    /*El metodo .open realiza la peticion de apertura de comunicación, el metodo puede ser "GET" 
    o POST,  luego se envia la URL si es asincrono (true 0 false), usuario y contraseña. En este 
    caso solo se utiliza el metodo, la url y async*/
    xhttp.open("GET", urlApi, true);
    /*En este metodo Almacena el nombre de la función que se ejecutará cuando el
    objeto XMLHttpRequest cambie de estado */
    xhttp.onreadystatechange = function (event){
        /*El atributo readyState define el estado del objeto XMLHttpRequest
        //0 No inicializado
        //1 Loading
        //2 Ejecutado
        //3 Interactuando
        //4 Completado
        */ 
       if(xhttp.readyState === 4){
        /*Si la respuesta de la API es exitosa (200 Ok) */
        if(xhttp.status === 200){
            /*Se ejecuta el callback recibiendo como argumentos un objeto, como la respuesta
            de la API es un texto plano,el metodo JSON.parse tranformará este texto en
            un objeto.
            El atributo devuelve un DOMString que contiene la  respuesta a la consulta como
            un texto o null si la consulta no tuvo exito o aun no ha sido completada. */
            callback(null, JSON.parse(xhttp.responseText))
        } 
        /*Si la respuesta de la API no es exitosa se captura el error*/
        else {
            /*Se inicializa un objeto de tipo Error donde se le envian como argumentos
            un mensaje de error y la URL de la API para conocer en dónde se produjo el error.*/
            const error = new Error("Error"+ urlApi);
            return callback(error, null);
            /*El método .send() envia la petición al servidor */
           }
       } 
    }
    xhttp.send();
}

/*Se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la
cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2
parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos
por la API).*/
fetchData(`${API}/products`, function (error1, data1){
    /*Se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el
    error */
    if(error1) return console.error(error1);
    /*Se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del
    arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer
    objeto de arreglo data1 y nuevamente una función anónima. */
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        /*Si en este punto se identifica un error se imprime en consola y se de tiene
        el proces */
        if(error2) return console.error(error2);
        /*Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria,
        se envían como parametros la url de la API con la concatenación de 'Categories'
        y el atributo Id de categoria del objeto data2 de la función anterior.
        //En este caso puntual se hace uso de Optional Caining el cual hace una 
        evalucación de las propiedades de un objeto y en vez de arrojar un error
        devuelve undefined en caso que la propiedad no exista o sea null.
        //Igual que las anteriores e envia una funcion anonima con 2 argumentos, un objeto
        Error y un objeto de datos*/
        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3){
            /*Se valida si existe error, en caso de que exista se detiene el proceso
            y se imprime el error*/ 
            if(error3) return console.error(error3);
            /*Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en
             el metodo invocado inicialmente*/

            console.log(data1[0]);
            /*Se imprime el titulo del objeto que se consultó en la seguna invocación de la
            función */
            console.log(data2.title);
            /*Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó
            en la seguna invocación del método. */
            console.log(data3.name);
            /* */
        });
    });
    
});