var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/euSczU5PtJI:APA91bHHAgUPvIPWogo9zqS-G17jzRVBs05So5oNpRZl70WhlSZ4f3Gg6LlvdwRyO3ndpR7oWaaVO7hFAIheIasef_fsX158kUXXWwtLvZ7C4rzEjnYipz-OBncFCLVEz1bDk-142svT",
    "keys": {
        "p256dh": "P256DH_KEY", 
        "auth": "AAAA5DPWGYc:APA91bGetmAggrMqHOgELd3-rEX7Q8FCBJfyLHdPBMf5xXs4-1qCGVL9zV8Bw-TNyq30OvqJ-z8D2sOyhjD4NzdWOnW7VNn_iJBcLPQYXuwHnPaXjjHi-qgZY7ng9p0a1bic4Lod9AEz"
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'GCM_KEY',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
