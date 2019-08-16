module.exports = function(sequelize, DataTypes){
    var Games = sequlized.define("Games",{
        rounds : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 5
        },
        bullets : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 10
        },
        hp : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 100
        },
        score : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
    });

    return User;
}