export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, 
        temporaryValue: T, 
        randomIndex: number
    

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}


export function shuffle2<T>(array: T[], aux: number[]): T[] {
    const keeper = []

    for (let i = 0; i < aux.length; i++) {
        keeper[i] = array[aux[i]]
    }

    for (let i = aux.length - 1; i >= 0; i--) { // It's important to do this from the last to the first
        array.splice(aux[i], 1) // This will remove the index element shifting the rest of elemnts
    }

    shuffle(array)

    // Now we put back the elements we took out.
    for (let i = 0; i < aux.length; i++ ) {
        array.splice(aux[i], 0, keeper[i]) // This will remove the index element shifting the rest of elemnts
    }

    return array
}