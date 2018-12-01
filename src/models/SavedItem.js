module.exports = (sequelize, DataTypes) => {
  const SavedItem = sequelize.define('SavedItem', {})

  SavedItem.associate = function (models) {
    SavedItem.belongsTo(models.User)
    SavedItem.belongsTo(models.WishList)
  }
  return SavedItem
}
