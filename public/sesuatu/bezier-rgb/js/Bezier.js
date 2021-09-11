/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
class Bezier {
    /**
     * 
     * @param  {ControlPoint[]} controlPoints 
     * @param  {Number[]} weights 
     * @param  {Number[]} ratios 
     * @param {Number} delta 
     */
    constructor(controlPoints, weights, ratios, delta = 0.01, curveDelta = 0) {
        /** @type {Vector[]} */
        this.points = []
        /** @type {Number[]} */
        this.xPoints = []
        /** @type {Number[]} */
        this.yPoints = []
        /** @type {Vector[][]} */
        this.midpoints = []

        this.update(controlPoints, weights, ratios, delta, curveDelta)
    }

    /**
     * 
     * @param  {ControlPoint[]} controlPoints 
     * @param  {Number[]} weights 
     * @param  {Number[]} ratios 
     * @param {Number} delta 
     */
    update(controlPoints, weights = null, ratios = null, delta = null, curveDelta = null) {
        if (weights != null) {
            this.weights = weights
        }

        if (ratios != null) {
            this.ratios = ratios
        }

        if (delta != null) {
            this.delta = delta
        }

        if (curveDelta != null) {
            this.curveDelta = curveDelta
        }

        const points = []
        const xPoints = []
        const yPoints = []

        for (let i = 0; i < controlPoints.length; i++) {
            points.push(controlPoints[i].vector)
            xPoints.push(controlPoints[i].x)
            yPoints.push(controlPoints[i].y)
        }

        this.controlPoints = controlPoints
        this.points = points
        this.xPoints = xPoints
        this.yPoints = yPoints
    }

    draw() {
        this.drawCurve()
    }

    updateControlPoints() {
        for (let i = 0; i < this.controlPoints.length; i++) {
            this.controlPoints[i].update()
        }
    }

    drawControlPoints() {
        for (let i = 0; i < this.controlPoints.length; i++) {
            this.controlPoints[i].draw()
        }
    }

    drawCurve() {
        let prevX = this.xPoints[0]
        let prevY = this.yPoints[0]

        for (let t = 0; t < 1; t += this.delta) {
            const x = bezier(this.xPoints, t)
            const y = bezier(this.yPoints, t)

            stroke(`hsl(${t * 360}, 100%, 50%)`)

            line(x, y, prevX, prevY, 1)

            prevX = x
            prevY = y
        }
    }

    /**
     * 
     * @param {Vector[]} points 
     * @param {Vector[][]} collected 
     * @returns 
     */
    calculateMidPoints(points, collected) {
        const midPoints = []
        
        for (let i = 0; i < points.length - 1; i++) {
            const midPoint = getCurvePoint([points[i], points[i + 1]], this.curveDelta)

            midPoints.push(midPoint)
        }
        
        collected.push(midPoints)

        if (points.length > 2) {
            return this.calculateMidPoints(midPoints, collected)
        }
        
        return collected
    }

    drawMidPoints() {
        const colors = ['cyan', 'yellow', 'purple', 'orange', 'brown', 'pink', 'indigo', 'violet', 'black']
        
        for (let i = 0; i < this.midpoints.length; i++) {
            for (let j = 0; j < this.midpoints[i].length; j++) {
                stroke(colors[i])
                fill(colors[i])
                point(this.midpoints[i][j].x, this.midpoints[i][j].y, 5)
                // ctx.font = '14px sans-serif'
                // ctx.fillText(`(${this.collected[i][j].x}, ${this.collected[i][j].y})`, this.collected[i][j].x + 10, this.collected[i][j].y - 10)
            }
        }
    }

    drawLines() {
        // the connecting lines between each mid points
        for (let i = 0; i < this.midpoints.length - 1; i++) {
            for (let j = 0; j < this.midpoints[i].length - 1; j++) {
                stroke('black')
                line(this.midpoints[i][j].x, this.midpoints[i][j].y, this.midpoints[i][j + 1].x, this.midpoints[i][j + 1].y, 1)
            }
        }

        // the connecting lines between each control points
        for (let i = 0; i < this.points.length - 1; i++) {
            stroke('yellow')
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y, 2)
        }
    }
}
