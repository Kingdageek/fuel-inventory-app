<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors v-show="anyErrors" :errors="errors" />
            <form @submit.prevent="storeDispenser">
                <Heading message="Create Dispenser" />
                <div class="form-group">
                    <label for="Serial Number">Serial Number</label>
                    <input type="text" v-model="dispenser.serial_num" class="form-control" placeholder="37DKDUHUEUDLD7" required>
                </div>
                <div class="form-group">
                    <label for="Number of Nozzles">Number of Nozzles</label>
                    <input type="text" v-model="dispenser.num_of_nozzles" class="form-control" placeholder="5" required>
                </div>
                <div class="form-group">
                    <label for="Fuel Type">Fuel Type</label>
                    <select id="Fuel Type" class="form-control" v-model="dispenser.fuel_type">
                        <option v-for="(opt, i) in opts" :key="i">
                            {{ opt }}
                        </option>
                    </select>
                </div>

                <!-- <Input name="Serial Number" type="text" vmodel= "serial_num" v-model = "dispenser" placeholder="18E9E9IKDLD" />
                <Input name="Number of Nozzles" type="text" vmodel= "num_of_nozzles" v-model = "dispenser" placeholder="6" />
                <Select name="Fuel Type" :opts="opts" vmodel= "fuel_type" v-model= "dispenser" />  -->

                <Button :txt="btnText" />
            </form>
        </div>
    </div>
</template>

<script>
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
                this.$router.push( {name: 'dispensers.index'} )
            })
            .catch( err => {
                //this.errors = err.response.data.errors
                console.log(err)
            })

            this.isLoading = false
        }
    }
}
</script>