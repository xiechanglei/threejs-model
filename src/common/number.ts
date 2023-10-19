export const randomInt = (n1: number, n2?: number) => {
    if (n2 === undefined) {
        n2 = n1
        n1 = 0
    }
    return Math.floor(Math.random() * (n2 - n1 + 1) + n1)
}