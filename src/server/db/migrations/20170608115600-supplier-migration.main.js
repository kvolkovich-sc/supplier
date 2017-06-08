const Sequelize = require("sequelize");

module.exports = {

  up: function (db) {
    let queryInterface = db.getQueryInterface();

    return queryInterface.createTable('SupplierBankAccount', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
      },

      accountNumber: {
        field: 'IBAN',
        type: Sequelize.STRING(35),
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      bankCountryKey: {
        field: 'BankCountryKey',
        type: Sequelize.STRING(2),
        validate: {
          notEmpty: true
        }
      },

      bankCode: {
        field: 'BankCode',
        type: Sequelize.STRING(12),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      bankName: {
        field: 'BankName',
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      bankIdentificationCode: {
        field: 'BIC',
        type: Sequelize.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      bankAccountId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: 'BankAccountID'
      },

      supplierId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'SupplierID'
      },

      changedBy: {
        type: Sequelize.STRING(60),
        field: "ChangedBy",
        allowNull: false
      },

      createdBy: {
        type: Sequelize.STRING(60),
        field: "CreatedBy",
        allowNull: false
      },

      createdOn: {
        type: Sequelize.DATE,
        field: "CreatedOn",
        allowNull: false
      },

      changedOn: {
        type: Sequelize.DATE,
        field: "ChangedOn",
        allowNull: false
      },

      extBankControlKey: {
        field: 'ExternalBankControlKey',
        type: Sequelize.STRING(2)
      },

      swiftCode: {
        field: 'SwiftCode',
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },



    });
  },

  down: function (db) {
    let queryInterface = db.getQueryInterface();
    return queryInterface.dropTable('SupplierBankAccount');
  }
};
