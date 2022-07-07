"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logStartMessage = void 0;
const ip_1 = __importDefault(require("ip"));
const nanocolors_1 = require("nanocolors");
const createAddress = (config, host, path) => `http${config.http2 ? 's' : ''}://${host}:${config.port}${path}`;
function logNetworkAddress(config, logger, openPath) {
    try {
        const address = ip_1.default.address();
        if (typeof address === 'string') {
            logger.log(`${nanocolors_1.white('Network:')}  ${nanocolors_1.cyan(createAddress(config, address, openPath))}`);
        }
    }
    catch (_a) {
        //
    }
}
function logStartMessage(config, logger) {
    var _a;
    const prettyHost = (_a = config.hostname) !== null && _a !== void 0 ? _a : 'localhost';
    let openPath = typeof config.open === 'string' ? config.open : '/';
    if (!openPath.startsWith('/')) {
        openPath = `/${openPath}`;
    }
    logger.log(nanocolors_1.bold('Web Dev Server started...'));
    logger.log('');
    logger.group();
    logger.log(`${nanocolors_1.white('Root dir:')} ${nanocolors_1.cyan(config.rootDir)}`);
    logger.log(`${nanocolors_1.white('Local:')}    ${nanocolors_1.cyan(createAddress(config, prettyHost, openPath))}`);
    logNetworkAddress(config, logger, openPath);
    logger.groupEnd();
    logger.log('');
}
exports.logStartMessage = logStartMessage;
//# sourceMappingURL=logStartMessage.js.map