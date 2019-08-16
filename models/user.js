module.exports = function(sequelize, DataTypes){
    var User = sequlized.define("User",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name : {
            type : DataTypes.String,
            allowNull : false
        },
        password : {
            type : DataTypes.String,
            allowNull : false,
            validate : {
                len : [8,22]
            }
        }
    });

    return User;
}