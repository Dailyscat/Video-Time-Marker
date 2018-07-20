import $ from 'jquery';

// Youtube API Key를 생성하셔서 넣어주세요!
// https://developers.google.com/youtube/v3/getting-started
const YOUTUBE_API_KEY = 'AIzaSyCJdBUfE6WAlyqYMMJM5SOxjYBOPm24CpU';

export const getYouTubeData = function (searchText, cb) {
    $.get({
        url: `https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&q=${searchText}&type=video&key=${YOUTUBE_API_KEY}`,
        success: function (data) {
            cb(null, data);
        },
        error: function (error) {
            cb(error);
        }
    });
};


