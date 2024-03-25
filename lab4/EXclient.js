const log = require("./utils/log");
const mustBeNumber = require("./utils/must-be-number");
const parseOptions = require("./utils/parse-options");
const fetch = require("node-fetch");

const options = parseOptions({
    address: ["a"],
    port: ["p"],
    operation: ["o"],
})

let address = `http://`;
address += options.address ? options.address : "localhost";

let port = 3000;
if (options.port) {
  port = mustBeNumber("port", options.port);
}

const logFetchOutput = (p) => {
    p.then((response) => {
        if (!response.ok) {
            return Promise.reject(
              `Response from server after ${operation}
               was not ok: ${response.status}`
            );
        }
  
      if (response.headers["Content-Type"] === "application/json") {
          return response.json();
      }
  
      return response.text();
    })
    .then((message) => {
        log.info(`Response from ${operation}:\n ${message}`);
    })
    .catch((err) => {
        log.error(err);
    });
  };

  let questionText;

switch (options.operation.toLowerCase()) {
    case "create":
        if (!options.positional) {
        log.fatal("No question text was provided");
        }

        questionText = options.positional.join(" ");
        logFetchOutput( 
            fetch(`${address}:${port}/questions`, {
                method: "POST",
                headers: {
                    Date: Date.now(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: questionText }),
            })
        );
        break;
    //GET
    case "list":
        logFetchOutput(
            //SENDS AN HTTP REQUEST TO SERVER
            //the default method is GET
            fetch(`${address}:${port}/questions`)
            //don't need a body because we're not specifying anything, only getting)
        );
            
    default:
        log.fatal(`Operation ${operation} is not supported.`);

}