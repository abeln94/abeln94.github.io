



//variables globales
	var resistencias = 0 //número de resistencias totales (incluyendo las eliminadas)
	var res0 = "Sí que existe esta resistencia"    // + todas las que se irán creando
//	var tipo* = serie<-->'s' || paralelo<-->'p'    + todas las que se iran creando
//	var depende* = [a , b , c , ... , x , y , z]      + todas las que se iran creando
	var Nada = 'borrada'   	// Esta resistencia no existe (para el programa)
	var falso = false		// Esta resistencia tampoco existe PORQUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
	
	var lares = 0
	var eltipo = ''
	var elnum = 0
	
	//funciones
function dividir(res){
	/*
	//coge datos
	 var num = prompt("Dividir resistencia " + res , "Número de resistencias" ) ; if(num == null ){return ;} ; if(num=="Número de resistencias"){return}
	var tipo = confirm("Dividir resistencia " + res + "\nACEPTAR -> serie || CANCELAR -> paralelo") */
	
	
	lares = res
	
	
	
	//reinicia parametros
	numerox = 2
	cambiares(0)
	eltipo = ''
	borrarparrafo('parrafoborrador')
	document.getElementById('aceptarresistencias').disabled = true
	
	//abre dialogo
	$( "#mensajeadividir" ).dialog("open") 
	
	
}
	
			
			
					function cambiares(cuanto){
					
					numerox += cuanto
					
					document.getElementById('mdserie2').value = numerox + "en Serie"
					document.getElementById('mdserie3').value = numerox + 1 + "en Serie"
					document.getElementById('mdparalelo2').value = numerox + "en Paralelo"
					document.getElementById('mdparalelo3').value = numerox + 1 + "en Paralelo"
					
					if (numerox <= 2){ document.getElementById('mdmenos').disabled = true }
					if (numerox > 2){ document.getElementById('mdmenos').disabled = false }
					}
					
					function dividir2(numboton , tipo){
					eltipo = tipo
					
					
					elnum = numerox + numboton
					
					borrarparrafo('parrafoborrador')
					
					var insertaren = document.getElementById('parrafoborrador')
					
					for(x=1 ; x<elnum+1 ; x++ ){
					crearparrafo(insertaren , "Resistencia " + x , "")
					}
					
					document.getElementById('aceptarresistencias').disabled = false
					
					}
					
				
function dividir3(){
	
	var res = lares
	var tipo = eltipo
	var num = elnum
	
	var nombresderes = new Array()
	for(x=1 ; x<elnum+1 ; x++ ){
	nombresderes[x-1] = document.getElementById('resistencia ' + x ).value
	}
	
	$( "#mensajeadividir" ).dialog("close")
	
		
	//se prepara
	var resist = resistencias
	
	var lista = new Array()
	
	//crea las resistencias
	for(xy=0 ; xy<num ; xy++){
	crearres(xy , xy+resist+1, nombresderes[xy]); 
	lista[lista.length]=xy+resist+1 ;
	
	}
	
	
	//cuando ya ha creado todas las resistencias
	eval("tipo" + res + " = '" + tipo + "'" )
	
	eval("depende" + res + " = lista" )
	document.getElementById("boton" + res ).value = "Unificar" ;
	document.getElementById("boton" + res ).setAttribute('onclick' , "unificar(" + res + ")" ) ;
	document.getElementById("boton" + res ).setAttribute('title' , "Pulsa para borrar las resistencias que dependen de esta") ;

} 
	
	
function crearres(num2 , num , nombre){
	
		
	//crea el cuadradito
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', "draggable" + num);
	newdiv.setAttribute('class' , "cuadro-movible") ;
	newdiv.setAttribute('style' , "position:absolute ; top:" + 50*num2 + "px ; left:0px"); 
	
	document.body.appendChild(newdiv);
	$( "#draggable" + num ).draggable();
	
	
		
	//crea lo de dentro
	
	//crea titulo
	var crea = document.createElement('p');
	if (nombre==""){ nombre="Resistencia nº" + num }
	crea.innerHTML = nombre ;
	crea.setAttribute('class' , "titulocuadro" );
	newdiv.appendChild(crea);

	crearparrafo(newdiv, "v" , num);
	crearparrafo(newdiv, "i" , num);
	crearparrafo(newdiv, "r" , num);

	
	// boton
	var crea = document.createElement('input')
	crea.setAttribute('type' , 'button')
	crea.setAttribute('id' , "boton" + num)
	crea.setAttribute('value' , "Dividir")
	crea.setAttribute('title' , "Pulsa para dividir esta resistencia en varias")
	crea.setAttribute('onclick' , "dividir(" + num + ")")
	crea.setAttribute('class' , "botonescuadro")
	newdiv.appendChild(crea)
	
	
	//Retorno de carro
	var crea = document.createElement('br')
	newdiv.appendChild(crea)	
	
	
	crearparrafo(newdiv, "p" , num);
	
	//cuando se ha creado todo
	
	eval("res" + num + " = res0 ")
	
	resistencias++
	
	
	
}
	
	
	
	
function unificar(res){
	
	//alert("Esta función queda inutilizada hasta nuevo aviso") ; return ; //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
	if(!confirm("¿Está seguro de que desea borrar todas las resistencias que dependen de ella?")){return}
	
	//borra las resistencias
	unificar2(res , false)
	
}

function unificar2(res , borrar){
	
	if(isvar("depende" + res)){ //borra primero las que dependen de la elegida si existen
		var listaa = eval("depende" + res)
		//alert(listaa)
		for (x=0 ; x<listaa.length ; x++){
		//alert(listaa[x])
		unificar2(listaa[x] , true )
		}
	}
	
	
	if (borrar){
	//borra la elegida si se desea
	elemento=document.getElementById("draggable" + res);
	elemento.parentNode.removeChild(elemento);
	//borra sus variables
	eval("res" + res + " = 'borrada'")
	eval("tipo" + res + " = 'borrada'")
	eval("depende" + res + " = 'borrada'")
	}
	else {
	//borra las variables que indican que esta dividida
	eval("tipo" + res + " = 'borrada'")
	eval("depende" + res + " = 'borrada'")
	//cuando ya ha borrado todas
	document.getElementById("boton" + res ).value = "Volver a dividir" ;
	document.getElementById("boton" + res ).setAttribute('onclick' , "dividir(" + res + ")" ) ;
	document.getElementById("boton" + res ).setAttribute('title' , "Pulsa para volver a dividir esta resistencia en otras.") ;
	}
	
	
}
	
function resolver(){
	for(zzz=0 ; zzz<=2*resistencias ; zzz++){
	
	
	//Comenzar
	
	for(x=0 ; x<=resistencias ; x++){   //Resuelve v i r p de cada resistencia
	if(isvar("res" + x)){
	//v
	if(!saca('i' , x)=="" && !saca('r' , x)=="" && saca('v' , x)==""){mete('v' , x , saca('i' , x)*saca('r' , x)) }
	if(!saca('i' , x)=="" && !saca('p' , x)=="" && saca('v' , x)==""){mete('v' , x , saca('p' , x)/saca('i' , x)) }
	if(!saca('p' , x)=="" && !saca('r' , x)=="" && saca('v' , x)==""){mete('v' , x , Math.sqrt(saca('p' , x)*saca('r' , x))) }
	//i
	if(!saca('v' , x)=="" && !saca('r' , x)=="" && saca('i' , x)==""){mete('i' , x , saca('v' , x)/saca('r' , x)) }
	if(!saca('v' , x)=="" && !saca('p' , x)=="" && saca('i' , x)==""){mete('i' , x , saca('p' , x)/saca('v' , x)) }
	if(!saca('p' , x)=="" && !saca('r' , x)=="" && saca('i' , x)==""){mete('i' , x , Math.sqrt(saca('p' , x)/saca('r' , x))) }
	//r
	if(!saca('i' , x)=="" && !saca('v' , x)=="" && saca('r' , x)==""){mete('r' , x , saca('v' , x)/saca('i' , x)) }
	//p
	if(!saca('i' , x)=="" && !saca('v' , x)=="" && saca('p' , x)==""){mete('p' , x , saca('i' , x)*saca('v' , x)) }
	}
	
	//Resuelve la relación entre resistencias
	
	if(isvar("tipo" + x)){
	
	var tipox = eval("tipo" + x)
	if(tipox=='s') //resistencias en serie
	{
	//el valor 'r'
	sumar(x)
	//el valor 'i'
	if(!saca('i' , x)==""){
	var dependex = eval("depende" + x)
	var valor = saca('i' , x)
	for(y=0 ; y<dependex.length ; y++){
	if(saca('i' , dependex[y])==""){ mete('i' , dependex[y] , valor)}
	}
	}
	
	}//fin resistencias en serie
	else{
		if(tipox=='p')//resistencias en paralelo
	{
	//el valor 'r'
	sumarinvertido(x)
	//el valor 'v'
	if(!saca('v' , x)==""){
	var dependex = eval("depende" + x)
	var valor = saca('v' , x)
	for(y=0 ; y<dependex.length ; y++){
	if(saca('v' , dependex[y])==""){ mete('v' , dependex[y] , valor)}
	}
	}
	}//fin reistencias en paralelo
	else{alert("ERROR Nº000001") ; return}
	}
	
	
	
	
	
	}
	
	
	//fin de resolver cada resistencia
	}
	//fin de varias repeticiones
	}
	//fin de programa
}
	
		
		
function vaciar(){
	
	if ( !confirm("¿Estas seguro de que quieres borrar TODOS los datos de TODAS la resistencias?") ){return}
		
	for(x=0 ; x<=resistencias ; x++){
	mete('v' , x , "")
	mete('i' , x , "")
	mete('r' , x , "")
	mete('p' , x , "")
	}
	
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//miniprogramas (los que ocupan poco y solo sirven para cosas concretas)
	
function isvar(varr){   //comprueva si existe esa variable -IS a VARiable-
	
	eval("var " + varr + " = window." + varr + " ? window." + varr + " : 'borrada' ")
	
	
	if (eval(varr)=='borrada' ){return false} else {return true}
		
}
	
	
function mete(virp , res , dato){
	if (isvar("res" + res)) {
		document.getElementById( virp + "" + res ).value = dato 
	}
}
	
function saca(virp , res){
	if (isvar("res" + res)) {
		return document.getElementById(virp + "" + res ).value 
	}
	alert("Esto no debería salir \n ERROR") 
	return ""
}
	
	
	
	
	
function crearparrafo(padre, letra , num){
		//crea el parrafo
		var parrafo = document.createElement('p')
		parrafo.setAttribute('class' , "individual")
		padre.appendChild(parrafo)		
		
		//crea el texto
		var texto = document.createElement('span')
		var aux = "" + letra;
		aux = aux.toUpperCase();
		texto.innerHTML = aux  + ": ";
		parrafo.appendChild(texto);

		//crea el cuadro de texto
		var entrada = document.createElement('input') ;
		aux = aux.toLowerCase();
		entrada.setAttribute('id', aux + num ) ;
		entrada.setAttribute('maxlength', 14 ) ;
		parrafo.appendChild(entrada) ;		
}
	
function borrarparrafo(nombre){
		
		document.getElementById(nombre).innerHTML = ""
		
	//var parrafo = document.getElementById(nombre);
	//parrafo.parentNode.removeChild(parrafo);
		
}
	
	
	
	
function sumarinvertido(res){
	if(saca('r' , res)==""){
	var dependex = eval("depende" + res)
	var siono = true
	var valorres = 0
	for(y=0 ; y<dependex.length && siono ; y++){
	if(saca('r' , dependex[y])==""){siono=false}
	else{valorres+= 1/eval( saca('r' , dependex[y]) ) }
	}
	if(siono){mete('r' , res , 1/valorres)}
	}
	
	
}
	
function sumar(res){
	if(saca('r' , res)==""){
	var dependex = eval("depende" + res)
	var siono = true
	var valorres = 0
	for(y=0 ; y<dependex.length && siono ; y++){
	if(saca('r' , dependex[y])==""){siono=false}
	else{valorres+= eval( saca('r' , dependex[y]) ) }
	}
	if(siono){mete('r' , res , valorres)}
	}
	
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//programas que hay que poner aparte
	
function ayuda() {
	$( "#ayuda" ).dialog("open") 
}
function version(){
	
	
	
	$( "#version" ).dialog("open") 
	
}

function creditos(){
	
	
	
	$( "#creditos" ).dialog("open") 
	
	//ejecutado solo al abrirse el cuadro
	//desplazamiento = true ; movercreditos()

}
	
		desplazamiento = false
		$(function() {listacreditos = document.getElementById('textocreditos').innerHTML.split("\n") })	
		
function movercreditos(){
	
	var textoaponer = ""
	for(x=0 ; x<listacreditos.length ; x++){
	textoaponer = textoaponer+listacreditos[x]
	textoaponer = textoaponer+"<br>"
	}
	
	document.getElementById('textocreditos').innerHTML = textoaponer;
	
	//$('#textoaponer li:first').appendTo('#textoaponer');
	var yy = listacreditos[0]
	for(x=0 ; x<listacreditos.length-1 ; x++){
	listacreditos[x] = listacreditos[x+1]
	}
	listacreditos[listacreditos.length-1] = yy
	
	if(desplazamiento){setTimeout("movercreditos()" , 500) }
	
}
	

	
	
	
	
	
	
	//Para evitar perder datos al salir
	var pasalir = false
function salir(){
	if(pasalir){ return "Si sale de la página perdera los datos de las resistencias" }
	else{ pasalir = true }
}
	window.onbeforeunload = salir ;
	
	
	
	