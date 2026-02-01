<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

const { onNodesInitialized, onNodeDrag, findNode, getEdges, screenToFlowCoordinate, fitView } = useVueFlow()

const getNodeCenter = (node: ReturnType<typeof findNode>) => {
	if (!node) return { x: 0, y: 0 }
	return {
		x: node.position.x + (node.dimensions?.width ?? 0) / 2,
		y: node.position.y + (node.dimensions?.height ?? 0) / 2
	}
}

const updateEdgeHandles = () => {
	const hero = findNode('hero')
	if (!hero) return

	const heroCenter = getNodeCenter(hero)

	getEdges.value.forEach((edge) => {
		const target = findNode(edge.target)
		if (!target) return

		const targetCenter = getNodeCenter(target)
		const dx = targetCenter.x - heroCenter.x
		const dy = targetCenter.y - heroCenter.y

		// Threshold to prevent flickering when dx ≈ dy
		const threshold = 1.2
		if (Math.abs(dx) > Math.abs(dy) * threshold) {
			edge.sourceHandle = dx > 0 ? 'right' : 'left'
			edge.targetHandle = dx > 0 ? 'left' : 'right'
		} else if (Math.abs(dy) > Math.abs(dx) * threshold) {
			edge.sourceHandle = dy > 0 ? 'bottom' : 'top'
			edge.targetHandle = dy > 0 ? 'top' : 'bottom'
		}
		// If within threshold, keep current handles (no change)
	})
}

onNodeDrag(({ node }) => {
	updateEdgeHandles()

	// Clamp position so entire node stays within bounds (in flow coordinates)
	if (!containerRef.value) return
	const rect = containerRef.value.getBoundingClientRect()

	// Convert screen bounds to flow coordinates
	const topLeft = screenToFlowCoordinate({ x: rect.left, y: rect.top })
	const bottomRight = screenToFlowCoordinate({ x: rect.right, y: rect.bottom })

	const nodeWidth = node.dimensions?.width ?? 0
	const nodeHeight = node.dimensions?.height ?? 0

	node.position.x = Math.max(topLeft.x, Math.min(node.position.x, bottomRight.x - nodeWidth))
	node.position.y = Math.max(topLeft.y, Math.min(node.position.y, bottomRight.y - nodeHeight))
})

const containerRef = ref<HTMLElement | null>(null)

const placeNodesAroundHero = () => {
	const hero = findNode('hero')
	if (!hero) return

	const heroCenter = getNodeCenter(hero)
	const gap = 130 // horizontal gap from hero

	// Left side cards (stacked vertically)
	const leftCards = ['llm', 'fullstack']
	leftCards.forEach((id, i) => {
		const node = findNode(id)
		if (!node) return
		const nodeWidth = node.dimensions?.width ?? 150
		const nodeHeight = node.dimensions?.height ?? 100

		node.position = {
			x: heroCenter.x - (hero.dimensions?.width ?? 0) / 2 - nodeWidth - gap,
			y: hero.position.y + i * (nodeHeight + 30)
		}
	})

	// Right side card
	const gamedev = findNode('gamedev')
	if (gamedev) {
		const nodeHeight = gamedev.dimensions?.height ?? 100
		gamedev.position = {
			x: heroCenter.x + (hero.dimensions?.width ?? 0) / 2 + gap,
			y: heroCenter.y - nodeHeight / 2
		}
	}
}

onNodesInitialized(() => {
	placeNodesAroundHero()
	updateEdgeHandles()
	fitView({ nodes: ['hero'], minZoom: 1, maxZoom: 1 })
})

import HeroNode from './HeroNode.vue'
import CardNode from './CardNode.vue'

import headshotImg from '../../assets/headshot.jpg'
import placeholder from '../../assets/blog-placeholder-about.jpg'

const nodes = ref([
	{
		id: 'hero',
		type: 'hero',
		draggable: false,
		position: { x: 500, y: 0 },
		data: {
			name: 'Nick French',
			tagline: 'A full-stack developer building LLM systems that are actually useful.',
			imageSrc: headshotImg.src
		}
	},
	{ id: 'llm', type: 'card', position: { x: 500 - 250, y: 0 }, data: { label: 'LLM Applications', tagline: 'Learn more..', imgSrc: placeholder.src } },
	{ id: 'gamedev', type: 'card', position: { x: 500 + 250 + 250, y: 80 }, data: { label: 'Game Development', tagline: 'Learn more..', imgSrc: placeholder.src } },
	{ id: 'fullstack', type: 'card', position: { x: 0, y: 160 }, data: { label: 'Full-stack Development', tagline: 'Learn more..', imgSrc: placeholder.src } },
])

const edges = ref([
	{ id: 'e-hero-llm', source: 'hero', target: 'llm', type: 'simplebezier' },
	{ id: 'e-hero-gamedev', source: 'hero', target: 'gamedev', type: 'simplebezier' },
	{ id: 'e-hero-fullstack', source: 'hero', target: 'fullstack', type: 'simplebezier' },
])
</script>

<template>
	<div ref="containerRef" class="h-[500px] w-full">
		<VueFlow :nodes="nodes" :edges="edges" :pan-on-scroll="false" :pan-on-drag="false" :prevent-scrolling="true"
			:zoom-on-scroll="false" :auto-pan-on-node-drag="false" :min-zoom="1" :max-zoom="1"
			:default-viewport="{ x: 0, y: 0, zoom: 1 }">
			<template #node-hero="props">
				<HeroNode v-bind="props" />
			</template>
			<template #node-card="props">
				<CardNode v-bind="props" />
			</template>
		</VueFlow>
	</div>
</template>
