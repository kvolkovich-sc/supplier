'use strict';
import Sequelize from 'sequelize';

module.exports = function(sequelize, config) {

  /**
   * @class CertificationGroup
   */
  let CertificationGroup = sequelize.define('CertificationGroup',

  /** @lends CertificationGroup */
  {
    certificationGroupId: {
      field: 'CertificationGroupID',
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      field: 'Description',
      type: Sequelize.STRING(50),
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        CertificationGroup.hasMany(models.Certification, {
          as: 'certification',
          foreignKey: 'certificationGroupId',
          targetKey: 'certificationGroupId'
        });
      }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'CertificationGroup'
  });

  return CertificationGroup;
};
