module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define('WishList', {
      title: DataTypes.STRING,
      brand: DataTypes.STRING,
      price: DataTypes.STRING
    })

    return WishList
}