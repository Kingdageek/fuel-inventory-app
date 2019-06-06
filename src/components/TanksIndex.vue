<template>
    <div id='tanks'>
        <div>
            <router-link to="/tanks/create" class="btn btn-success pull-right">Create Tank</router-link>
        </div>
        <div class="panel-heading">
            <h2>Tanks</h2>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <p v-if="isLoading" class="text-center"><strong>Loading tanks...</strong></p>
                <div v-else="isLoading">
                    <div v-if="noTank">
                        <table class="table table-hover">
                            <thead>
                                <th>
                                    Serial Number
                                </th>
                                <th>
                                    Capacity
                                </th>
                                <th>
                                    Fuel Type
                                </th>
                                <th>
                                    Stock Left
                                </th>
                                <th>
                                    Actions
                                </th>
                            </thead>
                            <tbody>                            
                                <tr v-for="tank in tanks" :key="tank.id">
                                    <td>
                                        {{ tank.serial_num }}
                                    </td>
                                    <td>
                                        {{ tank.capacity }}
                                    </td>
                                    <td>
                                        {{ tank.fuel_type }}
                                    </td>
                                    <td>
                                        {{ tank.stock_left }}
                                    </td>
                                    <td>
                                        <router-link :to="{ name: 'tanks.edit', params: {tankId: tank.id} }" class="btn btn-xs btn-primary">
                                            Edit
                                        </router-link>

                                        <button class="btn btn-danger btn-xs" @click.prevent="deleteTank(tank.id)" style="display:inline-block">Delete</button>

                                        <!-- <router-link :to="{ name: 'tanks.stock.index', params: {tankId: tank.id} }" class="btn btn-xs btn-info">
                                            Stock history
                                        </router-link> -->

                                        <router-link :to="{ name: 'tanks.stock.create', params: {tankId: tank.id} }" class="btn btn-xs btn-success">
                                            Enter closing stock
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else="noTank">
                        <p class="text-center"><strong>No tanks yet. Create a new tank above</strong></p>
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
                tanks: [
                    
                ],
                isLoading: true
            }
        },

        created() {
            this.fetchTanks()
        },

        computed: {
            noTank() {
                return this.tanks.length > 0
            }
        },

        methods: {
            fetchTanks() {
                this.$http.get(this.$baseUri + '/tanks')
                .then( resp => {
                    this.tanks = resp.data.data
                    this.isLoading = false
                    console.log(resp)
                })
                .catch( err => {
                    console.log(err)
                })
            },

            deleteTank (tankId) {
                if ( confirm('Sure to delete this tank?') ) {
                    let index = this.tanks.findIndex( tank => tank.id == tankId )
                    this.$http.delete(this.$baseUri + '/tanks/' + tankId)
                    .then( resp => {
                        this.tanks.splice(index, 1)
                    })
                    .catch ( err => {
                        console.log(err.response)
                    })
                }
            }
        }
    }
</script>