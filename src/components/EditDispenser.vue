<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <p v-if="isLoadingOld" class="text-center"><strong>Loading...</strong></p>
            <div v-else="isLoadingOld">
                <Errors v-show="anyErrors" :errors="errors" />
                <form @submit.prevent="updateDispenser">
                    <Heading :message="message" />
                    <div class="form-group">
                        <label for="Serial Number">Serial Number</label>
                        <input type="text" v-model="dispenser.serial_num" class="form-control" placeholder="37DKDUHUEUDLD7"
                         required>
                    </div>
                    <div class="form-group">
                        <label for="Number of Nozzles">Number of Nozzles</label>
                        <input type="text" v-model="dispenser.num_of_nozzles" class="form-control" placeholder="5" required>
                    </div>
                    <div class="form-group">
                        <label for="Fuel Type">Fuel Type</label>
                        <select id="Fuel Type" class="form-control" v-model="dispenser.fuel_type">
                            <option v-for="(opt, i) in opts" :key="i" >
                                {{ opt }}
                            </option>
                        </select>
                    </div>
                    <!--
                    <Input name="Serial Number" type="text" vmodel= "dispenser.serial_num" placeholder="18E9E9IKDLD" />
                    <Input name="Capacity" type="text" vmodel= "dispenser.capacity" placeholder="6" />
                    <Select name="Fuel Type" :opts="opts" vmodel= "dispenser.fuel_type" /> -->
                    <Button :txt="btnTxt" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Heading from '@/components/Heading.vue'
    import Button from '@/components/Button.vue'
    import Errors from '@/components/Errors.vue'

    export default {
        name: 'EditDispenser',
        data() {
            return {
                dispenser: {
                    
                },
                opts: [
                    'Petroleum', 'Compressed Natural Gas', 'Alcohols', 'Specialized'
                ],
                errors: {

                },
                isLoadingOld: true,
                isLoading: false
            }
        },
        created() {
            this.fetchOldDispenserData()
        },
        computed: {
            message() {
                return 'Edit Dispenser: ' + this.dispenser.serial_num
            },
            anyErrors() {
                return Object.getOwnPropertyNames( this.errors ).length > 0
            },
            btnTxt() {
                if (this.isLoading) {
                    return 'Updating...'
                }
                return 'Update dispenser'
            }
        },
        components: {
            Heading,
            Button,
            Errors
        },
        watch: {
            '$route': 'fetchOldDispenserData'
        },
        methods: {
            updateDispenser() {
                console.log(this.dispenser)
                this.isLoading = true
                this.$http.patch(this.$baseUri + "/dispensers/" + this.$route.params.dispenserId,
                    this.dispenser
                )
                .then( resp => {
                    this.$router.push({ name: 'dispensers.index' })
                })
                .catch( err => {
                    console.log(err.response)
                    this.errors = err.response.data.errors
                })

                this.isLoading = false
            },

            fetchOldDispenserData() {
                this.$http.get(this.$baseUri + "/dispensers/" + this.$route.params.dispenserId)
                .then( resp => {
                    this.dispenser = resp.data.data
                    this.isLoadingOld = false
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>