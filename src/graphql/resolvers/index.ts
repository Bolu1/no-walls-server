const userResolver = require('./user')
const postResolver = require('./post')
const classResolver = require('./class')
const assignmentResolver = require('./assignment')

const rootResolver = {
    ...userResolver,
    ...postResolver,
    ...classResolver,
    ...assignmentResolver
}

module.exports = rootResolver