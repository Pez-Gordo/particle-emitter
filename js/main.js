var canvas
var ctx
var fps = 50

//tamaño real del canvas
var widthCanvas = 128
var heightCanvas = 80

//tamaño de visualizacion del canvas ampliado con css
var widthCanvasAmpliado = 700
var heightCanvasAmpliado = 500

//factor de ampliacion para el canvas
var factorX = widthCanvasAmpliado/widthCanvas
var factorY = heightCanvasAmpliado/heightCanvas


//reescalamos el canvas mediante css
function reescalaCanvas() {
    canvas.style.width = widthCanvasAmpliado + 'px'
    canvas.style.height = heightCanvasAmpliado + 'px'
}

//posicion del raton
var ratonX = 0
var ratonY = 0

function posicionRaton(raton) {
    ratonX = Math.floor(raton.pageX/factorX)
    ratonY = Math.floor(raton.pageY/factorY)
    
}

// Particulas-------------------------
var particulas = new Array()
var numParticulas = 300

class Particula {

    constructor(x, y, orden) {
        this.x = x
        this.y = y

        this.orden = orden

        this.alfa //grado de transparencia

        this.vx //velocidad en x
        this.vy //velocidad en y

        this.factorAlfa = 0.05 //velocidad a la que desaparece
        this.color = 'green'

        this.gravedad = 1.4
        //this.gravedad = 2
        //this.gravedad = 0

        this.resetea(this.x, this.y)
    }

    resetea(x, y) {
        this.x = x
        this.y = y

        this.vx = Math.random() * 1 - 0.5
        this.vy = Math.random() * 1 - 0.5

        this.alfa = 1
    }

    actualiza() {

        if(this.orden <= 0) {
            this.alfa -= this.factorAlfa

            this.x += this.vx
            this.y += this.vy + this.gravedad


            //momento de resetear
            if(this.alfa <= 0) {
                this.resetea(ratonX, ratonY)
            }

            //dibuja la particula
            this.dibuja()

        } else {
            this.orden -= 2 //para ajustar el caudal de particulas
        }

    }



    dibuja() {
        ctx.save()
        ctx.globalAlpha = this.alfa
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, 1, 1)
        ctx.restore()
    }

}




function inicializa() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')

    //inicializamos tamaño canvas
    canvas.width = widthCanvas
    canvas.height = heightCanvas

    //reescalamos
    reescalaCanvas()

    //añadimos listener para escuchar al raton

    canvas.addEventListener('mousemove',  posicionRaton, false)

    // creamos las particulas
    for(i = 0; i < numParticulas; i++) {
        particulas[i] = new Particula(ratonX, ratonY, i)
    }

    //añadimos el bucle principal
    setInterval(principal, 1000 / fps)

}

function borrarCanvas() {
    canvas.width = canvas.width
    canvas.height = canvas.height
}

//buble principal del juego
function principal() {
    borrarCanvas()

    for(i = 0; i < numParticulas; i++) {
        particulas[i].actualiza()
    }
}
