// backend/services/angelOneState.js

let _isConnected = false;

const setConnected = (status) => { _isConnected = status; };
const isConnected  = () => _isConnected;

module.exports = { setConnected, isConnected };