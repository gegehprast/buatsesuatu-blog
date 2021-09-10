/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const TRANSPARENT = 'rgba(255, 255, 255, 0)'
const WIDTH = canvas.width
const HEIGHT = canvas.height
const HALF_WIDTH = WIDTH / 2
const HALF_HEIGHT = HEIGHT / 2

let fillColor = 'black'
let strokeColor = 'black'

let mouseX = 0
let mouseY = 0

let mouseOnHold = false

/**
 * 
 * @param {String} color 
 */
function fill(color) {
    fillColor = color
}

/**
 * 
 * @param {String} color 
 */
function stroke(color) {
    strokeColor = color
}

/**
 * 
 * @param {String} color 
 */
function background(color) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} size 
 */
function point(x, y, size = 5) {
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
}

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} size 
 */
function circle(x, y, size = 5, lineWidth = 1) {
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = lineWidth
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.stroke()
}

/**
 * 
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {Number} width 
 */
function line(x1, y1, x2, y2, width = 1) {
    ctx.beginPath()
    ctx.strokeStyle = strokeColor
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = width
    ctx.stroke()
}


/**
 * 
 * 
 * LISTENERS
 * 
 *  
 */

/**
 * 
 * @param {MouseEvent} e 
 */
function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect()
    
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
}

// start listening to mouse mouvement on the canvas
canvas.addEventListener('mousemove', handleMouseMove, false)
canvas.addEventListener('mousedown', () => mouseOnHold = true, false)
canvas.addEventListener('mouseup', () => mouseOnHold = false, false)
