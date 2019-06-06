<template>
    <div class="form-group">
        <div class="text-center">
            <button class="btn btn-success form-control">{{ txt }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        txt: String
    }
}
</script>