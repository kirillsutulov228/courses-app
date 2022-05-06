function sendOne(resultCallback) {
  return async function(req, res, next) {
    try {
      const result = await resultCallback({ req, res, next});
      if (!res.headersSent) {
        if (!result) {
          return res.sendStatus(404); 
        }
        return res.json(result);
      }
    } catch(err) {
      return next(err);
    }
  }
}

module.exports = sendOne;
