module.exports = (sequelize, DataTypes) => {
  const Sabor = sequelize.define('Sabor', {
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

  Sabor.associate = function (models) {
    Sabor.hasMany(models.Pizza)
  }

  return Sabor
}
