'use strict';
import Sequelize from 'sequelize';

module.exports = function(sequelize, config) {

  /**
   * @class SupplierFinancials
   */
  let SupplierFinancials = sequelize.define('SupplierFinancials',

  /** @lends SupplierFinancials */
  {
    /** internal identifier */
    id: {
      field: 'SupplierFinancialsSN',
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** supplier id */
    supplierId: {
      field: 'SupplierID',
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** year */
    year: {
      field: 'Year',
      type: Sequelize.DATE(),
      validate: {
        notEmpty: true,
        uniqueYearForSupplierValidate: function(value, next) {
          if (!this.id && this.supplierId) {
            if (process.env.NODE_ENV === 'test') {
              // Selecting financials from sqlite (sqlite doesn't have function YEAR for date values)
              let now = new Date();
              now.setDate(1);
              now.setMonth(0);
              now.setFullYear(now.getFullYear() - 3);
              SupplierFinancials.findAll({
                where: {
                  supplierId: this.supplierId,
                  year: {
                    $gte: now
                  }
                }
              }).then(supplierFinancials => {
                let isValid = true;
                if (supplierFinancials && supplierFinancials.length > 0) {
                  supplierFinancials.forEach(financials => {
                    if (financials.year.getFullYear() === this.year.getFullYear()) {
                      isValid = false;
                    }
                  });
                  if (isValid) {
                    next();
                  } else {
                    next(`Supplier Financials for ${this.year.getFullYear()} year already exists`);
                  }
                } else {
                  next();
                }
              });
            } else {
              SupplierFinancials.findOne({
                where: {
                  $and: [
                    sequelize.where(sequelize.fn('YEAR', sequelize.col('year')), this.year.getFullYear()),
                    {
                      supplierId: this.supplierId
                    }
                  ]
                }
              }).then(supplierFinancials => {
                if (supplierFinancials) {
                  next(`Supplier Financials for ${this.year.getFullYear()} year already exists`);
                } else {
                  next();
                }
              });
            }
          } else {
            next();
          }
        }
      }
    },
    noOfEmployees: {
      field: 'NoOfEmployees',
      type: Sequelize.INTEGER(),
      allowNull: true
    },
    noOfEmployeesDetails: {
      field: 'NoOfEmployeesDetails',
      type: Sequelize.STRING(200),
      allowNull: true
    },
    customerDetails: {
      field: 'CustomerDetails',
      type: Sequelize.STRING(200),
      allowNull: true
    },
    currencyId: {
      field: 'CurrencyID',
      type: Sequelize.STRING(3),
      allowNull: true
    },
    revenue: {
      field: 'Revenue',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    revenueDetails: {
      field: 'RevenueDetails',
      type: Sequelize.STRING(),
      allowNull: true
    },
    profit: {
      field: 'Profit',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    capitalAssets: {
      field: 'CapitalAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    floatingAssets: {
      field: 'FloatingAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    totalAssets: {
      field: 'TotalAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    equity: {
      field: 'Equity',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    debt: {
      field: 'Debt',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    shareholders: {
      field: 'Shareholders',
      type: Sequelize.STRING(),
      allowNull: true
    },
    ratedByInstitute: {
      field: 'RatedByInstitute',
      type: Sequelize.STRING(20),
      allowNull: true
    },
    ratedFinancialStanding: {
      field: 'RatedFinancialStanding',
      type: Sequelize.STRING(10),
      allowNull: true
    },
    commentary: {
      field: 'Commentary',
      type: Sequelize.STRING(),
      allowNull: true
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
    updatedAt: 'changedOn',
    createdAt: 'createdOn',
    timestamps: true,
    freezeTableName: true,
    tableName: 'SupplierFinancials'
  });

  return SupplierFinancials;
};
