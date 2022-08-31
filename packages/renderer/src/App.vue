<template>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

window.addEventListener('keydown', event => {
	switch (event.code) {
		case 'Escape': {
		}
	}
})
</script>
