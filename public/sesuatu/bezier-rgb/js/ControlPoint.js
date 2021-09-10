/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// global variable for determining if any control point is currently being hold
let isDragging = false

class ControlPoint {
    /**
     * 
     * @param {Vector} vector 
     */
    constructor(vector, color = 'cyan') {
        this.vector = vector
        this.x = vector.x
        this.y = vector.y
        this.r = 7
        this.onHold = false
        this.color = color
    }

    draw() {
        stroke(this.color)
        fill(this.color)
        point(this.x, this.y, this.r)
        ctx.font = '18px sans-serif'
        ctx.fillText(`(${this.x}, ${this.y})`, this.x + (this.r * 2), this.y - (this.r * 2))
    }
    
    update() {
        if (!this.onHold && !isDragging && mouseOnHold) {
            this.setOnHold()
        }

        if (!mouseOnHold) {
            this.onHold = false
            isDragging = false
        }

        if (this.onHold) {
            isDragging = true
            this.x = mouseX
            this.y = mouseY
            this.vector = new Vector(this.x, this.y)
        }
    }
    
    setVector(vector) {
        this.x = vector.x
        this.y = vector.y
        this.vector = vector
    }

    setOnHold() {
        this.onHold =  mouseX >= this.x - this.r && 
            mouseX <= this.x + this.r && 
            mouseY >= this.y - this.r && 
            mouseY <= this.y + this.r
    }
}
