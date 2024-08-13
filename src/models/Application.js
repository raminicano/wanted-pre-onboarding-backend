const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const JobPosting = require('./JobPosting');
const User = require('./User');

const Application = sequelize.define('Application', {
    application_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Application.belongsTo(JobPosting, { foreignKey: 'job_posting_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Application;
