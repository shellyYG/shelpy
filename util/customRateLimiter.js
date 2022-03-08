const redis = require('./redis');

function customRateLimiter({ secondsWindow, allowedHits }) {
    return async function(req, res, next) {
        const ip = (
            req.headers['x-forwarded-for'] || req.connection.remoteAddress
        ).slice(0, 9);
        const requestCounts = await redis.incr(ip);
        console.log('requestCounts: ', requestCounts);
        if (requestCounts === 1) {
          await redis.expire(ip, secondsWindow); // expire every secondsWindow seconds
        }
        if (requestCounts > allowedHits) {
          console.log('too many request');
          res.status(429).send('too_many_requests');
          return;
        } else {
          next();
        }
    }
}

module.exports = customRateLimiter;