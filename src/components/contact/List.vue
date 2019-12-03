<template>
<v-list>
  <v-list-item
    v-bind:key="index"
    v-for="(card, index) in cards"
  >
    <v-list-item-content>
      <contact-card
        :title="card.title"
        :phone="card.phone"
        :email="card.email"
        @remove-btn:clicked="cardRemove(index)"
      >{{card.description}}
      </contact-card>
    </v-list-item-content>
  </v-list-item>
</v-list>
</template>

<script lang="ts">
import ContactCard from '@/components/contact/Card.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface CardInfo {
  title: string;
  phone: string;
  email: string;
  description: string;
}

@Component({
  components: { ContactCard },
})
export default class ContactList extends Vue {
  @Prop({ default: [] }) protected cards!: CardInfo[];

  cardRemove(index: number) {
    if (confirm(`Delete ${this.cards[index].title}?`)) {
      this.$delete(this.cards, index);
    }
  }
}
</script>
