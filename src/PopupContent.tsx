import {
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import { useChromeStorageLocal } from "use-chrome-storage";

export const PopupContent = () => {
  const toggleLogo = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    tab.id &&
      chrome.tabs.sendMessage(tab.id, {
        type: "toggleLogo",
        url: chrome.runtime.getURL("twitter.png"),
      });
  };
  const toggleTimelineViewCount = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    tab.id && chrome.tabs.sendMessage(tab.id, "toggleCount");
  };
  const toggleIndividualTweetViewCount = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    tab.id && chrome.tabs.sendMessage(tab.id, "toggleTweetViewCount");
  };
  const [countStatus] = useChromeStorageLocal("countStatus", true);
  const [tweetCountStatus] = useChromeStorageLocal("tweetCountStatus", true);
  const [logoStatus] = useChromeStorageLocal("twitterLogoStatus", true);
  return (
    <Stack padding={4} width="xs" height="sm" backgroundColor="gray.800">
      <Heading>Twitter Demusked</Heading>
      <Stack>
        <Stack>
          <Heading size="lg">Hide view count</Heading>
          <FormControl
            templateColumns="2fr 1fr"
            as={Grid}
            onChange={toggleTimelineViewCount}
          >
            <FormLabel htmlFor="viewCount" mb="0">
              Timeline
            </FormLabel>
            <Switch isChecked={!countStatus} id="viewCount" />
          </FormControl>
          <FormControl
            templateColumns="2fr 1fr"
            as={Grid}
            onChange={toggleIndividualTweetViewCount}
          >
            <FormLabel htmlFor="viewCount" mb="0">
              Individual Tweets
            </FormLabel>
            <Switch isChecked={!tweetCountStatus} id="viewCount" />
          </FormControl>
        </Stack>
        <Stack>
          <Heading size="lg">Twitter logo</Heading>
          <FormControl
            templateColumns="2fr 1fr"
            as={Grid}
            onChange={toggleLogo}
          >
            <FormLabel htmlFor="viewCount" mb="0">
              Use Twitter Logo & Favicon
            </FormLabel>
            <Switch isChecked={logoStatus} id="viewCount" />
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};
