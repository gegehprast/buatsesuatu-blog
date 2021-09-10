class Vector {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    constructor(x, y, z) {
        /**
         * The x component of the vector
         * @property x {Number}
         */
        this.x = x

        /**
         * The y component of the vector
         * @property y {Number}
         */
        this.y = y

        /**
         * The z component of the vector
         * @property z {Number}
         */
        this.z = z
    }

    /**
     * Multiplies the vector by a scalar.
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    mult(x, y, z) {
        const components = [x, y, z].filter(item => {
            return typeof item !== 'undefined' && item != null
        })
        
        if (components.length === 1) {
            this.x *= x
            this.y *= x
            this.z *= x
        }
        
        if (components.length === 2) {
            this.x *= x
            this.y *= y
        }

        if (components.length === 3) {
            this.x *= x
            this.y *= y
            this.z *= z
        }

        return this
    }

    /**
     * Add the vector by a scalar.
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    add(x, y, z) {
        const components = [x, y, z].filter(item => {
            return typeof item !== 'undefined' && item != null
        })
        
        if (components.length === 1) {
            this.x += x
            this.y += x
            this.z += x
        }
        
        if (components.length === 2) {
            this.x += x
            this.y += y
        }

        if (components.length === 3) {
            this.x += x
            this.y += y
            this.z += z
        }

        return this
    }
}

Vector.fromAngle = function fromAngle(angle, length) {
    if (typeof length === 'undefined') {
        length = 1
    }

    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0)
}
