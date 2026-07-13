Crear una pelicula
consulta una pelicula pro su ID
actualiza el anio, dirección y duración de una pelicula por si ID
Borra Una pelicula por su ID

1.Método HTTP: POST
URI: /Movies
Json Enviado:
{
	"id" : 2 ,
	"nombre" : "Fiesta de Salchichas",
	"autor" : "Victor Armando Camacho Correa",
	"Anio" : 2016
	"Stock" : 50
}
Json recibido
{
	"code" : 200
	"msg" : "pelicula Creada"
}

2.Método HTTP: GET
URI: /Movies/2
Json Enviado:
{
	
}
Json recibido:
{
    "id": 2,
    "nombre": "Fiesta de Salchichas",
    "autor": "Victor Armando Camacho Correa",
    "Anio": 2016,
    "Stock": 50
}

3.Método HTTP: PUT
URI: /Movies/2
JSON Enviado:
{
    "Anio": 2017,
    "direccion": "Conrad Vernon, Greg Tiernan",
    "duracion": "89 min"
}
Json Recibido:
{
    "code": 200,
    "msg": "Película Actualizada con éxito"
}

4.Método HTTP: DELETE
URI: /Movies/2
JSON Enviado:
{

}
Json recibido:
{
    "code": 200,
    "msg": "Película Eliminada correctamente"
}