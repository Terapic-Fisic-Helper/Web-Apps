<style>
.backg-img {
  background: url("./assets/bann.png") no-repeat center;
  background-size: cover;
  /* background-position-y: -100px; */
  /* position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px; */
}
</style>
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color="light-blue lighten-5"
    >
      <v-list dense>
        <template>
          <v-list-item :to="{ name: 'Home' }">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>

        <template>
          <v-list-group
            color="light-blue darken-4"
            :value="true"
            prepend-icon="security"
          >
            <!--  -->
            <template v-slot:activator>
              <v-list-item-title>
                Seguridad
              </v-list-item-title>
            </template>
            <!--  -->
            <v-list-item :to="{ name: 'users' }">
              <v-list-item-action>
                <v-icon>people</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Users
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'customers' }">
              <v-list-item-action>
                <v-icon>person</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Customers
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'specialists' }">
              <v-list-item-action>
                <v-icon>medication</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Specialists
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group
            color="light-blue darken-4"
            :value="true"
            prepend-icon="calendar_today"
          >
            <template v-slot:activator>
              <v-list-item-title>
                Session
              </v-list-item-title>
            </template>
            <v-list-item :to="{ name: 'sessions' }">
              <v-list-item-action>
                <v-icon>event</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Sessions
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'equipaments' }">
              <v-list-item-action>
                <v-icon>healing</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Equipaments
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'tags' }">
              <v-list-item-action>
                <v-icon>style</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Tags
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'sessionEquipaments' }">
              <v-list-item-action>
                <v-icon>medical_services</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  SessionEquipaments
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'tagSessions' }">
              <v-list-item-action>
                <v-icon>book_online</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  TagSessions
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group
            color="light-blue darken-4"
            :value="true"
            prepend-icon="rate_review"
          >
            <template v-slot:activator>
              <v-list-item-title>
                Register
              </v-list-item-title>
            </template>
            <v-list-item :to="{ name: 'histories' }">
              <v-list-item-action>
                <v-icon>library_books</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Histories
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'reviews' }">
              <v-list-item-action>
                <v-icon>rule</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Reviews
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group
            color="light-blue darken-4"
            :value="true"
            prepend-icon="verified"
          >
            <template v-slot:activator>
              <v-list-item-title>
                Membership
              </v-list-item-title>
            </template>
            <v-list-item :to="{ name: 'subscriptionPlans' }">
              <v-list-item-action>
                <v-icon>add_box</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  SubscriptionPlans
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'subscriptions' }">
              <v-list-item-action>
                <v-icon>add_circle_outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Subscriptions
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="light-blue darken-4"
      dark
      class="backg-img"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">Terapic Fisic Helper</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-slide-x-transition mode="out-in">
          <router-view />
        </v-slide-x-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Principal from "./components/Principal";

export default {
  name: "App",

  components: {
    Principal,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
