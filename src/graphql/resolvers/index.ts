const userResolver = require('./user')
const postResolver = require('./post')
const classResolver = require('./class')

const rootResolver = {
    ...userResolver,
    ...postResolver,
    ...classResolver
}

module.exports = rootResolver