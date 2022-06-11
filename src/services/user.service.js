const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { mongooseModel } = require('../config/db/connectionManager')
const User = require('../models/user.model')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {

    const userModel = mongooseModel(User)

    if (await userModel.isEmailTaken(userBody.username) )
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken')

    return userModel.create(userBody)

}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {

    const users = await User.paginate(filter, options)

    return users

}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {

    return User.findById(id)

}

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {

    return mongooseModel(User).findOne( { username } )

}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {

    const user = await getUserById(userId)
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId) ) )
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')

    Object.assign(user, updateBody)
    await user.save()

    return user

}

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {

    const user = await getUserById(userId)
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

    await user.remove()

    return user

}

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByUsername,
    updateUserById,
    deleteUserById,
}
