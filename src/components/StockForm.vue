<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors :v-show="anyErrors" :errors="errors" />
            <form @submit.prevent="storeStock">
                <Heading :message="message" />
                <div class="form-group">
                    <label for="Closing Stock">Closing Stock (in litres)</label>
                    <input type="text" v-model="stock.closing_stock" class="form-control" placeholder="500" required>
                </div>
                <Button txt="Store Stock" />
            </form>
        </div>
    </div>

<!-- <DailyForm inputName="Closing Stock (in litres)" @submit="storeStock" :errors="errors" 
:vmodel="stock.closing_stock" btnTxt="Store Stock" :anyErrors="anyErrors" :message="message" /> -->

</template>

<script>
import Errors from '@/components/Errors.vue'
import Button from '@/components/Button.vue'
import Heading from '@/components/Heading.vue'

export default {
    name: 'StockForm',
    data() {
        return {
            errors: {

            },
            stock: {

            }
        } 
    },
    computed: {
        message() {
            return "Add Closing Stock | " + (new Date()).toDateString()
        },
        anyErrors() {
            return Object.getOwnPropertyNames( this.errors ).length > 0
        }
    },
    methods: {
        storeStock() {
            console.log(this.stock.closing_stock)
            console.log('Stock stored')
            this.$http.post( this.$baseUri + '/tanks/' + this.$route.params.tankId + '/stock', this.stock)
            .then( resp => {
                alert('Closing Stock added successfully')
                this.$router.push({ name: 'tanks.index' })
            })
            .catch( err => {
                console.log(err.response)
                this.errors = err.response.data.errors
            })
        }
    },
    components: {
        Errors,
        Button,
        Heading
    }
}
</script>