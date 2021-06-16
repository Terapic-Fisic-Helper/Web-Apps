<template>
    <v-data-table 
    :headers="headers"
    :items="equipamentSessions"
    :search="search"
    class="elevation-1" style="width:800px">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Equipament-Session Lists</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Equipament-Session" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Equipament-Session</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="equipamentId" label="EquipamentId"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="sessionId" label="SessionId"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" v-show="isValidName">
                                        <div class="red--text" v-for="v in validMessage" :key="v" v-text="v" />
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
                <td>{{ item.equipamentId }}</td>
                <td>{{ item.sessionId }}</td>

                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listEquipamentSessions">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            equipamentId: 0,
            sessionId: 0,
            dialog: false,
            equipamentSessions: [],
            valid: 0,
            validMessage: [],
            headers: [
                { text: 'EquipamentId', value: 'equipamentId', sortable: false },
                { text: 'SessionId', value: 'sessionId', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }),
        computed: {
            formTitle() {
                return 'New EquipamentSessions';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listEquipamentSessions();
        },
        methods: {
            listEquipamentSessions() {
                let me= this;
                axios.get('api/EquipamentSessions').then(function(response){
                    me.equipamentSessions = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este EquipamentSessions?'))
                    axios.delete('api/EquipamentSessions/' + item.id, {
                        'id': item.id
                    }).then(function(response){
                        console.log(item.id);
                        me.listEquipamentSessions();
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
                this.equipamentId = "";
                this.sessionId = "";
            },
            save() {
                if(this.isValidName()){
                    return;
                }
                let me=this;
                axios.post('api/EquipamentSessions', {
                    'equipamentId': me.equipamentId,
                    'sessionId': me.sessionId
                }).then(function(response){
                    me.close();
                    me.listEquipamentSessions();
                    me.clean();
                }).catch(function(error) {
                    console.log(error);
                });
            },
            isValidName() {
                this.valid = 0;
                this.validMessage = [];

                if(this.equipamentId.length) {
                    this.validMessage.push("El Codigo Equipaments debe ser considerado");
                }

                if(this.sessionId.length) {
                    this.validMessage.push("El Codigo Sessions debe ser considerado");
                }

                if(this.validMessage.length) {
                    this.valid = 1;
                }
                return this.valid;
            }
        }
    }
</script>