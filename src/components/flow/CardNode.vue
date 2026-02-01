<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps<{
	data: {
		label: string
		tagline: string
		imgSrc: string
		link: string
	}
}>()
</script>

<template>
	<div class="p-1 w-xs rounded-lg border border-text-muted/30 border-1">
		<div class="flex flex-col bg-black-light p-2">
			<img v-if="data?.imgSrc" :src="data.imgSrc" class="mx-auto w-full h-25 object-cover rounded-lg mb-2" />
			<p class="text-lg">{{ data.label }}</p>
			<p v-if="data?.tagline">{{ data.tagline }}</p>
			<p v-if="data?.link"><a href={ link } class=" p-4 border border-text border-1 rounded-md">Read More</a>
			</p>


			<Handle id="left" type="target" :position="Position.Left" />
			<Handle id="right" type="target" :position="Position.Right" />
			<Handle id="top" type="target" :position="Position.Top" />
			<Handle id="bottom" type="target" :position="Position.Bottom" />
		</div>
	</div>
</template>
