<template>
  <div class="about">
    <h1>Hello {{ name }} {{ times }} times.</h1>

    <a-button type="primary" @click="sayHello">Click Me</a-button>
    <br /><br />
    <a-button type="primary">Second Button</a-button>
  </div>
</template>

<script>
import NewWorkflow from "@/workflows/workflow1";

export default {
  name: "About",
  data() {
    return {
      name: "",
      times: 0,
    };
  },
  methods: {
    sayHello: function() {
      const wf = new NewWorkflow();
      wf.run().then(() => {
        this.name = "Rock";
        this.times += 1;
        console.info("wf exectued");
      });
    }
  }
};
</script>