const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const JobPosting = require('./JobPosting');
const User = require('./User');

const Application = sequelize.define('Application', {
    job_posting_id: {
        type: DataTypes.INTEGER,
        references: {
            model: JobPosting,
            key: 'id'
        },
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    application_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Application',
    timestamps: false
});

Application.belongsTo(JobPosting, { foreignKey: 'job_posting_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Application;
