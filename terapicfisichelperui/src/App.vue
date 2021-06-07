<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" 
      :clipped="$vuetify.breakpoint.lgAndUp" 
      app
    >
    <v-list dense>
      <template>
        <v-list-item :to="{ name:'Home' }">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            Inicios
          </v-list-item-title>
        </v-list-item>
      </template>

      <template>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Seguridades
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'users' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Users
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'customers' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Customers
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'specialist' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Specialists
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Session
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Sessions
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Equipaments
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Tags
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                SessionEquipaments
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                TagSessions
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Register
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Histories
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Reviews
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Membership
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                SubscriptionPlans
              </v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name:'' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
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

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app 
      color="indigo darken-4" dark>
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

import Principal from './components/Principal';

export default {
  name: 'App',

  components: {
    Principal
  },

  data: () => ({
    drawer: null
  }),
};
</script>
