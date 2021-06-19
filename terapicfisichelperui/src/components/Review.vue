<template>
  <v-data-table
    :headers="headers"
    :items="reviews"
    :search="search"
    sort-by="description"
    class="elevation-1"
    style="width:800px"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Reviews Lists</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>
        <v-text-field
          label="Search Reviews"
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
              >New Reviews</v-btn
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
                      v-model="description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="rank" label="Rank"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="customerId"
                      label="CustomerId"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="specialistId"
                      label="SpecialistId"
                    ></v-text-field>
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
        <td>{{ item.description }}</td>
        <td>{{ item.rank }}</td>
        <td>{{ item.customerId }}</td>
        <td>{{ item.specialistId }}</td>
      </tr>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listReviews">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    description: "",
    rank: 0,
    customerId: 0,
    specialistId: 0,
    dialog: false,
    reviews: [],
    headers: [
      { text: "Description", value: "description", sortable: true },
      { text: "Rank", value: "rank", sortable: false },
      { text: "CustomerId", value: "customerId", sortable: false },
      { text: "SpecialistId", value: "specialistId", sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return "New Reviews";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listReviews();
  },
  methods: {
    listReviews() {
      let me = this;
      axios
        .get("api/Reviews")
        .then(function(response) {
          me.reviews = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
    },
    clean() {
      this.description = "";
      this.rank = "";
      this.customerId = "";
      this.specialistId = "";
    },
    save() {
      let me = this;
      axios
        .post("api/Reviews", {
          description: me.description,
          rank: me.rank,
          customerId: me.customerId,
          specialistId: me.specialistId,
        })
        .then(function(response) {
          me.close();
          me.listReviews();
          me.clean();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
