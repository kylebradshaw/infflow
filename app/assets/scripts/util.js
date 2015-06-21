
// http://goo.gl/5Nl0Dm
// https://gist.github.com/mombrea/6598272#file-twitter-url-parsers
// 4Tweets
String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+.[A-Za-z0-9-_:%&~?/.=]+/g, function(url) {
        return url.link(url);
    });
};
String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","");
        return u.link("https://twitter.com/"+username);
    });
};
String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag = t.replace("#","");
        return t.link("https://twitter.com/hashtag/"+tag);
    });
};
// tweetText = tweetText.parseURL().parseUsername().parseHashtag();
