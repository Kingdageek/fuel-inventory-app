<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors v-show="anyErrors" :errors="errors" />
            <form @submit.prevent="storeTank">
                <Heading message="Create Tank" />
                <div class="form-group">
                    <label for="Serial Number">Serial Number</label>
                    <input type="text" v-model="tank.serial_num" class="form-control" placeholder="37DKDUHUEUDLD7" required>
                </div>
                <div class="form-group">
                    <label for="Number of Nozzles">Number of Nozzles</label>
                    <input type="text" v-model="tank.capacity" class="form-control" placeholder="5" required>
                </div>
                <div class="form-group">
                    <label for="Fuel Type">Fuel Type</label>
                    <select id="Fuel Type" class="form-control" v-model="tank.fuel_type">
                        <option v-for="(opt, i) in opts" :key="i">
                            {{ opt }}
                        </option>
                    </select>
                </div>

                <!-- <Input name="Serial Number" type="text" vmodel= "serial_num" v-model = "tank" placeholder="18E9E9IKDLD" />
                <Input name="Number of Nozzles" type="text" vmodel= "num_of_nozzles" v-model = "tank" placeholder="6" />
                <Select name="Fuel Type" :opts="opts" vmodel= "fuel_type" v-model= "tank" />  -->
                
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
    name: 'CreateTank',
    data() {
        return {
            tank: {

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
            return 'Store Tank'
        }
    },
    components: {
        Heading,
        Button,
        Errors
    },
    methods: {
        storeTank() {
            console.log(this.tank)
            this.isLoading = true
            this.$http.post(this.$baseUri + '/tanks', this.tank)
            .then( resp => {
                this.$router.push( {name: 'tanks.index'} )
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