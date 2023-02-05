import { Github } from "@runlightyear/github";
import { defineAction } from "@runlightyear/lightyear";
import { Slack } from "@runlightyear/slack";

const githubWebhook = Github.defineWebhook({
  name: "githubWebhook",
  title: "GitHub Webhook",
  variables: ["owner", "repo"],
  subscribeProps: ({ variables }) => {
    return {
      owner: variables.owner,
      repo: variables.repo,
      events: ["workflow_run"],
    };
  },
});

defineAction({
  name: "githubToSlack",
  title: "GitHub to Slack",
  trigger: {
    webhook: githubWebhook,
  },
  apps: ["slack"],
  variables: ["channel"],
  run: async ({ data, auths, variables }) => {
    const workflowRunPayload = Github.workflowRunPayload(data);
 
    console.info("Got a workflow run payload");
 
    if (workflowRunPayload.workflowRun.conclusion === 'success') {
      const slack = new Slack({ auth: auths.slack });
 
      await slack.postMessage({
        channel: variables.channel,
        text: `Workflow ran successfully on repo: ${workflowRunPayload.repository.fullName}`,
      });
      console.info("Posted message to Slack")
    } else {
      console.info(`Conclusion was ${workflowRunPayload.workflowRun.conclusion}, skipping...`)
    }
    // const pushData = Github.pushPayload(data);

    // console.info("Got a push payload");

    // const slack = new Slack({ auth: auths.slack });

    // await slack.postMessage({
    //   channel: variables.channel,
    //   text: `Got push event on repo: ${pushData.repository.fullName}`,
    // });

    // console.info("Posted message to Slack");
  },
});
