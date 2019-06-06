<template>
    <ul class="list-group">
        <li class="list-group-item text-danger" v-for="(error, i) in errors" :key="i" >
            {{ error[0] }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "Errors",
    props: {
        errors: Object,
    }
}
</script>