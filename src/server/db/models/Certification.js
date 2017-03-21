'use strict';
import Sequelize from 'sequelize';

module.exports = function(sequelize, config) {

  /**
   * @class Certification
   */
  let Certification = sequelize.define('Certification',

  /** @lends Certification */
  {
    certificationId: {
      field: 'CertificationID',
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    certificationGroupId: {
      field: 'CertificationGroupID',
      type: Sequelize.STRING(20),
      allowNull: false,
      references: {
        model: 'certificationGroup',
        key: 'certificationGroupId'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    description: {
      field: 'Description',
      type: Sequelize.STRING(50),
      allowNull: true,
      validate: {
        notEmpty: false
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Certification.belongsTo(models.CertificationGroup, {
          as: 'certificationGroup',
          foreignKey: 'certificationGroupId',
          allowNull: false
        });
      }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'Certification',
    associations: true
  });

  return Certification;
};
