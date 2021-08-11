'use strict';

const tableName = "meetings";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(tableName,
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                subject: {
                    type: Sequelize.STRING,
                },
                startTime: {
                    type: Sequelize.DATE,
                },
                endTime: {
                    type: Sequelize.DATE,
                },
                meetingUrl: {
                    type: Sequelize.STRING,
                },
                isBlock: {
                    type: Sequelize.BOOLEAN,
                },
                isReadonly: {
                    type: Sequelize.BOOLEAN,
                },
                recurrenceRule: {
                    type: Sequelize.STRING,
                },
                createdAt: {
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    type: Sequelize.STRING,
                },
            },
            {
                schema: "public"
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable({tableName: tableName});
    }
};
