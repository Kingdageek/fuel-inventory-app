<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors v-show="anyErrors" :errors="errors" />
            <form @submit.prevent="storeDispenser">
                <Heading message="Create Dispenser" />
                <Input name="Serial Number" type="text" vmodel= "serial_num" v-model = "dispenser" placeholder="18E9E9IKDLD" />
                <Input name="Number of Nozzles" type="text" vmodel= "num_of_nozzles" v-model = "dispenser" placeholder="6" />
                <Select name="Fuel Type" :opts="opts" vmodel= "fuel_type" v-model= "dispenser" />
                <Button :txt="btnText" />
            </form>
        </div>
    </div>
</template>

<script>
    import Input from '@/components/Input.vue'
    import Select from '@/components/Select.vue'
    import Heading from '@/components/Heading.vue'
    import Button from '@/components/Button.vue'
    import Errors from '@/components/Errors.vue'

    export default {
        name: 'CreateDispenser',
        data() {
            return {
                dispenser: {

                },
                opts: [
                    'Petroleum', 'Compressed Natural Gas', 'Alcohols', 'Specialized'
                ],
                errors: {

                },
                isLoading: false
            }
        },
        computed: {
            anyErrors() {
                return Object.getOwnPropertyNames( this.errors ).length > 1
            },
            btnText() {
                if (this.isLoading) {
                    return 'Storing...'
                }
                return 'Store Dispenser'
            }
        },
        components: {
            Input,
            Select,
            Heading,
            Button,
            Errors
        },
        methods: {
            storeDispenser() {
                console.log(this.dispenser)
                this.isLoading = true
                this.$http.post(this.$baseUri + '/dispensers', this.dispenser)
                .then( resp => {
                    this.$router.push( {name: 'dispensers'} )
                })
                .catch( err => {
                    this.errors = err.response.data.errors
                    console.log(err)
                })

                this.isLoading = false
            }
        }
    }
</script>