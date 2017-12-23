const coreServer = require('bplc-node-server');
const FakeCore = require('./fakeCore').FakeCore;

const fakeCore = new FakeCore();
const server = new coreServer.server(fakeCore, 8081);
server.init();
