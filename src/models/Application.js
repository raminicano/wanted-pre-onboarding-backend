const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const JobPosting = require('./JobPosting');
const User = require('./User');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    application_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Application',
    timestamps: false
});

Application.belongsTo(JobPosting, { foreignKey: 'job_posting_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Application;
