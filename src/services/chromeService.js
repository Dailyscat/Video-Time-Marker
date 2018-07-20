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
            return video_id;
        }else{
            return video_id;
        }
    })();`;

const videoId = (cb) => {
    chrome.tabs.executeScript({
        code: extractVideoId
    }, result => cb(result));    
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

const newTab = (urlObj, cb) => {
    chrome.tabs.create(urlObj, cb)
}

const currentTab = (urlObj, cb) => {
    chrome.tabs.update(urlObj, cb);
}

const onLoadHandler = (cb) => {
    chrome.tabs.onUpdated.addListener(cb);
}

export default {
    currentTime,
    videoId,
    set,
    get,
    remove,
    initialDB,
    newTab,
    currentTab,
    onLoadHandler,
};
