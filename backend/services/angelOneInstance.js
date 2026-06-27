

let _instance = null;

const setInstance = (instance) => { _instance = instance; };
const getInstance = () => _instance;

module.exports = { setInstance, getInstance };