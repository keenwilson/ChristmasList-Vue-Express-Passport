module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define('WishList', {
    itemName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    productUrl: DataTypes.TEXT,
    price: DataTypes.STRING,
    itemId: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    isSaved: DataTypes.BOOLEAN
  })

  WishList.associate = function (models) {
    WishList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return WishList
}
