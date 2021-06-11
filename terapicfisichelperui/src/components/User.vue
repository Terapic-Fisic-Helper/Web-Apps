<template>
    <v-data-table 
    class="elevation-1"
    :headers="headers"
    :search="search"
    sort-by="name"
    :items="users">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>CRUD Users</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search User" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activador="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
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
                                        <v-text-field v-model="lastname" label="LastName"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="description" label="Description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="birth" label="Birth"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="address" label="Address"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="phone" label="Phone"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="age" label="Age"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="email" label="Email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="country" label="Country"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="gender" label="Gender"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field type="password" v-model="password" label="Password"></v-text-field>
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
                <td>{{ item.lastName }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.birth }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.password }}</td>
                
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listUsers">Reset</v-btn>
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
            lastname: '',
            description: '',
            birth: '',
            address: '',
            phone: '',
            age: '',
            email: '',
            country: '',
            gender: '',
            password: '',
            dialog: false,
            editedIndex: -1,
            users: [],
            headers: [
                { text: 'Name', value: 'name', sortable: true },
                { text: 'LastName', value: 'lastname', sortable: false },
                { text: 'Description', value: 'description', sortable: false },
                { text: 'Birth', value: 'birth', sortable: false },
                { text: 'Address', value: 'address', sortable: false },
                { text: 'Phone', value: 'phone', sortable: false },
                { text: 'Age', value: 'age', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Country', value: 'country', sortable: false },
                { text: 'Gender', value: 'gender', sortable: false },
                { text: 'Password', value: 'password', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New User': 'Edit User';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listUsers();
        },
        methods: {
            listUsers() {
                let me= this;
                axios.get('api/Users').then(function(response){
                    me.users = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.id = item.Id;
                this.name = item.Name;
                this.lastname = item.LastName;
                this.description = item.Description;
                this.birth = item.Birth;
                this.address = item.Address;
                this.phone = item.Phone;
                this.age = item.Age;
                this.email = item.Email;
                this.country = item.Country;
                this.gender = item.Gender;
                this.password = item.Password;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este User?'))
                    axios.delete('api/Users/' + item.Id, {
                        'id': item.Id
                    }).then(function(response){
                        console.log(item.id);
                        me.listUsers();
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
                this.lastname = "";
                this.description= "";
                this.birth = "";
                this.address = "";
                this.phone = "";
                this.age = "";
                this.email = "";
                this.country = "";
                this.gender = "";
                this.password = "";
            },
            save() {
                let me=this;
                if(this.editedIndex >- 1) {
                    axios.put('api/Users/',{
                        'id': me.Id,
                        'name': me.name,
                        'lastName': me.lastname,
                        'description': me.description,
                        'birth': me.birth,
                        'address': me.address,
                        'phone': me.phone,
                        'age': me.age,
                        'email': me.email,
                        'country': me.country,
                        'gender': me.gender,
                        'password': me.password
                    }).then(function(response){
                        me.close();
                        me.listUsers();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Users', {
                        'name': me.name,
                        'lastName': me.lastname,
                        'description': me.description,
                        'birth': me.birth,
                        'address': me.address,
                        'phone': me.phone,
                        'age': me.age,
                        'email': me.email,
                        'country': me.country,
                        'gender': me.gender,
                        'password': me.password
                    }).then(function(response){
                        me.close();
                        me.listUsers();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                this.close();
            }
        }
    }
</script>
