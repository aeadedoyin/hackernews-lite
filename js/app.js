// Created by Adedoyin aeadedoyin@gmail.com 2019-06-27 20:52:38

"use strict";

const init = () => {
    let grabbedData = [];
    let url = 'https://www.graphqlhub.com/graphql?query='
    let query = `
    {
        hn {
            topStories {
                by {
                    id
                }
                title
                score
                descendants
                url
                time
            }
        }
    }`
    fetch(url + query)
        .then(function(response) {
            return response.json();
        })
        .then(({ data }) => {
            data.hn.topStories.forEach((element, key) => {
                loadUI(++key, element.by.id, element.title, element.score, element.descendants, element.url, element.time);
            });
        })
        .catch(function(error) {
            console.log(error);
        })

    return grabbedData;
}

const extractHostname = (url) => {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    hostname = hostname.replace('www.', '');
    return hostname;
}

const timeDifference = (dateTime) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var current = (new Date()).getTime();
    var elapsed = current - dateTime * 1000;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}

const loadUI = (index, author, title, score, descendants, url, time) => {
    const stories = document.querySelector('.stories');
    const html = `
            <div class="story">
                <span class="story-index">${index}. </span>
                <div>
                    <span class="story-title">${title}</span>
                    <span class="story-source"><a href="${url}" target="_blank" rel="noopener noreferrer">(${extractHostname(url)})</a></span>
                    <p><small class="story-data">${score} points by ${author} ${timeDifference(time)} | ${descendants} comments</small></p>
                </div>
            </div>
    `;
    stories.insertAdjacentHTML('beforeend', html);
}

init();