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
    canvas.style.width = widthCanvasAmpliado
    canvas.style.height = heightCanvasAmpliado
}

// Particulas-------------------------
var particulas = new Array()
var numParticulas = 100

class Particula {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.alfa //grado de transparencia

        this.vx //velocidad en x
        this.vy //velocidad en y

        this.factorAlfa = 0.05 //velocidad a la que desaparece
        this.color = '#ee7600'

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
        this.alfa -= this.factorAlfa

        this.x += this.vx
        this.y += this.vy

        //dibuja la particula
        this.dibuja()
    }

    dibuja() {
        ctx.save()
        ctx.globalAlfa = this.alfa
        ctx.fillStyle = this.color
        ctx.fillRect = (this.x, this.y, 10, 10)
        ctx.restore()
    }

}




function inicializa() {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')

    reescalaCanvas()

    // creamos las particulas
    for(i = 0; i < numParticulas; i++) {
        particulas[i] = new Particula(70, 50)
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
