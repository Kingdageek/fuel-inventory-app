<template>
    <div id='dispensers'>
        <div>
            <router-link to="/dispensers/create" class="btn btn-success pull-right">Create Dispenser</router-link>
        </div>
        <div class="panel-heading">
            <h2>Dispensers</h2>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <p v-if="isLoading" class="text-center"><strong>Loading dispensers...</strong></p>
                <div v-else="isLoading">
                    <div v-if="noDispenser">
                        <table class="table table-hover">
                            <thead>
                                <th>
                                    Serial Number
                                </th>
                                <th>
                                    Number of Nozzles
                                </th>
                                <th>
                                    Fuel Type
                                </th>
                                <th>
                                    Actions
                                </th>
                            </thead>
                            <tbody>                            
                                <tr v-for="dispenser in dispensers" :key="dispenser.id">
                                    <td>
                                        {{ dispenser.serial_num }}
                                    </td>
                                    <td>
                                        {{ dispenser.num_of_nozzles }}
                                    </td>
                                    <td>
                                        {{ dispenser.fuel_type }}
                                    </td>
                                    <td>
                                        <router-link :to="{ name: 'dispensers.edit', params: { dispenserId: dispenser.id } }" class="btn btn-xs btn-primary">
                                            Edit
                                        </router-link>

                                        <button class="btn btn-danger btn-xs" @click.prevent= "deleteDispenser(dispenser.id)" style="display:inline-block">Delete</button>

                                        <!-- <router-link :to="{ name: 'dispensers.sales.index', params: {dispenserId: dispenser.id} }" class="btn btn-xs btn-info">
                                            Sales history
                                        </router-link> -->

                                        <router-link :to="{ name: 'dispensers.sales.create', params: {dispenserId: dispenser.id} }" class="btn btn-xs btn-success">
                                            Add sale
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else="noDispenser">
                        <p class="text-center"><strong>No Dispensers yet. Create a new dispenser above</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dispensers: [
                    
                ],
                isLoading: true
            }
        },

        computed: {
            noDispenser() {
                return this.dispensers.length > 0
            }
        },

        created() {
            this.fetchDispensers()
        },

        methods: {
            fetchDispensers() {
                this.$http.get( this.$baseUri + '/dispensers')
                .then( resp => {
                    this.dispensers = resp.data.data
                    this.isLoading = false
                })
                .catch( err => {
                    console.log(err)
                })
            },
            deleteDispenser (dispenserId) {
                console.log(this.dispensers.findIndex( dispenser => dispenser.id == dispenserId ))
                if ( confirm('Sure to delete this dispenser?') ) {
                    let index = this.dispensers.findIndex( dispenser => dispenser.id == dispenserId )
                    this.$http.delete(this.$baseUri + '/dispensers/' + dispenserId)
                    .then( resp => {
                        this.dispensers.splice(index, 1)
                    })
                    .catch ( err => {
                        console.log(err.response)
                    })
                }
            }
        }
    }
</script>