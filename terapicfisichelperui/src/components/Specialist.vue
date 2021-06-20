<template>
  <v-data-table
    :headers="headers"
    :items="specialists"
    :search="search"
    sort-by="specialty"
    class="elevation-1"
    style="width:800px"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Specialist Lists</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-text-field
          label="Search Specialist"
          append-icon="search"
          class="text-xs-center"
          v-model="search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >New Specialist</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="userId"
                      label="UserId"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="specialty"
                      label="Specialty"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-show="isValidName">
                    <div
                      class="red--text"
                      v-for="v in validMessage"
                      :key="v"
                      v-text="v"
                    />
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
        <td>{{ item.userId }}</td>
        <td>{{ item.specialty }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listSpecialists">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    id: "",
    userId: "",
    specialty: "",
    dialog: false,
    editedIndex: -1,
    specialists: [],
    valid: 0,
    validMessage: [],
    headers: [
      { text: "UserId", value: "userId", sortable: false },
      { text: "Specialty", value: "specialty", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Specialist" : "Edit Specialist";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listSpecialists();
  },
  methods: {
    listSpecialists() {
      let me = this;
      axios
        .get("api/Specialists")
        .then(function(response) {
          me.specialists = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item) {
      this.id = item.id;
      this.userId = item.userId;
      this.specialty = item.specialty;
      this.editedIndex = 1;
      this.dialog = true;
    },
    deleteItem(item) {
      let me = this;
      if (confirm("¿Estás seguro que quieres eliminar este Specialist?"))
        axios
          .delete("api/Specialists/" + item.id, {
            id: item.id,
          })
          .then(function(response) {
            console.log(item.id);
            me.listSpecialists();
            me.close();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    close() {
      this.dialog = false;
    },
    clean() {
      this.id = "";
      this.userId = "";
      this.specialty = "";
    },
    save() {
      if (this.isValidName()) {
        return;
      }
      let me = this;
      if (this.editedIndex > -1) {
        axios
          .put("api/Specialists/" + me.id, {
            id: me.id,
            userId: me.userId,
            specialty: me.specialty,
          })
          .then(function(response) {
            me.close();
            me.listSpecialists();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("api/Specialists", {
            userId: me.userId,
            specialty: me.specialty,
          })
          .then(function(response) {
            me.close();
            me.listSpecialists();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    isValidName() {
      this.valid = 0;
      this.validMessage = [];

      if (this.userId.length == null) {
        this.validMessage.push("El Codigo de Usuario si o si debes colocar");
      }

      if (this.specialty.length < 3 || this.specialty.length > 50) {
        this.validMessage.push(
          "La Descripción debe tener mas de 3 caracteres y menos de 50 caracteres"
        );
      }

      if (this.validMessage.length) {
        this.valid = 1;
      }
      return this.valid;
    },
  },
};
</script>
