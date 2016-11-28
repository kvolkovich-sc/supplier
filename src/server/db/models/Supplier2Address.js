import Sequelize from 'sequelize';

module.exports = function(sequelize) {
  /**
   * Supplier to address association
   */
  let Supplier2Address = sequelize.define('Supplier2Address', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Supplier2AddressSN"
    },
    type: {
      type: Sequelize.STRING(10),
      allowNull: false,
      field: "Type"
    },
    addressId: {
      type: Sequelize.STRING(30),
      allowNull: false,
      field: "AddressID",
      validate: {
        notEmpty: true
      }
    },
    supplierId: {
      type: Sequelize.STRING(30),
      allowNull: false,
      field: "SupplierID",
      validate: {
        notEmpty: true
      }
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
      field: "IsDefault"
    },
    changedBy: {
      type: Sequelize.STRING(60),
      field: "ChangedBy"
    },
    createdBy: {
      type: Sequelize.STRING(60),
      field: "CreatedBy"
    },
    createdOn: {
      type: Sequelize.DATE,
      field: "CreatedOn"
    },
    changedOn: {
      type: Sequelize.DATE,
      field: "ChangedOn"
    }
  },
    {
      classMethods: {
        associate: function(models) {
        // associations can be defined here
          Supplier2Address.belongsTo(models.Supplier, { as: 'supplier', foreignKey: 'supplierId' });
          Supplier2Address.belongsTo(models.Address,
            {
              as: 'address',
              foreignKey: 'addressId',
              targetKey: 'addressId',
              onDelete: 'cascade',
              hooks: true
            });
        }
      },
      updatedAt: 'changedOn',
      createdAt: 'createdOn',
      timestamps: true,
      freezeTableName: true,
      tableName: 'SIMSupplier2Address',
    });

  return Supplier2Address;
};
