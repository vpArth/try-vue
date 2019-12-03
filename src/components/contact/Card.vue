<template>
<v-card>
  <v-card-title>
    <h2 class="card-title" v-text="title" />
    <v-spacer></v-spacer>

    <v-btn class="mx-2 btn-phone" tile outlined color="success" :href="'tel:'+phone">
      <v-icon left dark>phone</v-icon>
      <span class="caption">{{phone}}</span>
    </v-btn>
    <v-btn class="mx-2 btn-email" tile outlined color="success" :href="'mailto:'+email">
      <v-icon left dark>email</v-icon>
      <span class="caption">{{email}}</span>
    </v-btn>
    <v-btn class="mx-2 btn-remove" icon small @click="$emit('remove-btn:clicked')">
      <v-icon color="error">delete</v-icon>
    </v-btn>
  </v-card-title>

  <v-card-text>
    <slot/>
  </v-card-text>
</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContactCard extends Vue {
  @Prop() protected title!: string;
  @Prop() protected phone!: string;
  @Prop() protected email!: string;
}
</script>
