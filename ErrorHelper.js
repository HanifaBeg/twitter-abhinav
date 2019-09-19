exports.BadRequest = (msg) => ({ status: 400, error: msg || "Bad request" })
exports.Unauthorized = (msg) => ({ status: 403, error: msg || "Unauthorized" })
exports.ServerRequest = (msg) => ({ status: 404, error: msg || "Requested resource not found" })
exports.NotFound = (msg) => ({ status: 500, error: msg || "Internal server error" })
