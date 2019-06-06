<template>
    <div class="panel panel-default">   
        <div class="panel-body">
            <Errors :v-show="anyErrors" :errors="errors" />
            <form @submit.prevent="storeSale">
                <Heading :message="message" />
                <div class="form-group">
                    <label for="Sale Volume">Sale Volume (in litres)</label>
                    <input type="text" v-model="sale.sale_volume" class="form-control" placeholder="500" required>
                </div>
                <Button txt="Store sale" />
            </form>
        </div>
    </div>

<!-- <DailyForm inputName="Closing sale (in litres)" @submit="storesale" :errors="errors" 
:vmodel="sale.closing_sale" btnTxt="Store sale" :anyErrors="anyErrors" :message="message" /> -->

</template>

<script>
import Errors from '@/components/Errors.vue'
import Button from '@/components/Button.vue'
import Heading from '@/components/Heading.vue'

export default {
    name: 'SalesForm',
    data() {
        return {
            errors: {

            },
            sale: {

            }
        } 
    },
    computed: {
        message() {
            return "Add Daily Sales | " + (new Date()).toDateString()
        },
        anyErrors() {
            return Object.getOwnPropertyNames( this.errors ).length > 0
        }
    },
    methods: {
        storeSale() {
            console.log(this.sale.sale_volume)
            console.log('Sale stored')
            this.$http.post( this.$baseUri + '/dispensers/' + this.$route.params.dispenserId + '/sales', this.sale)
            .then( resp => {
                alert('Daily sale added successfully')
                this.$router.push({ name: 'dispensers.index' })
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