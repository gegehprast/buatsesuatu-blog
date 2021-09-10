/* eslint-disable no-undef */
let r
let factor = 2
const PI = Math.PI
const TWO_PI = PI * 2
const total = 130
/** @type {ControlPoint[]} */
const points = []
/** @type {Bezier[]} */
const beziers = []

function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI)
    const v = Vector.fromAngle(angle + PI)

    v.mult(r)

    return v
}

function getVectors(index, total) {
    const a = getVector(index, total)
    const b = getVector(index + 16, total)
    const c = getVector((index + 8) * factor, total)
    const d = getVector((index + 1) * factor, total)

    return [a, b, c, d]
}

/**
 * 
 * @param {Vector[]} vectors 
 */
function updateControlPoints(vectors) {
    points[0].setVector(vectors[0])
    points[1].setVector(vectors[1])
    points[2].setVector(vectors[2])
    points[3].setVector(vectors[3])
}

function setup () {
    setCanvasDimension(window.innerWidth, window.innerHeight)

    r = canvas.height / 2 - 16
    
    for (let i = 0; i < total - 1; i++) {
        const a = getVector(i, total)
        const b = getVector(i + 16, total)
        const c = getVector((i + 8) * factor, total)
        const d = getVector((i + 1) * factor, total)

        points[0] = new ControlPoint(a)
        points[1] = new ControlPoint(b)
        points[2] = new ControlPoint(c)
        points[3] = new ControlPoint(d)
        
        beziers.push(
            new Bezier(
                points
            )
        )
    }
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    background('black')
    
    factor += 0.015
    
    ctx.translate(HALF_WIDTH, HALF_HEIGHT)
    
    for (let i = 0; i < total - 1; i++) {
        updateControlPoints(getVectors(i, total))

        beziers[i].update(
            points
        )
        
        beziers[i].draw()
    }

    stroke(`hsl(${factor * 360}, 100%, 50%)`)
    circle(0, 0, r, 2)
    
    window.requestAnimationFrame(draw)
}

window.addEventListener('DOMContentLoaded', ()=>{  
    setup()

    window.requestAnimationFrame(draw)

    window.addEventListener('resize', () => setCanvasDimension(window.innerWidth, window.innerHeight))
})
