<script setup lang="ts">
useSeoMeta({ title: 'Speak to Discover — Rechitta' })
const prompts = [
  'Is there a 2-bed available…',
  'What’s the price history?',
  'What is proximity to good schools?',
  'Show me the floor plan',
  'How does the payment plan work…',
]
</script>
<template>
  <section class="onboarding welcome">
    <img class="welcome-waves" src="/images/figma/welcome-waves.svg" alt="" aria-hidden="true" />
    <div class="welcome-content">
      <header>
        <h1>Speak to Discover</h1>
        <p class="intro-copy">
          Allow microphone access to search properties naturally, just as you would speak to an
          agent.
        </p>
      </header>
      <p class="eyebrow ask-anything">
        You can ask
        <br />
        Rechitta anything
      </p>
      <AgentReactiveOrb
        class="prompt-orbit"
        src="/images/figma/welcome-discovery-orb.png"
        :show-controls="false"
      >
        <NuxtLink
          v-for="(prompt, index) in prompts"
          :key="prompt"
          :to="{ path: '/discover', query: { question: prompt } }"
          :class="['prompt-bubble', `prompt-bubble--${index}`]"
        >
          “{{ prompt }}”
        </NuxtLink>
      </AgentReactiveOrb>
      <div class="privacy-note">
        <img class="privacy-shield" src="/images/figma/shield.png" alt="" aria-hidden="true" />
        <p>
          Your voice data is processed securely and never stored without your explicit permission.
          <span class="text-link">Privacy Policy</span>
        </p>
      </div>
    </div>
    <OnboardingNavigation :step="1" next="/discover" />
  </section>
</template>
