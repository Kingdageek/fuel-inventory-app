<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors :v-show="anyErrors" :errors="errors" />
            <form v-on:submit.prevent="saveMethod">
                <Heading :message="message" />
                <Input :name="inputName" type="text" :vmodel= "vmodel" placeholder="6" />
                <Button :txt="btnTxt" />
            </form>
        </div>
    </div>
</template>

<script>
import Errors from '@/components/Errors.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Heading from '@/components/Heading.vue'

export default {
    name: 'DailyForm',
    props: {
        anyErrors: Boolean,
        message: String,
        errors: Object,
        inputName: String,
        vmodel: String,
        btnTxt: String,
    },
    methods: {
        saveMethod() {
            this.$emit('submit')
        }
    },
    components: {
        Errors,
        Input,
        Button,
        Heading
    }
}
</script>