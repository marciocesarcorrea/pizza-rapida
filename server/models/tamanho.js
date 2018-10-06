module.exports = (sequelize, DataTypes) => {
  const Tamanho = sequelize.define('Tamanho', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tempo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})

  Tamanho.associate = function (models) {
    Tamanho.hasMany(models.Pizza)
  }

  return Tamanho
}
