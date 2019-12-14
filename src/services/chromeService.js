/* global chrome */

const getCurrentTime = `(function () {
        if(document.getElementsByTagName("video")[0]) return parseInt(document.getElementsByTagName("video")[0].currentTime);
    })();`;

const currentTime = cb => {
  chrome.tabs.executeScript(
    {
      code: getCurrentTime
    },
    result => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        cb(result);
      }
    }
  );
};

const extractVideoId = `(function () {
        var video_id = window.location.search.split('v=')[1];
        if(video_id){
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
                return video_id;
            }else{
                return video_id;
            }
        }
    })();`;

const videoId = cb => {
  chrome.tabs.executeScript(
    {
      code: extractVideoId
    },
    result => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        cb(result);
      }
    }
  );
};

const set = (obj, cb) => {
  chrome.storage.local.set(obj, cb);
};

const get = cb => {
  chrome.storage.local.get(null, result => {
    cb(result);
  });
};

const remove = (obj, cb) => {
  chrome.storage.local.remove(obj, cb);
};

const initialDB = cb => {
  chrome.storage.local.getBytesInUse(cb);
};

const newTab = (urlObj, cb) => {
  chrome.tabs.create(urlObj, cb);
};

const currentTab = (urlObj, cb) => {
  chrome.tabs.update(urlObj, cb);
};

const onLoadHandler = cb => {
  chrome.tabs.onUpdated.addListener(cb);
};

export default {
  currentTime,
  videoId,
  set,
  get,
  remove,
  initialDB,
  newTab,
  currentTab,
  onLoadHandler
};
