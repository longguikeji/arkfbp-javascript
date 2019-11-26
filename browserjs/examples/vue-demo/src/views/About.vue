<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="run">Run Workflow</button>
  </div>
</template>


<script lang="ts">

import { runWorkflow } from '@/ark/flow'
import { Main } from '@/flows/helloworld'

export default {
  name: 'about',
  methods: {
    run: function() {
      console.info('to run workflow')
      runWorkflow(Main).then(() => {
        console.info('main flow finished')
      })
    }
  }
}
</script>