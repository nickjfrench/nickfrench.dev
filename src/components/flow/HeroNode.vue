<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
	data: {
		name: string
		tagline: string
		imageSrc: string
	}
}>()
</script>

<template>
	<div class="flex flex-col items-center text-center max-w-md">
		<div class="speech-bubble self-start mb-4 ml-4 bg-black-light rounded-lg px-4 py-2">
			<p class="font-handwritten text-xl">Hi! I'm {{ data.name }}</p>
		</div>
		<img :src="data.imageSrc" :alt="data.name" class="w-50 rounded-2xl mb-8 border border-text-muted/50 p-1" />
		<h1 class="text-3xl leading-relaxed font-serif">
			{{ data.tagline }}
		</h1>

		<Handle id="left" type="source" :position="Position.Left" />
		<Handle id="right" type="source" :position="Position.Right" />
		<Handle id="top" type="source" :position="Position.Top" />
		<Handle id="bottom" type="source" :position="Position.Bottom" />
	</div>
</template>

<style scoped>
.speech-bubble {
	position: relative;
}

.speech-bubble::after {
	content: '';
	position: absolute;
	left: 65%;
	width: 0;
	height: 0;
	/* tail width */
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	/* adjust this for tail vertical height */
	border-top: 15px solid var(--color-black-light);
	bottom: -15px;
}
</style>
