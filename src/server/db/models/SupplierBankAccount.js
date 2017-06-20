'use strict';
const Sequelize = require('sequelize');
const iban = require('../../utils/validators/iban.js');
const bic = require('../../utils/validators/bic.js');

module.exports = function (sequelize, config) {

  return sequelize.define('SupplierBankAccount',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
      },

      accountNumber: {
        field: 'AccountNumber',
        type: Sequelize.STRING(35),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValid(value) {
            if (iban.isInvalid(value)) throw new Error('accountNumber value is invalid');
          }
        }
      },

      bankAccountId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'BankAccountID',
        unique: true,
        validate: {
          notEmpty: true
        }
      },

      supplierId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'SupplierID',
        unique: true,
        validate: {
          notEmpty: true
        }
      },

      bankIdentificationCode: {
        field: 'BankIdentificationCode',
        type: Sequelize.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValid(value) {
            if (bic.isInvalid(value)) throw new Error('bankIdentificationCode value is invalid');
          }
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

      createdOn: {
        field: 'CreatedOn',
        type: Sequelize.DATE,
        allowNull: false
      },

      createdBy: {
        field: 'CreatedBy',
        type: Sequelize.STRING(60),
        allowNull: false
      },

      changedOn: {
        field: 'ChangedOn',
        type: Sequelize.DATE,
        allowNull: false
      },

      changedBy: {
        field: 'ChangedBy',
        type: Sequelize.STRING(60),
        allowNull: false
      },

      extBankControlKey: {
        field: 'ExtBankControlKey',
        type: Sequelize.STRING(2)
      },

      swiftCode: {
        field: 'SwiftCode',
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValid(value) {
            if (bic.isInvalid(value)) throw new Error('swiftCode value is invalid');
          }
        }
      }

    }, {
      updatedAt: 'changedOn',
      createdAt: 'createdOn',
      timestamps: true,
      freezeTableName: true,
      tableName: 'SupplierBankAccount'
    });
};
