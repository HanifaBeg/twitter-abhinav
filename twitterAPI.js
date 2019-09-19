// VENDOR LIBS
const Twitter = require('twitter')

// Dependencies
const ResponseErrors = require('./ErrorHelper');

// Common twitter client
const client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

// Get tweets by user
/**
 * @param {string} userName - twitter handle
 * @param {object} options - overriding options 
 * @returns {Promise}
 */
exports.getTweetsForUser = (userName, options = { count: 10 }) => {
    return new Promise((resolve_getTweetsForUser, reject_getTweetsForUser) => {
        // No userName provided
        if (!userName)
            reject_getTweetsForUser(ResponseErrors.BadRequest("User name is required."));
        // Invalid userName type
        if (typeof userName != "string")
            reject_getTweetsForUser(ResponseErrors.BadRequest("User name should be of type string. Got " + typeof userName));
        // Call to twitter API
        client.get('statuses/user_timeline', {
            screen_name: userName,
            ...options
        }, function (error, tweetsFetched) {
            // Rejection with error from twitter API
            if (error) reject_getTweetsForUser({ err: error });

            const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
            const tweetCount = new Array(7).fill(0);
            let newTweetText = []

            newTweetText = tweetsFetched.map(fetchedTweet => {
                let tweetDay = days.indexOf(fetchedTweet.created_at.slice(0, 3).toUpperCase())
                tweetCount[tweetDay]++;
                return fetchedTweet.text
            })

            const lastTweetID = tweetsFetched[tweetsFetched.length - 1].id || null

            // Resolve with transformed response
            resolve_getTweetsForUser({
                "NewTweets": newTweetText,
                "last_d": lastTweetID,
                "tweetCount": tweetCount
            });
        })
    });
}
