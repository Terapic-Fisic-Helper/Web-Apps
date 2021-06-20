<template>
  <v-data-table
    :headers="headers"
    :items="sessions"
    :search="search"
    sort-by="title"
    class="elevation-1"
    style="width:800px"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Session Lists</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-text-field
          label="Search Session"
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
              >New Session</v-btn
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
                      v-model="specialistId"
                      label="SpecialistId"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      type="date"
                      v-model="startDate"
                      label="StartDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      type="datetime"
                      v-model="startHour"
                      label="StartHour"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      type="datetime"
                      v-model="endHour"
                      label="EndHour"
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
        <td>{{ item.specialistId }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.startDate }}</td>
        <td>{{ item.startHour }}</td>
        <td>{{ item.endHour }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listSessions">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    id: "",
    specialistId: "",
    title: "",
    description: "",
    startDate: "",
    startHour: "",
    endHour: "",
    dialog: false,
    editedIndex: -1,
    sessions: [],
    valid: 0,
    validMessage: [],
    headers: [
      { text: "SpecialistId", value: "specialistId", sortable: false },
      { text: "Title", value: "title", sortable: true },
      { text: "Description", value: "description", sortable: false },
      { text: "StartDate", value: "startDate", sortable: false },
      { text: "StartHour", value: "startHour", sortable: false },
      { text: "EndHour", value: "endHour", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Session" : "Edit Session";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listSessions();
  },
  methods: {
    listSessions() {
      let me = this;
      axios
        .get("api/Sessions")
        .then(function(response) {
          me.sessions = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item) {
      this.id = item.id;
      this.specialistId = item.specialistId;
      this.title = item.title;
      this.description = item.description;
      this.startDate = item.startDate;
      this.startHour = item.startHour;
      this.endHour = item.endHour;
      this.editedIndex = 1;
      this.dialog = true;
    },
    deleteItem(item) {
      let me = this;
      if (confirm("¿Estás seguro que quieres eliminar este Session?"))
        axios
          .delete("api/Sessions/" + item.id, {
            id: item.id,
          })
          .then(function(response) {
            console.log(item.id);
            me.listSessions();
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
      this.specialistId = "";
      this.title = "";
      this.description = "";
      this.startDate = "";
      this.startHour = "";
      this.endHour = "";
    },
    save() {
      if (this.isValidName()) {
        return;
      }
      let me = this;
      if (this.editedIndex > -1) {
        axios
          .put("api/Sessions/" + me.id, {
            id: me.id,
            specialistId: me.specialistId,
            title: me.title,
            description: me.description,
            startDate: me.startDate,
            startHour: me.startHour,
            endHour: me.endHour,
          })
          .then(function(response) {
            me.close();
            me.listSessions();
            me.clean();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("api/Sessions", {
            specialistId: me.specialistId,
            title: me.title,
            description: me.description,
            startDate: me.startDate,
            startHour: me.startHour,
            endHour: me.endHour,
          })
          .then(function(response) {
            me.close();
            me.listSessions();
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

      if (this.specialistId.length == null) {
        this.validMessage.push("El Codigo de Specialist si o si debes colocar");
      }

      if (this.title.length < 3 || this.title.length > 50) {
        this.validMessage.push(
          "El titulo debe tener mas de 3 caracteres y menos de 50 caracteres"
        );
      }

      if (this.description.length < 3 || this.description.length > 255) {
        this.validMessage.push(
          "La Descripcion debe tener mas de 3 caracteres y menos de 255 caracteres"
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
