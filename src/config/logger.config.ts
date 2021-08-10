export function logPrettyPrint() {
    // Log Prettifier is disabled on production and test environments for performance reasons
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
        return false;
    }
    return {
        levelFirst: true,
        translateTime: true,
        colorize: true,
    };
}

export default {
    name: 'API',
    level: process.env.LOG_LEVEL || 'trace',
    prettyPrint: logPrettyPrint(),
    base: {},
};


