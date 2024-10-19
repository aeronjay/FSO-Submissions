const {  test, describe  } = require('node:test')
const assert = require('node:assert')
const list_helper = require('../utils/list_helper')

describe('test', () => {
    test('dummy test', () => {
        const result = list_helper.dummy(1)
        assert.strictEqual(result, 1)
    })
})


