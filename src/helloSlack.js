import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";
import basicWebhook from "./basicWebhook";

defineAction({
  name: "helloSlack",
  title: "Hello Slack",
  description: "Send a message to Slack",
  apps: ["slack"],
  variables: ["channelName"],
  trigger: {
    webhook: basicWebhook,
  },
  run: async ({ auths, variables }) => {
    const slack = new Slack({ auth: auths.slack });

    await slack.postMessage({
      channel: variables.channelName, // <-- you might want to change this!
      text: "Hi34 new",
    });

    console.info("Posted message to Slack");
  },
});
