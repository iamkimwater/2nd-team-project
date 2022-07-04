/**
 * Logging from defined here
 */

function log(path, funcName, msg, params = null) {
  console.log(
    `> location: ${path}, func: ${funcName}, msg: "${msg}", params: ${params}`,
  );
}

function errorLog(path, funcName, msg, params = null) {
  console.log(
    `> ERROR! location: ${path}, func: ${funcName}, error: "${msg}", params: ${params}`,
  );
}

function httpLog(uri, funcName, msg) {
  console.log(`> url: ${uri}, func: ${funcName}, mag: "${msg}"`);
}

function httpErrorLog(uri, funcName, msg) {
  console.log(`> ERROR! url: ${uri}, func: ${funcName}, error: "${msg}"`);
}

function sysLog(path, msg) {
  console.log(`* ${msg}, path: ${path}`);
}

function sysErrorLog(path, msg) {
  console.log(`* ERROR! ${msg}, path: ${path}`);
}

export { log, errorLog, httpLog, httpErrorLog, sysLog, sysErrorLog };
