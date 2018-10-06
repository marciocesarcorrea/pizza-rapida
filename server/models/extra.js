module.exports = (sequelize, DataTypes) => {
  const Extra = sequelize.define('Extra', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    tempo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {})

  Extra.associate = function (models) {
    Extra.belongsToMany(models.Pizza, {through: 'PizzaExtra'})
  }
  return Extra
}
