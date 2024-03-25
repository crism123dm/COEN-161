const os = require("os");

/**
 * @function getIPv4Address
 * @description retrieves the first network interface serving an ipv4 address
 *              that isn't the loopback address. If none is found, then the
 *              loopback address is provided.
 */
const getIPv4Address = () => {
  for (const [name, ifaces] of Object.entries(os.networkInterfaces())) {
    for (const i of ifaces) {
      // skip loopback address
      if (name.startsWith("lo")) {
        continue;
      }

      if (i.family === "IPv4") {
        return i.address;
      }
    }
  }

  // default to loopback address
  return "127.0.0.1";
};

module.exports = getIPv4Address;
