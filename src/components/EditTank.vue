<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <p v-if="isLoadingOld" class="text-center"><strong>Loading...</strong></p>
            <div v-else="isLoadingOld">
                <Errors v-show="anyErrors" :errors="errors" />
                <form @submit.prevent="updateTank">
                    <Heading :message="message" />
                    <div class="form-group">
                        <label for="Serial Number">Serial Number</label>
                        <input type="text" v-model="tank.serial_num" class="form-control" placeholder="37DKDUHUEUDLD7"
                         required>
                    </div>
                    <div class="form-group">
                        <label for="Capacity">Capacity</label>
                        <input type="text" v-model="tank.capacity" class="form-control" placeholder="5" required>
                    </div>
                    <div class="form-group">
                        <label for="Fuel Type">Fuel Type</label>
                        <select id="Fuel Type" class="form-control" v-model="tank.fuel_type">
                            <option v-for="(opt, i) in opts" :key="i" >
                                {{ opt }}
                            </option>
                        </select>
                    </div>
                    <!--
                    <Input name="Serial Number" type="text" vmodel= "tank.serial_num" placeholder="18E9E9IKDLD" />
                    <Input name="Capacity" type="text" vmodel= "tank.capacity" placeholder="6" />
                    <Select name="Fuel Type" :opts="opts" vmodel= "tank.fuel_type" /> -->
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
        name: 'EditTank',
        data() {
            return {
                tank: {
                    
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
            this.fetchOldTankData()
        },
        computed: {
            message() {
                return 'Edit Tank: ' + this.tank.serial_num
            },
            anyErrors() {
                return Object.getOwnPropertyNames( this.errors ).length > 0
            },
            btnTxt() {
                if (this.isLoading) {
                    return 'Updating...'
                }
                return 'Update tank'
            }
        },
        components: {
            Heading,
            Button,
            Errors
        },
        watch: {
            '$route': 'fetchOldTankData'
        },
        methods: {
            updateTank() {
                console.log(this.tank)
                this.isLoading = true
                this.$http.patch(this.$baseUri + "/tanks/" + this.$route.params.tankId,
                    this.tank
                )
                .then( resp => {
                    this.$router.push({ name: 'tanks.index' })
                })
                .catch( err => {
                    console.log(err.response)
                    this.errors = err.response.data.errors
                })

                this.isLoading = false
            },

            fetchOldTankData() {
                this.$http.get(this.$baseUri + "/tanks/" + this.$route.params.tankId)
                .then( resp => {
                    this.tank = resp.data.data
                    this.isLoadingOld = false
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>