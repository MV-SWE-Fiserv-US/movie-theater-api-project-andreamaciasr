const Show = require('./Show.js')
const User = require('./User.js')

Show.belongsToMany(User, { through: 'watched'})
User.belongsToMany(Show, { through: 'watched' })

module.exports = {
  Show,
  User
}
