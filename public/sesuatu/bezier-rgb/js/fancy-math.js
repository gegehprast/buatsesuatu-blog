/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Re-maps a number from one range to another.
 * 
 * @param {Number} number 
 * @param {Number} inMin 
 * @param {Number} inMax 
 * @param {Number} outMin 
 * @param {Number} outMax 
 * @param {Boolean} withinBounds 
 * @returns 
 */
function map(number, inMin, inMax, outMin, outMax, withinBounds = false) {
    const newval = (number - inMin) / (inMax - inMin) * (outMax - outMin) + outMin

    if (withinBounds) {
        if (outMin < outMax) {
            return constrain(newval, outMin, outMax)
        } else {
            return constrain(newval, outMax, outMin)
        }
    }
    
    return newval
}

/**
 * Constrains a value between a minimum and maximum value.
 * 
 * @param {Number} n 
 * @param {Number} low 
 * @param {Number} high 
 * @returns 
 */
function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low)
}

/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} t 
 * @returns 
 */
function lerp(a, b, t) {
    return a + (b - a) * t
}

/**
 * 
 * @param {Vector} p0 
 * @param {Vector} p1 
 * @param {Vector} p2 
 * @param {Number} t 
 * @returns 
 */
function quadratic(p0, p1, p2, t) {
    let x1 = lerp(p0.x, p1.x, t)
    let y1 = lerp(p0.y, p1.y, t)
    
    let x2 = lerp(p1.x, p2.x, t)
    let y2 = lerp(p1.y, p2.y, t)

    let x = lerp(x1, x2, t)
    let y = lerp(y1, y2, t)

    return new Vector(x, y)
}

/**
 * 
 * @param {Vector} p0 
 * @param {Vector} p1 
 * @param {Vector} p2 
 * @param {Vector} p3 
 * @param {Number} t 
 * @returns 
 */
function qubic(p0, p1, p2, p3, t) {
    const q1 = quadratic(p0, p1, p2, t)
    const q2 = quadratic(p1, p2, p3, t)

    let x = lerp(q1.x, q2.x, t)
    let y = lerp(q1.y, q2.y, t)

    return {
        q1,
        q2,
        vector: new Vector(x, y)
    }
}

// lookup table
/**
 * @see https://pomax.github.io/bezierinfo/
 */
let lut = [  [1],            // n=0
    [1,1],          // n=1
    [1,2,1],         // n=2
    [1,3,3,1],        // n=3
    [1,4,6,4,1],       // n=4
    [1,5,10,10,5,1],    // n=5
    [1,6,15,20,15,6,1]]  // n=6

/**
 * 
 * @param {Number} n 
 * @param {Number} k 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function binomial(n, k) {
    while (n >= lut.length) {
        const s = lut.length
        const nextRow = new Array(s + 1)
        nextRow[0] = 1
        
        for (i = 1, prev = s - 1; i < s; i++) {
            nextRow[i] = lut[prev][i - 1] + lut[prev][i]
        }
        
        nextRow[s] = 1
        lut.push(nextRow)
    }

    return lut[n][k]
}

/**
 * 
 * @param {Number[]} points 
 * @param {Number} t 
 * @param {Number[]} w 
 * @param {Number[]} r 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function bezier(points, t, w = null, r = null) {
    // normal sum 
    let sum = 0
    const n = points.length - 1

    for (let k = 0; k <= n; k++) {
        const weight = w ? w[k] : 1
        let current = binomial(n, k) * Math.pow((1 - t), (n - k)) * Math.pow(t, (k))
        
        current = current * points[k] * weight

        // if r is not null, multiply with the point's ratio
        if (r) {
            current = current * r[k]
        }

        sum += current
    }

    // if r is null, return early
    if (!r) {
        return sum
    }

    // if r is null, continue calculating the basis sum
    let basisSum = 0

    for (let k = 0; k <= n; k++) {
        let current = binomial(n, k) * Math.pow((1 - t), (n - k)) * Math.pow(t, (k))
    
        // mult
        current = current * r[k]

        basisSum += current
    }

    // divide the sum with the basis
    return sum / basisSum
}

/**
 * Simplified version of bezier() for quadratic.
 * 
 * @param {Number} t 
 * @param {Number[]} w 
 * @param {Number[]} r 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function quadraticB(p0, p1, p2, t, w = [1, 1, 1], r = [1, 1, 1]) {
    const _t2 = t * t
    const _mt = 1 - t
    const _mt2 = _mt * _mt
    
    return (r[0] * w[0] * (p0 * _mt2)) + 
            (r[1] * w[1] * (p1 * (2 * _mt * t))) + 
            (r[2] * w[2] * (p2 * _t2))
}

/**
 * Simplified version of bezier() for qubic.
 * 
 * @param {Number} t 
 * @param {Number[]} w 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function qubicB(p0, p1, p2, p3, t, w = [1, 1, 1, 1]) {
    const _t2 = t * t
    const _t3 = _t2 * t
    const _mt = 1 - t
    const _mt2 = _mt * _mt
    const _mt3 = _mt2 * _mt
    
    return (w[0] * (p0 * _mt3)) + 
            (w[1] * (p1 * (3 * _mt2 * t))) + 
            (w[2] * (p2 * (3 * _mt * _t2))) + 
            (w[3] * (p3 * _t3))
}

/**
 * Simplified version of bezier() for quadratic (rationaled).
 * 
 * @param {Number} t 
 * @param {Number[]} w 
 * @param {Number[]} r 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function rationalQuadraticB(p0, p1, p2, t, w = [1, 1, 1], r = [1, 1, 1]) {
    const _t2 = t * t
    const _mt = 1 - t
    const _mt2 = _mt * _mt

    const f = [
        r[0] * _mt2,
        2 * r[1] * _mt * t,
        r[2] * _t2
    ]
    const basis = f[0] + f[1] + f[2]

    const withWeight = (p0 * f[0] * w[0]) + (p1 * f[1] * w[1]) + (p2 * f[2] * w[2])
    
    return withWeight / basis
}

/**
 * Simplified version of bezier() for qubic (rationaled).
 * 
 * @param {Number} t 
 * @param {Number[]} w 
 * @param {Number[]} r 
 * 
 * @see https://pomax.github.io/bezierinfo/
 */
function rationalQubicB(p0, p1, p2, p3, t, w = [1, 1, 1, 1], r = [1, 1, 1, 1]) {
    const _t2 = t * t
    const _t3 = _t2 * t
    const _mt = 1 - t
    const _mt2 = _mt * _mt
    const _mt3 = _mt2 * _mt

    const f = [
        r[0] * _mt3,
        3 * r[1] * _mt2 * t,
        3 * r[2] * _mt * _t2,
        r[3] * _t3
    ]

    const basis = f[0] + f[1] + f[2] + f[3]
    const withWeight = (p0 * f[0] * w[0]) + (p1 * f[1] * w[1]) + (p2 * f[2] * w[2]) + (p3 * f[3] * w[3])

    return withWeight / basis
}

/**
 * Get curve point of a bezier curve.
 * @param {Vector[]} points 
 * @param {Number} t 
 * @return {Vector}
 */
function getCurvePoint(points, t) {
    if (points.length == 1) {
        return points[0]
    } else {
        const newpoints = new Array(points.length - 1)

        for (i = 0; i < newpoints.length; i++) {
            const x = ( 1 - t) * points[i].x + t * points[i + 1].x
            const y = ( 1 - t) * points[i].y + t * points[i + 1].y
            newpoints[i] = new Vector(x, y)
        }
        
        return getCurvePoint(newpoints, t)
    }
}