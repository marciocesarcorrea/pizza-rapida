module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    tempo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {})

  Pizza.associate = function (models) {
    Pizza.belongsTo(models.Tamanho)
    Pizza.belongsTo(models.Sabor)
    Pizza.belongsToMany(models.Extra, {through: 'PizzaExtra'})
  }

  return Pizza
}
