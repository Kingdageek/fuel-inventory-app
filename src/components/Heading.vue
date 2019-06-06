<template>
    <div class="panel-heading">
        <h2 class="text-center">{{ message }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Heading',
        props: {
            message: String
        }
    }
</script>