import {
  hideIndividualTweetCount,
  showIndividualTweetCount,
  useTwitterLogo,
  useXLogo,
} from "./individualTweetUtils";
import { hideCount, showCount } from "./utils";

window.addEventListener("load", () => {
  chrome.storage.local.get("countStatus", (result) => {
    if (result.countStatus === false) {
      hideCount();
    } else {
      showCount();
    }
  });
  chrome.storage.local.get("tweetCountStatus", (result) => {
    if (result.tweetCountStatus === false) {
      hideIndividualTweetCount();
    } else {
      showIndividualTweetCount();
    }
  });
  chrome.storage.local.get("twitterLogoStatus", (result) => {
    if (result.twitterLogoStatus === true) {
      useTwitterLogo(chrome.runtime.getURL("twitter.png"));
    } else {
      useXLogo();
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message === "toggleCount") {
    // get current count status from storage
    chrome.storage.local.get("countStatus", (result) => {
      if (result.countStatus === false) {
        chrome.storage.local.set({ countStatus: true });
        showCount();
      } else {
        chrome.storage.local.set({ countStatus: false });
        hideCount();
      }
    });
  }
  if (message === "toggleTweetViewCount") {
    // get current count status from storage
    chrome.storage.local.get("tweetCountStatus", (result) => {
      if (result.tweetCountStatus === false) {
        chrome.storage.local.set({ tweetCountStatus: true });
        showIndividualTweetCount();
      } else {
        chrome.storage.local.set({ tweetCountStatus: false });
        hideIndividualTweetCount();
      }
    });
  }
  if (message.type === "toggleLogo") {
    // get current count status from storage
    console.log("toggle logo!");
    chrome.storage.local.get("twitterLogoStatus", (result) => {
      if (result.twitterLogoStatus === false) {
        chrome.storage.local.set({ twitterLogoStatus: true });
        useTwitterLogo(message.url);
      } else {
        chrome.storage.local.set({ twitterLogoStatus: false });
        useXLogo();
      }
    });
  }
});
