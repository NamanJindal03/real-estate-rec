<script setup lang="ts">
useSeoMeta({ title: 'Meet Rechitta — Your AI Agent' })
</script>
<template>
  <section class="onboarding splash">
    <div class="splash-glow" aria-hidden="true" />
    <img class="onboarding-waves" src="/images/figma/waves.svg" alt="" aria-hidden="true" />
    <div class="splash-content">
      <header class="splash-heading">
        <p>Meet</p>
        <h1>
          <strong>Rechitta</strong>
          <span>Your AI Agent</span>
        </h1>
        <p class="intro-copy">
          She guides your investment journey, turning your questions into a conversation. Honest
          answers, plain language, no sales pitch.
        </p>
      </header>
      <div class="brand-art">
        <BrandRechittaMark :size="166" alt="Rechitta" />
      </div>
      <OnboardingAdvisorCard />
    </div>
    <OnboardingNavigation :step="0" next="/welcome" />
  </section>
</template>
