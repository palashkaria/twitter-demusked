import { hideCount, showCount } from "./utils";

window.addEventListener("load", () => {
  chrome.storage.local.get("countStatus", (result) => {
    console.log({ result });
    if (result.countStatus === false) {
      hideCount();
    } else {
      showCount();
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  console.log({ message });
  if (message === "toggleCount") {
    // get current count status from storage
    chrome.storage.local.get("countStatus", (result) => {
      console.log({ result });
      if (result.countStatus === false) {
        chrome.storage.local.set({ countStatus: true });
        showCount();
      } else {
        chrome.storage.local.set({ countStatus: false });
        hideCount();
      }
    });
  }
});
