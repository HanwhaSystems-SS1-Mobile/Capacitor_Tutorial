<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Tutorial</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tutorial</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-list>
        <MessageListItem v-for="message in messages" :key="message.id" :message="message" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { defineComponent } from 'vue';
import { getMessages } from '@/data/messages';
import HomeViewModel from '../viewModel/HomeViewModel'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      messages: getMessages()
    }
  },
  methods: {
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    }
  },
  created() {
    let viewModel = new HomeViewModel()
    viewModel.requestPmCheck()

    viewModel.obUserGroupInfo
      .subscribe({
        next: async (result) => {
          console.log(result)
        }
      })
  },
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    MessageListItem
  }
});
</script>
