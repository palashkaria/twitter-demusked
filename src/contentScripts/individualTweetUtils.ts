let HIDDEN_ELEMENTS = [] as Array<HTMLElement | null | undefined>;

export const hideIndividualTweetCount = () => {
  const element = document.querySelector("body");
  const options = {
    childList: true, // listen to children being added or removed
    subtree: true, // omit or set to false to observe only changes to the parent node
  };

  const callback: MutationCallback = (mutationList, observer) => {
    mutationList.forEach((mutation) => {
      switch (mutation.type) {
        case "childList":
          const addedNodes = [...mutation.addedNodes];
          // find nodes with data-testid="cellInnerDiv"
          const cellInnerDivs = addedNodes.filter((node) => {
            const newDiv = node as HTMLDivElement;
            return newDiv.getAttribute("data-testid") === "cellInnerDiv";
          });
          const { isTweet, tweetId } = getTweetDetailsFromUrl();
          if (isTweet && tweetId) {
            const analyticsAnchor = cellInnerDivs.find((div) => {
              const anchors = (div as HTMLDivElement).querySelectorAll("a");
              const anchor = [...anchors].find(
                (anchor) =>
                  anchor.href.includes(`${tweetId}/analytics`) && anchor
              );
              return anchor;
            });
            if (analyticsAnchor) {
              hideCount(tweetId);
            }
          }
          break;
      }
    });
  };

  window.individualCountObserver = new MutationObserver(callback);
  hideInitial();
  element && window.individualCountObserver.observe(element, options);
};

const getTweetDetailsFromUrl = () => {
  const splitUrl = window.location.pathname.split("/");
  const isTweet = splitUrl[2] === "status" && splitUrl.length === 4;
  const tweetId = splitUrl[3];

  return { isTweet, tweetId };
};
const hideInitial = () => {
  const { isTweet, tweetId } = getTweetDetailsFromUrl();
  isTweet && hideCount(tweetId);
};

const findViewCountAnchor = (tweetId: string) => {
  const cellInnerDivs = [
    ...document.querySelectorAll("[data-testid=cellInnerDiv]"),
  ];
  const analyticsAnchorDiv = cellInnerDivs.find((div) => {
    const anchors = (div as HTMLDivElement).querySelectorAll("a");
    const anchor = [...anchors].find(
      (anchor) => anchor.href.includes(`${tweetId}/analytics`) && anchor
    );
    return anchor;
  });
  const anchors = (analyticsAnchorDiv as HTMLDivElement)?.querySelectorAll("a");
  const analyticsAnchor =
    anchors &&
    [...anchors].find(
      (anchor) => anchor.href.includes(`${tweetId}/analytics`) && anchor
    );
  return analyticsAnchor;
};
const hideCount = (tweetId: string) => {
  const viewCount = findViewCountAnchor(tweetId);
  if (viewCount) {
    // hide viewCount
    viewCount?.parentElement?.parentElement?.setAttribute(
      "style",
      "display: none"
    );
    HIDDEN_ELEMENTS = [
      ...HIDDEN_ELEMENTS,
      viewCount?.parentElement?.parentElement,
    ];
  }
};

export const showIndividualTweetCount = () => {
  window.individualCountObserver?.disconnect();
  HIDDEN_ELEMENTS.forEach((el) => {
    (el as HTMLDivElement)?.setAttribute("style", "display: flex");
  });
};
