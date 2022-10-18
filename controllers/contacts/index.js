const getAll = require('./getAllContats');
const getById = require('./getById');
const add = require('./addContact');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact')
const removeById = require('./removeById');

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    updateStatusContact,
    removeById
}