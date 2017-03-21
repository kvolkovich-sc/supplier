'use strict';
import Sequelize from 'sequelize';

module.exports = function(sequelize) {

  /**
   * @class SupplierCertification
   */
  let SupplierCertification = sequelize.define('SupplierCertification',

  /** @lends SupplierCertification */
  {
    id: {
      field: 'SupplierCertificationSN',
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    supplierId: {
      field: 'SupplierID',
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      field: 'Description',
      type: Sequelize.STRING(200),
      allowNull: true
    },
    issuedOn: {
      field: 'IssuedOn',
      type: Sequelize.DATE(),
      allowNull: true
    },
    issuedBy: {
      field: 'IssuedBy',
      type: Sequelize.STRING(50),
      allowNull: true
    },
    validFrom: {
      field: 'ValidFrom',
      type: Sequelize.DATE(),
      allowNull: true
    },
    validTo: {
      field: 'ValidTo',
      type: Sequelize.DATE(),
      allowNull: true,
      validate: {
        validRange: function(value, next) {
          if (this.validFrom && this.validTo && (this.validTo < this.validFrom)) {
            next('Valid To date is earlier than Valid From date');
          } else {
            next();
          }
        }
      }
    },
    certificationId: {
      field: 'CertificationID',
      type: Sequelize.STRING(20),
      allowNull: false,
      references: {
        model: 'Certification',
        key: 'certificationId'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        SupplierCertification.belongsTo(models.Certification, {
          as: 'certification',
          foreignKey: 'certificationId',
          targetKey: 'certificationId'
        });
      }
    },
    updatedAt: 'changedOn',
    createdAt: 'createdOn',
    timestamps: true,
    freezeTableName: true,
    tableName: 'SupplierCertification'
  });

  return SupplierCertification;
};
