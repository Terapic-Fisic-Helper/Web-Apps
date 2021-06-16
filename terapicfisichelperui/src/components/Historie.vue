<template>
    <v-data-table 
    :headers="headers"
    :items="histories"
    :search="search"
    class="elevation-1" style="width:800px">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Historie Lists</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Histories" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Histories</v-btn>
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
                                        <v-text-field v-model="sessionId" label="SessionId"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="watched" label="Watched"></v-text-field>
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
                <td>{{ item.sessionId }}</td>
                <td>{{ item.watched }}</td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listHistories">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            customerId: 0,
            sessionId: 0,
            watched: '',
            dialog: false,
            histories: [],
            headers: [
                { text: 'CustomerId', value: 'customerId', sortable: false },
                { text: 'SessionId', value: 'sessionId', sortable: false },
                { text: 'Watched', value: 'watched', sortable: false },
            ]
        }),
        computed: {
            formTitle() {
                return 'New Histories';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listHistories();
        },
        methods: {
            listHistories() {
                let me= this;
                axios.get('api/Histories').then(function(response){
                    me.histories = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            close() {
                this.dialog = false;
            },
            clean() {
                this.customerId = "";
                this.sessionId = "";
                this.watched = "";
            },
            save() {
                let me=this;
                axios.post('api/Histories', {
                    'customerId': me.customerId,
                    'sessionId': me.sessionId,
                    'watched': me.watched
                }).then(function(response){
                    me.close();
                    me.listHistories();
                    me.clean();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>