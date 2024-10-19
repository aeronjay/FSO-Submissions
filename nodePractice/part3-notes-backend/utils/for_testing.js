/* eslint-disable @stylistic/js/indent */
const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    return array.length === 0 ? 0 : array.reduce((total, num) => num += total, 0) / array.length

}

module.exports = { reverse, average }