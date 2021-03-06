const Sequelize = require("sequelize");
var countries = [{
  countryName: "Afghanistan",
  countryId: "AF"
}, {
  countryName: "Åland Islands",
  countryId: "AX"
}, {
  countryName: "Albania",
  countryId: "AL"
}, {
  countryName: "Algeria",
  countryId: "DZ"
}, {
  countryName: "American Samoa",
  countryId: "AS"
}, {
  countryName: "Andorra",
  countryId: "AD"
}, {
  countryName: "Angola",
  countryId: "AO"
}, {
  countryName: "Anguilla",
  countryId: "AI"
}, {
  countryName: "Antarctica",
  countryId: "AQ"
}, {
  countryName: "Antigua and Barbuda",
  countryId: "AG"
}, {
  countryName: "Argentina",
  countryId: "AR"
}, {
  countryName: "Armenia",
  countryId: "AM"
}, {
  countryName: "Aruba",
  countryId: "AW"
}, {
  countryName: "Australia",
  countryId: "AU"
}, {
  countryName: "Austria",
  countryId: "AT"
}, {
  countryName: "Azerbaijan",
  countryId: "AZ"
}, {
  countryName: "Bahamas",
  countryId: "BS"
}, {
  countryName: "Bahrain",
  countryId: "BH"
}, {
  countryName: "Bangladesh",
  countryId: "BD"
}, {
  countryName: "Barbados",
  countryId: "BB"
}, {
  countryName: "Belarus",
  countryId: "BY"
}, {
  countryName: "Belgium",
  countryId: "BE"
}, {
  countryName: "Belize",
  countryId: "BZ"
}, {
  countryName: "Benin",
  countryId: "BJ"
}, {
  countryName: "Bermuda",
  countryId: "BM"
}, {
  countryName: "Bhutan",
  countryId: "BT"
}, {
  countryName: "Bolivia, Plurinational State of",
  countryId: "BO"
}, {
  countryName: "Bonaire, Sint Eustatius and Saba",
  countryId: "BQ"
}, {
  countryName: "Bosnia and Herzegovina",
  countryId: "BA"
}, {
  countryName: "Botswana",
  countryId: "BW"
}, {
  countryName: "Bouvet Island",
  countryId: "BV"
}, {
  countryName: "Brazil",
  countryId: "BR"
}, {
  countryName: "British Indian Ocean Territory",
  countryId: "IO"
}, {
  countryName: "Brunei Darussalam",
  countryId: "BN"
}, {
  countryName: "Bulgaria",
  countryId: "BG"
}, {
  countryName: "Burkina Faso",
  countryId: "BF"
}, {
  countryName: "Burundi",
  countryId: "BI"
}, {
  countryName: "Cambodia",
  countryId: "KH"
}, {
  countryName: "Cameroon",
  countryId: "CM"
}, {
  countryName: "Canada",
  countryId: "CA"
}, {
  countryName: "Cape Verde",
  countryId: "CV"
}, {
  countryName: "Cayman Islands",
  countryId: "KY"
}, {
  countryName: "Central African Republic",
  countryId: "CF"
}, {
  countryName: "Chad",
  countryId: "TD"
}, {
  countryName: "Chile",
  countryId: "CL"
}, {
  countryName: "China",
  countryId: "CN"
}, {
  countryName: "Christmas Island",
  countryId: "CX"
}, {
  countryName: "Cocos (Keeling) Islands",
  countryId: "CC"
}, {
  countryName: "Colombia",
  countryId: "CO"
}, {
  countryName: "Comoros",
  countryId: "KM"
}, {
  countryName: "Congo",
  countryId: "CG"
}, {
  countryName: "Congo, the Democratic Republic of the",
  countryId: "CD"
}, {
  countryName: "Cook Islands",
  countryId: "CK"
}, {
  countryName: "Costa Rica",
  countryId: "CR"
}, {
  countryName: "Côte d'Ivoire",
  countryId: "CI"
}, {
  countryName: "Croatia",
  countryId: "HR"
}, {
  countryName: "Cuba",
  countryId: "CU"
}, {
  countryName: "Curaçao",
  countryId: "CW"
}, {
  countryName: "Cyprus",
  countryId: "CY"
}, {
  countryName: "Czech Republic",
  countryId: "CZ"
}, {
  countryName: "Denmark",
  countryId: "DK"
}, {
  countryName: "Djibouti",
  countryId: "DJ"
}, {
  countryName: "Dominica",
  countryId: "DM"
}, {
  countryName: "Dominican Republic",
  countryId: "DO"
}, {
  countryName: "Ecuador",
  countryId: "EC"
}, {
  countryName: "Egypt",
  countryId: "EG"
}, {
  countryName: "El Salvador",
  countryId: "SV"
}, {
  countryName: "Equatorial Guinea",
  countryId: "GQ"
}, {
  countryName: "Eritrea",
  countryId: "ER"
}, {
  countryName: "Estonia",
  countryId: "EE"
}, {
  countryName: "Ethiopia",
  countryId: "ET"
}, {
  countryName: "Falkland Islands (Malvinas)",
  countryId: "FK"
}, {
  countryName: "Faroe Islands",
  countryId: "FO"
}, {
  countryName: "Fiji",
  countryId: "FJ"
}, {
  countryName: "Finland",
  countryId: "FI"
}, {
  countryName: "France",
  countryId: "FR"
}, {
  countryName: "French Guiana",
  countryId: "GF"
}, {
  countryName: "French Polynesia",
  countryId: "PF"
}, {
  countryName: "French Southern Territories",
  countryId: "TF"
}, {
  countryName: "Gabon",
  countryId: "GA"
}, {
  countryName: "Gambia",
  countryId: "GM"
}, {
  countryName: "Georgia",
  countryId: "GE"
}, {
  countryName: "Germany",
  countryId: "DE"
}, {
  countryName: "Ghana",
  countryId: "GH"
}, {
  countryName: "Gibraltar",
  countryId: "GI"
}, {
  countryName: "Greece",
  countryId: "GR"
}, {
  countryName: "Greenland",
  countryId: "GL"
}, {
  countryName: "Grenada",
  countryId: "GD"
}, {
  countryName: "Guadeloupe",
  countryId: "GP"
}, {
  countryName: "Guam",
  countryId: "GU"
}, {
  countryName: "Guatemala",
  countryId: "GT"
}, {
  countryName: "Guernsey",
  countryId: "GG"
}, {
  countryName: "Guinea",
  countryId: "GN"
}, {
  countryName: "Guinea-Bissau",
  countryId: "GW"
}, {
  countryName: "Guyana",
  countryId: "GY"
}, {
  countryName: "Haiti",
  countryId: "HT"
}, {
  countryName: "Heard Island and McDonald Islands",
  countryId: "HM"
}, {
  countryName: "Holy See (Vatican City State)",
  countryId: "VA"
}, {
  countryName: "Honduras",
  countryId: "HN"
}, {
  countryName: "Hong Kong",
  countryId: "HK"
}, {
  countryName: "Hungary",
  countryId: "HU"
}, {
  countryName: "Iceland",
  countryId: "IS"
}, {
  countryName: "India",
  countryId: "IN"
}, {
  countryName: "Indonesia",
  countryId: "ID"
}, {
  countryName: "Iran, Islamic Republic of",
  countryId: "IR"
}, {
  countryName: "Iraq",
  countryId: "IQ"
}, {
  countryName: "Ireland",
  countryId: "IE"
}, {
  countryName: "Isle of Man",
  countryId: "IM"
}, {
  countryName: "Israel",
  countryId: "IL"
}, {
  countryName: "Italy",
  countryId: "IT"
}, {
  countryName: "Jamaica",
  countryId: "JM"
}, {
  countryName: "Japan",
  countryId: "JP"
}, {
  countryName: "Jersey",
  countryId: "JE"
}, {
  countryName: "Jordan",
  countryId: "JO"
}, {
  countryName: "Kazakhstan",
  countryId: "KZ"
}, {
  countryName: "Kenya",
  countryId: "KE"
}, {
  countryName: "Kiribati",
  countryId: "KI"
}, {
  countryName: "Korea, Democratic People's Republic of",
  countryId: "KP"
}, {
  countryName: "Korea, Republic of",
  countryId: "KR"
}, {
  countryName: "Kuwait",
  countryId: "KW"
}, {
  countryName: "Kyrgyzstan",
  countryId: "KG"
}, {
  countryName: "Lao People's Democratic Republic",
  countryId: "LA"
}, {
  countryName: "Latvia",
  countryId: "LV"
}, {
  countryName: "Lebanon",
  countryId: "LB"
}, {
  countryName: "Lesotho",
  countryId: "LS"
}, {
  countryName: "Liberia",
  countryId: "LR"
}, {
  countryName: "Libya",
  countryId: "LY"
}, {
  countryName: "Liechtenstein",
  countryId: "LI"
}, {
  countryName: "Lithuania",
  countryId: "LT"
}, {
  countryName: "Luxembourg",
  countryId: "LU"
}, {
  countryName: "Macao",
  countryId: "MO"
}, {
  countryName: "Macedonia, the Former Yugoslav Republic of",
  countryId: "MK"
}, {
  countryName: "Madagascar",
  countryId: "MG"
}, {
  countryName: "Malawi",
  countryId: "MW"
}, {
  countryName: "Malaysia",
  countryId: "MY"
}, {
  countryName: "Maldives",
  countryId: "MV"
}, {
  countryName: "Mali",
  countryId: "ML"
}, {
  countryName: "Malta",
  countryId: "MT"
}, {
  countryName: "Marshall Islands",
  countryId: "MH"
}, {
  countryName: "Martinique",
  countryId: "MQ"
}, {
  countryName: "Mauritania",
  countryId: "MR"
}, {
  countryName: "Mauritius",
  countryId: "MU"
}, {
  countryName: "Mayotte",
  countryId: "YT"
}, {
  countryName: "Mexico",
  countryId: "MX"
}, {
  countryName: "Micronesia, Federated States of",
  countryId: "FM"
}, {
  countryName: "Moldova, Republic of",
  countryId: "MD"
}, {
  countryName: "Monaco",
  countryId: "MC"
}, {
  countryName: "Mongolia",
  countryId: "MN"
}, {
  countryName: "Montenegro",
  countryId: "ME"
}, {
  countryName: "Montserrat",
  countryId: "MS"
}, {
  countryName: "Morocco",
  countryId: "MA"
}, {
  countryName: "Mozambique",
  countryId: "MZ"
}, {
  countryName: "Myanmar",
  countryId: "MM"
}, {
  countryName: "Namibia",
  countryId: "NA"
}, {
  countryName: "Nauru",
  countryId: "NR"
}, {
  countryName: "Nepal",
  countryId: "NP"
}, {
  countryName: "Netherlands",
  countryId: "NL"
}, {
  countryName: "New Caledonia",
  countryId: "NC"
}, {
  countryName: "New Zealand",
  countryId: "NZ"
}, {
  countryName: "Nicaragua",
  countryId: "NI"
}, {
  countryName: "Niger",
  countryId: "NE"
}, {
  countryName: "Nigeria",
  countryId: "NG"
}, {
  countryName: "Niue",
  countryId: "NU"
}, {
  countryName: "Norfolk Island",
  countryId: "NF"
}, {
  countryName: "Northern Mariana Islands",
  countryId: "MP"
}, {
  countryName: "Norway",
  countryId: "NO"
}, {
  countryName: "Oman",
  countryId: "OM"
}, {
  countryName: "Pakistan",
  countryId: "PK"
}, {
  countryName: "Palau",
  countryId: "PW"
}, {
  countryName: "Palestine, State of",
  countryId: "PS"
}, {
  countryName: "Panama",
  countryId: "PA"
}, {
  countryName: "Papua New Guinea",
  countryId: "PG"
}, {
  countryName: "Paraguay",
  countryId: "PY"
}, {
  countryName: "Peru",
  countryId: "PE"
}, {
  countryName: "Philippines",
  countryId: "PH"
}, {
  countryName: "Pitcairn",
  countryId: "PN"
}, {
  countryName: "Poland",
  countryId: "PL"
}, {
  countryName: "Portugal",
  countryId: "PT"
}, {
  countryName: "Puerto Rico",
  countryId: "PR"
}, {
  countryName: "Qatar",
  countryId: "QA"
}, {
  countryName: "Réunion",
  countryId: "RE"
}, {
  countryName: "Romania",
  countryId: "RO"
}, {
  countryName: "Russian Federation",
  countryId: "RU"
}, {
  countryName: "Rwanda",
  countryId: "RW"
}, {
  countryName: "Saint Barthélemy",
  countryId: "BL"
}, {
  countryName: "Saint Helena, Ascension and Tristan da Cunha",
  countryId: "SH"
}, {
  countryName: "Saint Kitts and Nevis",
  countryId: "KN"
}, {
  countryName: "Saint Lucia",
  countryId: "LC"
}, {
  countryName: "Saint Martin (French part)",
  countryId: "MF"
}, {
  countryName: "Saint Pierre and Miquelon",
  countryId: "PM"
}, {
  countryName: "Saint Vincent and the Grenadines",
  countryId: "VC"
}, {
  countryName: "Samoa",
  countryId: "WS"
}, {
  countryName: "San Marino",
  countryId: "SM"
}, {
  countryName: "Sao Tome and Principe",
  countryId: "ST"
}, {
  countryName: "Saudi Arabia",
  countryId: "SA"
}, {
  countryName: "Senegal",
  countryId: "SN"
}, {
  countryName: "Serbia",
  countryId: "RS"
}, {
  countryName: "Seychelles",
  countryId: "SC"
}, {
  countryName: "Sierra Leone",
  countryId: "SL"
}, {
  countryName: "Singapore",
  countryId: "SG"
}, {
  countryName: "Sint Maarten (Dutch part)",
  countryId: "SX"
}, {
  countryName: "Slovakia",
  countryId: "SK"
}, {
  countryName: "Slovenia",
  countryId: "SI"
}, {
  countryName: "Solomon Islands",
  countryId: "SB"
}, {
  countryName: "Somalia",
  countryId: "SO"
}, {
  countryName: "South Africa",
  countryId: "ZA"
}, {
  countryName: "South Georgia and the South Sandwich Islands",
  countryId: "GS"
}, {
  countryName: "South Sudan",
  countryId: "SS"
}, {
  countryName: "Spain",
  countryId: "ES"
}, {
  countryName: "Sri Lanka",
  countryId: "LK"
}, {
  countryName: "Sudan",
  countryId: "SD"
}, {
  countryName: "Suriname",
  countryId: "SR"
}, {
  countryName: "Svalbard and Jan Mayen",
  countryId: "SJ"
}, {
  countryName: "Swaziland",
  countryId: "SZ"
}, {
  countryName: "Sweden",
  countryId: "SE"
}, {
  countryName: "Switzerland",
  countryId: "CH"
}, {
  countryName: "Syrian Arab Republic",
  countryId: "SY"
}, {
  countryName: "Taiwan, Province of China",
  countryId: "TW"
}, {
  countryName: "Tajikistan",
  countryId: "TJ"
}, {
  countryName: "Tanzania, United Republic of",
  countryId: "TZ"
}, {
  countryName: "Thailand",
  countryId: "TH"
}, {
  countryName: "Timor-Leste",
  countryId: "TL"
}, {
  countryName: "Togo",
  countryId: "TG"
}, {
  countryName: "Tokelau",
  countryId: "TK"
}, {
  countryName: "Tonga",
  countryId: "TO"
}, {
  countryName: "Trinidad and Tobago",
  countryId: "TT"
}, {
  countryName: "Tunisia",
  countryId: "TN"
}, {
  countryName: "Turkey",
  countryId: "TR"
}, {
  countryName: "Turkmenistan",
  countryId: "TM"
}, {
  countryName: "Turks and Caicos Islands",
  countryId: "TC"
}, {
  countryName: "Tuvalu",
  countryId: "TV"
}, {
  countryName: "Uganda",
  countryId: "UG"
}, {
  countryName: "Ukraine",
  countryId: "UA"
}, {
  countryName: "United Arab Emirates",
  countryId: "AE"
}, {
  countryName: "United Kingdom",
  countryId: "GB"
}, {
  countryName: "United States",
  countryId: "US"
}, {
  countryName: "United States Minor Outlying Islands",
  countryId: "UM"
}, {
  countryName: "Uruguay",
  countryId: "UY"
}, {
  countryName: "Uzbekistan",
  countryId: "UZ"
}, {
  countryName: "Vanuatu",
  countryId: "VU"
}, {
  countryName: "Venezuela, Bolivarian Republic of",
  countryId: "VE"
}, {
  countryName: "Viet Nam",
  countryId: "VN"
}, {
  countryName: "Virgin Islands, British",
  countryId: "VG"
}, {
  countryName: "Virgin Islands, U.S.",
  countryId: "VI"
}, {
  countryName: "Wallis and Futuna",
  countryId: "WF"
}, {
  countryName: "Western Sahara",
  countryId: "EH"
}, {
  countryName: "Yemen",
  countryId: "YE"
}, {
  countryName: "Zambia",
  countryId: "ZM"
}, {
  countryName: "Zimbabwe",
  countryId: "ZW"
}];

module.exports = {
  up: function(queryInterface) {
    return Promise.all([

      queryInterface.createTable('SIMSupplier', {
        supplierId: {
          type: Sequelize.STRING(30),
          primaryKey: true,
          allowNull: false,
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
        }
      }).then(() => queryInterface.createTable('CatalogUser2Supplier', {
        loginName: {
          field: 'LoginName',
          type: Sequelize.STRING(50),
          primaryKey: true
          // references: {
          //   model: 'CatalogUser',
          //   key: 'LoginName'
          // }
        },
        supplierId: {
          field: 'SupplierID',
          type: Sequelize.STRING(30),
          primaryKey: true,
          references: {
            model: 'SIMSupplier',
            key: 'SupplierID'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      })).then(() => queryInterface.addIndex('CatalogUser2Supplier', ['SupplierID'])),

      queryInterface.createTable('SIMAddress', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'AddressSN'
        },
        addressId: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
          field: 'AddressID'
        },
        salutation: {
          type: Sequelize.STRING(20),
          field: 'Salutation'
        },
        name1: {
          type: Sequelize.STRING(100),
          field: 'Name1'
        },
        name2: {
          type: Sequelize.STRING(100),
          field: 'Name2'
        },
        name3: {
          type: Sequelize.STRING(100),
          field: 'Name3'
        },
        street: {
          type: Sequelize.STRING(50),
          field: 'Street'
        },
        zipCode: {
          type: Sequelize.STRING(10),
          field: 'ZipCode'
        },
        city: {
          type: Sequelize.STRING(50),
          field: 'City'
        },
        poboxZipCode: {
          type: Sequelize.STRING(10),
          field: 'POBoxZipCode'
        },
        pobox: {
          type: Sequelize.STRING(10),
          field: 'POBox'
        },
        isCompany: {
          type: Sequelize.BOOLEAN,
          field: 'IsCompany'
        },
        areaCode: {
          type: Sequelize.STRING(10),
          field: 'AreaCode'
        },
        phoneNo: {
          type: Sequelize.STRING(50),
          field: 'PhoneNo'
        },
        faxNo: {
          type: Sequelize.STRING(50),
          field: 'FaxNo'
        },
        email: {
          type: Sequelize.STRING(1024),
          field: 'EMail'
        },
        corporateURL: {
          type: Sequelize.STRING(1024),
          field: 'CorporateURL'
        },
        numOfEmployees: {
          type: Sequelize.INTEGER,
          field: 'NumOfEmployees'
        },
        countryId: {
          type: Sequelize.STRING(2),
          field: 'CountryID'
        },
        state: {
          type: Sequelize.STRING(50),
          field: 'State'
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
        }
      }),

      queryInterface.createTable('SIMSupplier2Address', {
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
        isDefault: {
          type: Sequelize.BOOLEAN,
          field: "IsDefault"
        },
        addressId: {
          type: Sequelize.STRING(30),
          allowNull: false,
          field: "AddressID"
        },
        supplierId: {
          type: Sequelize.STRING(30),
          allowNull: false,
          field: "SupplierID"
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
        }
      }).then(() => queryInterface.addIndex(
        'SIMSupplier2Address',
        [`SupplierID`, `AddressId`, `Type`],
        {
          indexName: 'SIMSupplier2AddressUK',
          indicesType: 'UNIQUE'
        }
      )),

      queryInterface.createTable('SIMSupplierContact', {
        contactId: {
          type: Sequelize.STRING(50),
          primaryKey: true,
          allowNull: false,
          field: "ContactId"
        },
        title: {
          type: Sequelize.STRING(20),
          field: "Title"
        },
        contactType: {
          type: Sequelize.STRING(10),
          field: "ContactType"
        },
        firstName: {
          type: Sequelize.STRING(100),
          allowNull: false,
          field: "FirstName"
        },
        lastName: {
          type: Sequelize.STRING(100),
          allowNull: false,
          field: "LastName"
        },
        email: {
          type: Sequelize.STRING(100),
          field: "Email"
        },
        phone: {
          type: Sequelize.STRING(20),
          field: "Phone"
        },
        mobile: {
          type: Sequelize.STRING(20),
          field: "Mobile"
        },
        department: {
          type: Sequelize.STRING(100),
          field: "Department"
        },
        fax: {
          type: Sequelize.STRING(20),
          field: "Fax"
        },
        supplierId: {
          type: Sequelize.STRING(30),
          field: "SupplierId"
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
        }
      }),

      queryInterface.createTable('Country', {
        countryId: {
          type: Sequelize.STRING(2),
          primaryKey: true,
          field: "CountryID"
        },
        countryName: {
          type: Sequelize.STRING(50),
          field: "CountryName",
          allowNull: false
        }
      }).then(() => queryInterface.sequelize.query(queryInterface.QueryGenerator.bulkInsertQuery(
        'Country',
        countries
      )))
    ]);
  },

  down: function(queryInterface) {
    return Promise.all([
      queryInterface.dropTable('CatalogUser2Supplier'),
      queryInterface.dropTable('SIMSupplier2Address'),
      queryInterface.dropTable('SIMAddress'),
      queryInterface.dropTable('SIMSupplier'),
      queryInterface.dropTable('SIMSupplierContact')
    ]);
  }
};
