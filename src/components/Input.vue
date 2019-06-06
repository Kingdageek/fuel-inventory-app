<template>
    <div class="form-group">
        <label :for="name">{{ name }}</label>
        <input :type="type" :v-model="vmodel" class="form-control" :placeholder="placeholder" required>
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        name: String,
        type: String,
        vmodel: String,
        placeholder: String,
    }
}
</script>