var bcrypt = require ('bcrypt');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[6, 10]
        }
      }
    });

    //Password need to be encrypted
    User.beforeCreate((user, options) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
    });

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    return User;
  };
