const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonCampeon = document.getElementById("b-campeon");

const botonReiniciar = document.getElementById("b-restart")

const sectionSeleccionarCampeon = document.getElementById("seleccionar-mascota")
const spanCampeonJugador = document.getElementById("campeon-jugador")

const spanCampeonEnemigo = document.getElementById("campeon-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const sectionMensajes = document.getElementById("resultado")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")


let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputXayah
let inputAkali
let inputCaitlyn
let campeonJugador
let campeonJugadorObjeto
let ataquesMokepon
let ataquesCampeonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let resultado
let resultadoFinal
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'mapa.webp'

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, x = 420, y = 85){
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
    this.x = x
    this.y = y
    this.ancho = 80
    this.alto = 80
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotoMapa
    this.velocidadX = 0
    this.velocidadY = 0
  }

  pintarMokepon() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    )
  }

}

let xayah = new Mokepon("Xayah", 'xayah.png', 5, 'xayah.png')

let akali = new Mokepon("Akali", 'akali.png', 5, 'akali.png')

let caitlyn = new Mokepon("Caitlyn", 'cait.png', 5, 'cait.png')

let xayahEnemigo = new Mokepon("Xayah", 'xayah.png', 5, 'xayah.png', 90, 160)

let akaliEnemigo = new Mokepon("Akali", 'akali.png', 5, 'akali.png', 200, 20)

let caitlynEnemigo = new Mokepon("Caitlyn", 'cait.png', 5, 'cait.png', 520, 200)

xayah.ataques.push(
  {nombre: 'Agua', id:'b-agua'},
  {nombre: 'Agua', id:'b-agua'},
  {nombre: 'Agua', id:'b-agua'},
  {nombre: 'Fuego', id:'b-fuego'},
  {nombre: 'Tierra', id:'b-tierra'},
)
akali.ataques.push(
  {nombre: 'Tierra', id:'b-tierra'},
  {nombre: 'Tierra', id:'b-tierra'},
  {nombre: 'Tierra', id:'b-tierra'},
  {nombre: 'Agua', id:'b-agua'},
  {nombre: 'Fuego', id:'b-fuego'},
)
caitlyn.ataques.push(
  {nombre: 'Fuego', id:'b-fuego'},
  {nombre: 'Fuego', id:'b-fuego'},
  {nombre: 'Fuego', id:'b-fuego'},
  {nombre: 'Agua', id:'b-agua'},
  {nombre: 'Tierra', id:'b-tierra'},
)

mokepones.push(xayah,akali,caitlyn)

function iniciarJuego(){
  sectionSeleccionarAtaque.style.display = "none"
  sectionReiniciar.style.display = "none"
  sectionVerMapa.style.display = "none"

  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="campeon" id=${Mokepon.nombre} />
    <label class="tarjetas-campeones" for=${Mokepon.nombre} >
      <p> ${Mokepon.nombre} </p>
      <img src=${Mokepon.foto} id="fotos" alt=${Mokepon.nombre}>
    </label>
    ` 
  contenedorTarjetas.innerHTML += opcionDeMokepones

  inputXayah = document.getElementById("Xayah")
  inputAkali = document.getElementById("Akali")
  inputCaitlyn = document.getElementById("Caitlyn")
  })

  botonCampeon.addEventListener("click", seleccionarCampeonJugador)
  botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarCampeonJugador()
{
  
  sectionSeleccionarCampeon.style.display = "none"
  
  //sectionSeleccionarAtaque.style.display = "flex"

  if (inputXayah.checked) {
    spanCampeonJugador.innerHTML = inputXayah.id
    campeonJugador = inputXayah.id
  }else if (inputAkali.checked) {
    spanCampeonJugador.innerHTML = inputAkali.id
    campeonJugador = inputAkali.id
  }else if (inputCaitlyn.checked) {
    spanCampeonJugador.innerHTML = inputCaitlyn.id
    campeonJugador = inputCaitlyn.id
  }else{
    alert("No has seleccionado ningún Campeón :(")
  }

  seleccionarCampeonEnemigo()
  extraeAtaques (campeonJugador)
  sectionVerMapa.style.display = "flex"
  iniciarMapa()
}

function extraeAtaques(campeonJugador){
  let ataques 
  for (let i = 0; i < mokepones.length; i++) {
    if(campeonJugador == mokepones[i].nombre){
        ataques = mokepones[i].ataques
    }
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="b-ataque BAtaques"> ${ataque.nombre} </button>
    `
    contenedorAtaques.innerHTML += ataquesMokepon
  })
  botonFuego = document.getElementById("b-fuego")
  botonAgua = document.getElementById("b-agua")
  botonTierra = document.getElementById("b-tierra")
  botones = document.querySelectorAll(".BAtaques")

  secuenciaAtaque()
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (Event) => {
      if (Event.srcElement.textContent === " Agua ") {
        ataqueJugador.push("AGUA")
        console.log(ataqueJugador)
        boton.style.background = "#4D0606"
        boton.disabled = true
      } else if (Event.srcElement.textContent === " Fuego ") {
        ataqueJugador.push("FUEGO")
        console.log(ataqueJugador)
        boton.style.background = "#4D0606"
        boton.disabled = true
      } else {
        ataqueJugador.push("TIERRA")
        console.log(ataqueJugador)
        boton.style.background = "#4D0606"
        boton.disabled = true
      }
      ataqueAleatorioEnemigo()
    })
  })
  
}

function seleccionarCampeonEnemigo(){
  let campeonAleatoria = aleatorio(0, mokepones.length -1)
  
  spanCampeonEnemigo.innerHTML = mokepones[campeonAleatoria].nombre
  ataquesCampeonEnemigo = mokepones[campeonAleatoria].ataques
}

function ataqueAleatorioEnemigo(){
  let ataqueAleatorio = aleatorio(0, ataquesCampeonEnemigo.length -1)

  if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
    ataqueEnemigo.push("FUEGO")
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
    ataqueEnemigo.push("AGUA")
  } else {
    ataqueEnemigo.push("TIERRA") 
  }
  console.log(ataqueEnemigo)
  iniciarPelea()
}

function iniciarPelea() {
  if (ataqueJugador.length === 5){
    combate()
  }
}

function indexAmbosOponentes(jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
  
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      resultado = "EMPATE"
    } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA"){
      indexAmbosOponentes(index, index)
      resultado = "GANASTE"
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
      indexAmbosOponentes(index, index)
      resultado = "GANASTE"
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA"){
      indexAmbosOponentes(index, index)
      resultado = "GANASTE"
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {
      indexAmbosOponentes(index, index)
      resultado = "PERDISTE"
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }
  crearMensaje()
  revisarVidas()
}

function revisarVidas(){
  if(victoriasJugador === victoriasEnemigo){
    resultadoFinal = "Fue un Empate!"
    crearMensajeFinal()
  } else if (victoriasJugador > victoriasEnemigo) {
    resultadoFinal = "Felicidades! Ganaste!"
    crearMensajeFinal()
  } else {
    resultadoFinal = "Lo siento, Perdiste :("
  }
}

function crearMensaje(){
  
  let nuevoAtaqueDelJugador = document.createElement("p")
  let nuevoAtaqueDelEnemigo = document.createElement("p")

  sectionMensajes.innerHTML = resultado
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(){
  
  sectionMensajes.innerHTML = resultadoFinal
  sectionReiniciar.style.display = "block"
}

function reiniciarJuego(){
  location.reload()
}

function aleatorio(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){

  campeonJugadorObjeto.x = campeonJugadorObjeto.x + campeonJugadorObjeto.velocidadX
  campeonJugadorObjeto.y = campeonJugadorObjeto.y + campeonJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  campeonJugadorObjeto.pintarMokepon()
  xayahEnemigo.pintarMokepon()
  akaliEnemigo.pintarMokepon()
  caitlynEnemigo.pintarMokepon()
  if(campeonJugadorObjeto.velocidadX !== 0 || campeonJugadorObjeto.velocidadY !== 0){
    revisarColision(xayahEnemigo)
  }
}

function moverDerecha() {
  campeonJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
  campeonJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
  campeonJugadorObjeto.velocidadY = 5
}
function moverArriba() {
  campeonJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
  campeonJugadorObjeto.velocidadX = 0
  campeonJugadorObjeto.velocidadY = 0
}

function teclaOprimida(Event){
  switch (Event.key) {
    case "ArrowUp":
      moverArriba()
      break
    case "ArrowDown":
      moverAbajo()
      break
    case "ArrowLeft":
      moverIzquierda()
      break 
    case "ArrowRight":
      moverDerecha()
      break
    default:
      break
  }
}

function iniciarMapa(){
  mapa.width = 640
  mapa.height = 408
  campeonJugadorObjeto = obtenerCampeon(campeonJugador)
  intervalo = setInterval(pintarCanvas, 50)

  window.addEventListener("keydown", teclaOprimida)
  window.addEventListener("keyup", detenerMovimiento)
}

function obtenerCampeon(){
  for (let i = 0; i < mokepones.length; i++) {
    if(campeonJugador == mokepones[i].nombre){
        return mokepones[i]
    }
  }
}

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x
  
  const arribaMascota = campeonJugadorObjeto.y
  const abajoMascota = campeonJugadorObjeto.y + campeonJugadorObjeto.alto
  const derechaMascota = campeonJugadorObjeto.x + campeonJugadorObjeto.ancho
  const izquierdaMascota = campeonJugadorObjeto.x
  if(
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ){
    return
  }
  alert("Hay colision")
}

window.addEventListener("load", iniciarJuego)
