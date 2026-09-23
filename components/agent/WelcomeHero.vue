<script setup lang="ts"></script>
<template>
  <section class="welcome-hero">
    <img class="hero-waves" src="/images/figma/discovery-waves.svg" alt="" />
    <div class="welcome-greeting">
      <h1>
        Welcome
        <span aria-hidden="true">👋</span>
      </h1>
      <p class="desktop-caption">Your next chapter starts here.</p>
    </div>
    <AgentReactiveOrb class="welcome-orb" src="/images/figma/welcome-orb.png">
      <div class="orb-copy">
        <BrandRechittaMark :size="34" alt="Rechitta" />
        <p>
          Hello Aryaman! I’m Rechitta.
          <br />
          Your broker asked me to speak with you, because buying your first home is one of life’s
          biggest decisions.
        </p>
      </div>
      <template #actions>
        <button class="icon-button" type="button" aria-label="Chat with Rechitta">
          <UiAppIcon name="chat" :size="24" />
        </button>
      </template>
    </AgentReactiveOrb>
  </section>
</template>
