const http = require('http');
const logger = require('./logger');
const apis = require('./config/api-config');


const httpServer = http.createServer(apis.app);

httpServer.listen(51001,function(){
    logger.info('node server started on port 51001');
});
