'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('meetings', [
            {
                subject: 'Lunch time',
                startTime: '2021-08-09 11:00:00',
                endTime: '2021-08-09 12:00:00',
                isBlock: true,
                isReadonly: true,
                recurrenceRule: "FREQ=DAILY;INTERVAL=1",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                subject: 'Meeting DB',
                startTime: '2021-08-09 08:00:00',
                endTime: '2021-08-09 09:00:00',
                isBlock: false,
                isReadonly: false,
                meetingUrl: 'https://us05web.zoom.us/j/84045031701?pwd=NGIzTXV2SUEzS2cxTjQzMmt4SnkrZz09',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('meetings', null, {});
    }
};
