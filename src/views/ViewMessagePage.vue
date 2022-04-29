<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" v-if="message">
      <ion-item>
        <ion-icon :icon="logoTux" color="primary"></ion-icon>
        <ion-label class="ion-text-wrap">
          <h2>
            {{ message.fromName }}
            <span class="date">
              <ion-note>작성자 : 이승인 대리</ion-note>
            </span>
          </h2>
          <h3 v-on:click="showOpenBrowser(message.link)">Link: <ion-note>API문서 링크</ion-note></h3>
        </ion-label>
      </ion-item>
      
      <div class="ion-padding">
        <h4>{{ message.subject }}</h4>
        <br/>
        <ion-label color="danger">설치</ion-label>
        <p>
         {{message.contents}}
        </p>
        <ion-button color="tertiary" v-on:click="func(message)">실행</ion-button>
        <ion-img :src="img"></ion-img>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonNote, IonPage, IonToolbar } from '@ionic/vue';
import { logoTux } from 'ionicons/icons';
import { getMessage, Message } from '../data/messages';
import { defineComponent } from 'vue';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Clipboard } from '@capacitor/clipboard';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default defineComponent({
  name: 'ViewMessagePage',
  data() {
    return {
      img: "",
      logoTux,
      getBackButtonText: () => {
       // const win = window as any;
       // const mode = win && win.Ionic && win.Ionic.mode;
        return 'Tutorial';
      }
    }
  },
  methods: {
    func(message: Message) {
      switch(message.id) {
        case 0: this.showActions(); break;
        case 1: this.showOpenURL(message.link); break;
        case 2: this.showOpenBrowser(message.link); break;
        case 3: this.takePicture(); break;
        case 4: this.takeClipboard(); break;
        case 5: this.getDeviceInfo(); break;
        case 6: this.getAppInfo(); break;
        case 7: this.takeDialog(); break;
        case 8: this.setHaptics(); break;
      }
    },

    /**
     * @date 2022-04-20
     * @author 이승인
     * @description Action Sheet Plugin
     */
    async showActions() {
      const result = await ActionSheet.showActions({
        title: 'Photo Options',
        message: 'Select an option to perform',
        options: [
          {
            title: 'Upload'
          },
          {
            title: 'Share'
          },
          {
            title: 'Remove',
            style: ActionSheetButtonStyle.Destructive
          }
        ]
      });
      alert(`선택값 ${JSON.stringify(result.index)}`);
    },

    async showOpenURL(link: string) {
      await AppLauncher.openUrl({ url: link });
    },

    async showOpenBrowser(link: string) {
      await Browser.open({ url: link });
    },

    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      // 카메라 바로 호출을 원할 때는  "source: CameraSource.Camera" 를 입력하여, 바로 source를 선언해준다
      this.img = image.webPath;
    },

    async takeClipboard() {
      await Clipboard.write({
        string: "한화시스템/ICT Shared Service 1팀"
      });

      const { type, value } = await Clipboard.read();

      alert(value)
    },

    async getDeviceInfo() {
      const info = await Device.getInfo();
      alert(JSON.stringify(info));
    },

    async getAppInfo() {
      const info = await App.getInfo()

      alert(JSON.stringify(info))
    },

    async takeDialog() {
      const { value } = await Dialog.confirm({
        title: 'Confirm',
        message: `Are you sure you'd like to press the red button?`
      });

      alert(`Confirmed: ${value}`);
    },

    async setHaptics() {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }

  },
  setup() {
    const route = useRoute();
    const message = getMessage(parseInt(route.params.id as string, 10));

    return { message }
  },
  components: {
    IonBackButton,
    IonButtons,
    IonButton,
    IonImg,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonToolbar
  }
});
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .date {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}
</style>