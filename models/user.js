module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1 ,140]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 140]
    }
    
  });
  
  return User;
};
