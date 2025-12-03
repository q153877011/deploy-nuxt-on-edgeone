<template>
    <div>
        <h1>Page {{ $route.params.id }}</h1>
    </div>
</template>

<script setup>
const route = useRoute()
</script>