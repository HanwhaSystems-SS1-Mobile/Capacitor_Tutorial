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
        <ion-button color="tertiary" v-if="isShowBtn" v-on:click="func(message)">실행</ion-button>
        <ion-input v-if="isShowInput"  placeholder="입력창"></ion-input>
        <ion-img :src="img"></ion-img>
        <pre><code>{{code}}</code></pre>
      </div>


    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote, IonPage, IonToolbar } from '@ionic/vue';
import { logoTux } from 'ionicons/icons';
import { getMessage, Message } from '../data/messages';
import { defineComponent } from 'vue';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Clipboard } from '@capacitor/clipboard';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SharedPreference } from 'capacitor-plugin-hanwha-sharedpreference';
import { Keyboard } from '@capacitor/keyboard';
import { Toast } from '@capacitor/toast';
import { Network } from '@capacitor/network';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { PushNotifications } from '@capacitor/push-notifications';
import { FilePicker, FilePickerResult } from "capacitor-file-picker";

export default defineComponent({
  name: 'ViewMessagePage',
  data() {
    return {
      img: "",
      isShowBtn: true,
      isShowInput: true,
      code: "",
      logoTux,
      getBackButtonText: () => {
       // const win = window as any;
       // const mode = win && win.Ionic && win.Ionic.mode;
        return 'Tutorial';
      }
    }
  },

  created() {

    // 키보드를 위한 input 활성화 여부
    if(this.message.id === 11) {
      this.isShowInput = true
      this.isShowBtn = false
    } else {
      this.isShowInput = false
      this.isShowBtn = true
    }

  },

  async mounted() {

    // 키보드 이벤트 리스너 등록
    Keyboard.addListener('keyboardDidShow', async info => {
      await Toast.show({
        text: `keyboard did show (hight:${info.keyboardHeight})`
      });
    });

    Keyboard.addListener('keyboardDidHide', async () => {
      await Toast.show({
        text: 'keyboard did hide'
      });
    });

    await PushNotifications.addListener('registration', token => {
      alert(token.value)
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      alert( err.error)
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      const {notification:{data:{aps:{alert:{body}}}}}= notification
      alert(body)
    });
  },
  beforeUnmount() {
      // 모든 키보드 리스너 제거 (mounted 될 때마다 중복되서 선언되면 안되기 때문)
      Keyboard.removeAllListeners()
      PushNotifications.removeAllListeners()
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
        case 8: this.settingHaptics(); break;
        case 9: this.getStorage(); break;
        case 10: this.getSharedPreference(); break;
        case 12: this.showToast(); break;
        case 13: this.getNetworkStatus(); break;
        case 14: this.settingSplash(); break;
        case 15: this.settingStatusBar(); break;
        case 16: this.settingPushNotification(); break;
      }
    },

    /**
     * @date 2022-04-20
     * @author 이승인
     * @description Action Sheet Plugin
     */
    async showActions() {
      let url = "test://"
      try {
        window.location.href = url;
    } catch (e) {
      alert(e)
        //document.location = fallback;
        return;
    }

   

   
    },

    async showOpenURL(link: string) {
      await AppLauncher.openUrl({ url: link });
    },

    async showOpenBrowser(link: string) {
      await Browser.open({ url: link });
    },

    async takePicture() {

      
        const result = await ActionSheet.showActions({
          title: '',
          message: '',
          options: [
            {
              title: '갤러리선택'
            },
            {
              title: '파일선택'
            },
            {
              title: '사진촬영'
            },
            {
              title: '취소',
              style: ActionSheetButtonStyle.Destructive
            }
          ]
        });

      const { index } = result


      switch (index) {
        case 0: {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
          })
          this.img = image.webPath;
        } break
        case 1: {
          FilePicker.showFilePicker({
            fileTypes: ["image/*", "application/pdf", "application/json", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
          }).then(
            (fileResult: FilePickerResult) => {
              const fileUri = fileResult.uri;
              const fileName = fileResult.name;
              const fileMimeType = fileResult.mimeType;
              const fileExtension = fileResult.extension;
            },
            (error) => {
              console.log(error);
            }
          );
        } break
        case 2: {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
          });
          this.img = image.webPath;
        } break

        default: break
      }

  
      // // 카메라 바로 호출을 원할 때는  "source: CameraSource.Camera" 를 입력하여, 바로 source를 선언해준다
      // 
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

    async settingHaptics() {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    },

    async getStorage() {
     // SharedPreference.configuration({ appgroup:"group.hanwha.mgr.app", iv:""})     

      // const { results } = await SharedPreference.get({ key: "authtoken", default: "11", encrypt: true })
      // alert(JSON.stringify(results))
      
    },

    async getSharedPreference() {
      //SharedPreference.configuration({appgroup:"group.hanwha.mgr.app", iv:""})

      // let { results } = await SharedPreference.set({ key: "currentUserInfo2", value: "11", encrypt: true })
      // alert(JSON.stringify(JSON.parse(results)))

      const { results } = await SharedPreference.get({ key: "currentUserInfo", default: "12", encrypt: true })
      alert(JSON.stringify(JSON.parse(results)))

    },

    async showToast() {
      await Toast.show({
        text: 'Hello!',
        position: "center"
      });
    },

    async getNetworkStatus() {
      const status = await Network.getStatus();
      alert(`Network status: ${JSON.stringify(status)}`);
    },

    async settingSplash() {
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true
      });
    },
    
    async settingStatusBar() {
      const status =  (await StatusBar.getInfo()).visible
      if(status === true) {
        await StatusBar.hide();
      } else {
        await StatusBar.show();
      }
    },

    async settingPushNotification() {
      await PushNotifications.requestPermissions()
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
    IonToolbar,
    IonInput
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
