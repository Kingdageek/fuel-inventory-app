<template>
    <div class="form-group">
        <label :for="name">{{ name }}</label>
        <select :id="name" class="form-control" :v-model="vmodel">
            <option v-for="(opt, i) in opts" :key="i" value="opt">
                {{ opt }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Select',
    props: {
        name: String,
        opts: Array,
        vmodel: String
    }
}
</script>