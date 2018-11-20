module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define('WishList', {
    itemName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    productUrl: DataTypes.STRING,
    price: DataTypes.STRING
  })

  return WishList
}
