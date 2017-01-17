'use strict';
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  /**
   * <p>Supplier - organization that provides Products to buyers. Supplier has (is
   * owner of) several ProductCatalogs.</p>
   */
  let Supplier = sequelize.define('Supplier', {
    supplierId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["[a-zA-Z_\\-0-9]+"]
      },
      field: "SupplierID"
    },
    supplierName: {
      allowNull: true,
      type: Sequelize.STRING(50),
      field: "SupplierName"
    },
    foundedOn: {
      allowNull: true,
      type: Sequelize.DATE(),
      field: "FoundedOn"
    },
    legalForm: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "LegalForm"
    },
    registrationNumber: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "RegistrationNumber"
    },
    cityOfRegistration: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "CityOfRegistration"
    },
    countryOfRegistration: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "CountryOfRegistration"
    },
    taxId: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "TaxID"
    },
    vatRegNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "VatRegNo"
    },
    globalLocationNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "GlobalLocationNo"
    },
    homePage: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "HomePage"
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING(25),
      field: "Role"
    },
    dunsNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "DUNSNo"
    },
    status: {
      allowNull: true,
      type: Sequelize.STRING(100),
      field: "Status"
    },
    rejectionReason: {
      allowNull: true,
      type: Sequelize.STRING(2000),
      field: "RejectionReason"
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
  }, {
    getterMethods: {
      _objectLabel: function() {
        return this.supplierName ? this.supplierName + ' (' + this.supplierId + ')' : this.supplierId
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    updatedAt: 'changedOn',
    createdAt: 'createdOn',
    timestamps: true,
    freezeTableName: true,
    tableName: 'SIMSupplier' // needs to be just supplier in future
  });

  return Supplier;
};
