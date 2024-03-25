const http = require('http');

const fs = require('fs').promises;
const path = require('path');

const colors = require('colors');
const parseOptions = require("./utils/parse-options");
const log = require("./utils/log");
const getIPv4Address = require('./utils/get-ip-address');
const publicRoute = require('./routes/public')

//Routing Table
const endpoints = {

    '/public': publicRoute,

}

const listener = (req, res) => {
    //creates a URL based on the request
    const url = new URL(req.url, `http://${req.headers.host}`);
    //correctly iterates through the endpoints object
    for(const entry of Object.entries(endpoints)){
        //represents the beginning of the URL
        const path = entry[0];
        //represents the list of possible functions
        const listOfHandlers = endpoints[path];
        if(url.pathname.startsWith(path)){
            if(listOfHandlers[req.method]){
                
                console.log(colors.bgGreen('Matching Method Found: '));
                //does this path know how to handle the corresponding entry (function)
                const handler = listOfHandlers[req.method];
                if(handler){
                    //bc we return, our handler should ALWAYS close the connection using res.end()
                    return handler(req, res);
                }

                res.statusCode = 405;
                return res.end();
            }
            res.statusCode = 500;
            return res.end();
        }
    }
}

// -------------------------------------------

const addr = getIPv4Address();
//include -p followed by number in cmd line argument
const { port } = parseOptions({ port: "p" });

const portNum = +port;
console.log(colors.bgWhite(addr + ':' + portNum));

if (!portNum) {
    // this won't work unless you've imported the log file
    log.fatal("No port provided", 1);
}

//listener(testRequest, testResponse);
var server = http.createServer(listener);
server.listen(parseInt(portNum, 10));
console.log(`Node.js web server at port ${portNum} is running...`);