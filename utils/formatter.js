import twttr from "twitter-text";
import { social_account_colors, social_account_icons } from "./HelperData";

export const removeLinkFromText = (string) => {
  return string.replace(/https:\/\/t.co\/[a-zA-Z0-9\-\.]+/g, "");
};

function getHashtags(searchText) {
  return twttr.extractHashtags(searchText).map((tag) => "#" + tag);
}

function getUserMentions(searchText) {
  return twttr.extractMentions(searchText).map((username) => `@${username}`);
}

const handleURL = (tweet, tweet_obj) => {
  const allURL = twttr.extractUrls(tweet);
  const entities = tweet_obj.entities;
  const nonMediaURL = allURL.map((url) => {
    if (!entities.urls.includes(url)) {
      return entities.urls;
    }
  });

  const flattened = nonMediaURL.flat();

  flattened.forEach((el) => {
    if (String(tweet).includes(el.url)) {
      tweet = tweet.replace(
        el.url,
        twttr.autoLinkUrlsCustom(el.expanded_url, {
          urlEntities: {
            url: el.url,
            display_url: el.display_url,
            expanded_url: el.expanded_url,
          },
          targetBlank: true,
        })
      );
    }
  });

  return tweet;
};

export const tweetFormatter = (tweet_full_text, tweet_obj) => {
  // handling hashtags
  const hashtags = getHashtags(tweet_full_text);
  let tweet = tweet_full_text;
  if (hashtags.length !== 0) {
    hashtags.map(
      (hashtag) =>
        (tweet = tweet.replace(
          hashtag || `<span>${hashtag}</span>`,
          `<span type="#hashtag" style="cursor: pointer;color: rgb(17, 109, 170);pointer-events: all" class="font-weight-bold">${hashtag}</span>`
        ))
    );
  }

  // handling userMentions
  const userMentions = getUserMentions(tweet);
  if (userMentions.length !== 0) {
    userMentions.map(
      (mention) =>
        (tweet = tweet.replace(
          mention || `<span>${mention}</span>`,
          `<span type="usermention" style="cursor: pointer;color: #5E72E4;pointer-events: all" class="font-weight-bold">${mention}</span>`
        ))
    );
  }

  // handling URLs (non-media)
  const linkyfied = handleURL(tweet, tweet_obj);

  // remove media links
  const formattedTweet = removeLinkFromText(linkyfied);

  return formattedTweet;
};

export const formatHashtag = (searchTerm) => {
  let newSearchTerm;
  if (searchTerm.charCodeAt(0) === 35) {
    newSearchTerm = searchTerm.trim().replace("#", "hashtag");
  } else {
    newSearchTerm = searchTerm.trim();
  }
  return newSearchTerm;
};

export const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getRandomHexColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const objectToObjectsOfArray = (data) => {
  let result = Object.keys(data).map((key) => ({
    account: String(key),
    isconnected: data[key],
    social_icon: {
      icon: social_account_icons[key],
      bg_color: social_account_colors[key].background,
      color: social_account_colors[key].color,
    },
  }));
  return result;
};

export const capitalizeFirstLetter = ([first, ...rest]) => {
  return first.toUpperCase() + rest.join("");
};

export const removeDuplicatesFromArrayOfObjects = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter((i) => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

export function highlightLinkInText(text) {
  if (!text) return;
  let Rexp =
    /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
  return text.replace(
    Rexp,
    "<a style=`color:#5065DB;text-decoration:underline;` href='$1' target='_blank'>$1</a>"
  );
}

export function isImageURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export function randomPercentage() {
  return Math.floor(Math.random() * 100) + 1 + "%";
}

export function truncateString(str, n) {
  return str.length > n ? str.substr(0, n - 1).trim() + "&hellip;" : str.trim();
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function formatTweet(text) {
  // handling hashtags
  const hashtags = getHashtags(text);
  let tweet = text;
  if (hashtags.length !== 0) {
    hashtags.map(
      (hashtag) =>
        (tweet = tweet.replace(
          hashtag || `<span>${hashtag}</span>`,
          `<span type="#" style="cursor: pointer;color: rgb(17, 109, 170);pointer-events: all" class="font-weight-bold">${hashtag}</span>`
        ))
    );
  }

  // handling user_mentions
  const userMentions = getUserMentions(tweet);
  if (userMentions.length !== 0) {
    userMentions.map(
      (mention) =>
        (tweet = tweet.replace(
          mention || `<span>${mention}</span>`,
          `<span type="@" style="cursor: pointer;color: #5E72E4;pointer-events: all" class="font-weight-bold">${mention}</span>`
        ))
    );
  }

  return text;
}
