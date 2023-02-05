import { defineAction } from "@runlightyear/lightyear";

defineAction({
  name: "helloWorld",
  title: "Hello World",
  run: async () => {
    console.log("„“'„ Mario, здраво");
  },
});
