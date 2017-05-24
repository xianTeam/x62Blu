const ReactNative = require('react-native');
const {Buffer} = require('buffer');
const {NativeModules, DeviceEventEmitter, Platform} = ReactNative;
const RECEIPT = require('./common/receipt');
const LABEL = require('./common/label');
const Util = require('./common/utility');

let XIAN62Bluetooth = NativeModules.XIAN62Bluetooth;
if(Platform.OS === 'ios'){
    XIAN62Bluetooth = NativeModules.XIAN62Bluetooth;
}

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
XIAN62Bluetooth.on = (eventName, handler) => {
    DeviceEventEmitter.addListener(eventName, handler)
};

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
XIAN62Bluetooth.removeListener = (eventName, handler) => {
    DeviceEventEmitter.removeListener(eventName, handler)
};

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
XIAN62Bluetooth.write = (data) => {
    if (typeof data === 'string') {
        data = new Buffer(data)
    }
    return XIAN62Bluetooth.writeToDevice(data.toString('base64'))
};

XIAN62Bluetooth.RECEIPT = RECEIPT;
XIAN62Bluetooth.LABEL = LABEL;
XIAN62Bluetooth.Util = Util;

LABEL._setBT(XIAN62Bluetooth);
RECEIPT._setBT(XIAN62Bluetooth);

module.exports = XIAN62Bluetooth;
