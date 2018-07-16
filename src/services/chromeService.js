/* global chrome */
// chrome.browserAction.onClicked.addListener(function(tab) {

// }); 

const currentTime = (cb) => {
            chrome.tabs.executeScript({
                code: 'parseInt(document.getElementsByTagName("video")[0].currentTime);'
            }, cb);
};

const extractVideoId = 
    `(function () {
        var video_id = window.location.search.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }else{
            return video_id;
        }
    })();`;

const videoId = (cb) => {
    chrome.tabs.executeScript({
        code: extractVideoId
    }, cb);    
}

const set = (obj,cb) => {
    chrome.storage.sync.set(obj,cb)
}

const get = (cb) => {
    chrome.storage.sync.get(null, result => {
        cb(result);
    })
}

const remove = (obj,cb) => {
    chrome.storage.sync.remove(obj,cb)
}

const initialDB = (cb) => {
    chrome.storage.sync.getBytesInUse(cb);
}

export default {
    currentTime,
    videoId,
    set,
    get,
    remove,
    initialDB,
};
