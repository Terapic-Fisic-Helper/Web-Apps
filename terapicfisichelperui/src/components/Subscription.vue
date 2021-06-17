<template>
    <v-data-table 
    :headers="headers"
    :items="subscriptions"
    :search="search"
    class="elevation-1" style="width:800px">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Subscriptions Lists</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Subscriptions" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Subscriptions</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="customerId" label="CustomerId"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="subscriptionPlanId" label="SubscriptionPlanId"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field type="date" v-model="expiryDate" label="ExpiryDate"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field type="date" v-model="startDate" label="StartDate"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
            <tr>
                <td>{{ item.customerId }}</td>
                <td>{{ item.subscriptionPlanId }}</td>
                <td>{{ item.expiryDate }}</td>
                <td>{{ item.startDate }}</td>
                
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listSubscriptions">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            customerId: '',
            subscriptionPlanId: '',
            expiryDate: '',
            startDate: '',
            dialog: false,
            subscriptions: [],
            headers: [
                { text: 'CustomerId', value: 'customerId', sortable: true },
                { text: 'SubscriptionPlanId', value: 'subscriptionPlanId', sortable: false },
                { text: 'ExpiryDate', value: 'expiryDate', sortable: false },
                { text: 'StartDate', value: 'startDate', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }),
        computed: {
            formTitle() {
                return 'New Subscriptions';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listSubscriptions();
        },
        methods: {
            listSubscriptions() {
                let me= this;
                axios.get('api/Subscriptions').then(function(response){
                    me.subscriptions = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este Subscriptions?'))
                    axios.delete('api/Subscriptions/' + item.id, {
                        'id': item.id
                    }).then(function(response){
                        console.log(item.id);
                        me.listSubscriptions();
                        me.close();
                        me.clean();
                    }).catch(function(error){
                        console.log(error);
                    })
            },
            close() {
                this.dialog = false;
            },
            clean() {
                this.customerId = "";
                this.subscriptionPlanId = "";
                this.expiryDate= "";
                this.startDate = "";
            },
            save() {
                let me=this;
                axios.post('api/SubscriptionPlans', {
                    'customerId': me.customerId,
                    'subscriptionPlanId': me.subscriptionPlanId,
                    'expiryDate': me.expiryDate,
                    'startDate': me.startDate,
                }).then(function(response){
                    me.close();
                    me.listSubscriptions();
                    me.clean();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>
