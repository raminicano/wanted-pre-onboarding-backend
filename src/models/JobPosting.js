const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./Company');

const JobPosting = sequelize.define('JobPosting', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reward: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    technology: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'JobPosting',
    timestamps: false
});

JobPosting.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = JobPosting;
