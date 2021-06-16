<template>
    <v-data-table 
    :headers="headers"
    :items="equipaments"
    :search="search"
    sort-by="name"
    class="elevation-1" style="width:800px">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Equipament Lists</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Equipament" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Equipament</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="name" label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="description" label="Description"></v-text-field>
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
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>

                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listEquipaments">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            id: '',
            name: '',
            description: '',
            dialog: false,
            editedIndex: -1,
            equipaments: [],
            valid: 0,
            validMessage: [],
            headers: [
                { text: 'Name', value: 'name', sortable: true },
                { text: 'Description', value: 'description', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Equipament': 'Edit Equipament'
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listEquipaments();
        },
        methods: {
            listEquipaments() {
                let me= this;
                axios.get('api/Equipaments').then(function(response){
                    me.equipaments = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.id = item.id;
                this.name = item.name;
                this.description = item.description;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este Equipament?'))
                    axios.delete('api/Equipaments/' + item.id, {
                        'id': item.id
                    }).then(function(response){
                        console.log(item.id);
                        me.listEquipaments();
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
                this.id = "";
                this.name = "";
                this.description = "";
            },
            save() {
                if(this.isValidName()){
                    return;
                }
                let me=this;
                if(this.editedIndex > -1) {
                    axios.put('api/Equipaments/' + me.id,{
                        'id': me.id,
                        'name': me.name,
                        'description': me.description
                    }).then(function(response){
                        me.close();
                        me.listEquipaments();
                        me.clean();
                    }).catch(function(error){
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Equipaments', {
                        'name': me.name,
                        'description': me.description
                    }).then(function(response){
                        me.close();
                        me.listEquipaments();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            },
            isValidName() {
                this.valid = 0;
                this.validMessage = [];

                if(this.name.length < 3 || this.name.length > 50) {
                    this.validMessage.push("El Nombre debe tener mas de 3 caracteres y menos de 50 caracteres");
                }

                if(this.description.length < 3 || this.description.length > 255) {
                    this.validMessage.push("La Descripcion debe tener mas de 3 caracteres y menos de 255 caracteres");
                }

                if(this.validMessage.length) {
                    this.valid = 1;
                }
                return this.valid;
            }
        }
    }
</script>