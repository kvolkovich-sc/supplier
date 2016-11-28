'use strict';
import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  const User2Supplier = sequelize.define('User2Supplier', {
    loginName: {
      field: 'LoginName',
      type: Sequelize.STRING(50),
      primaryKey: true
    },
    supplierId: {
      field: "SupplierID",
      type: Sequelize.STRING(30),
      primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User2Supplier.belongsTo(models.Supplier, {
        models.Supplier.hasMany(User2Supplier, {
          foreignKey: {
            name: 'SupplierID',  // User2Supplier's column name, not sequelize model field.
            allowNull: false,
            onDelete: 'cascade' // Delete User2Supplier row after Supplier's row deletion.
          }
        });
      }
    },
    tableName: 'CatalogUser2Supplier',
    timestamps: false,
    freezeTableName: true,
    indexes: [{
      fields: ['SupplierID']  // DB column name, not sequelize model field.
    }]
  });

  return User2Supplier;
};
