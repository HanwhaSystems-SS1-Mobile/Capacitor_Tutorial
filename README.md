# capacitor-hanwha-tutorial



## Clevers

```bash
npm install 
npx cap sync
```

## Run

web
```bash
ionic serve
```

device
```bash
npx cap run ios
npx cap run android
```

## Code 

사용하고자 하는 기능은 `ViewMessagePage.vue` 파일 참고

- `showActions()`: 액션 시트 API는 기본 액션 시트에 대한 액세스를 제공하며, 이 액션 시트는 화면 하단에서 나타나며 사용자가 취할 수 있는 작업을 표시합니다.
- `showOpenURL(link: string)`: iOS에서는 URL 구성표를 알고 있는 경우에만 앱을 열 수 있습니다. Android에서는 URL 구성표를 알고 있거나 공개 패키지 이름을 사용하는 경우 앱을 열 수 있습니다.
- `showOpenBrowser()`: 브라우저 API는 인앱 브라우저를 열고 브라우저 이벤트를 구독하는 기능을 제공합니다.iOS에서 이는 SFSafariViewController 주요 OAuth 서비스 인앱 브라우저 요구 사항을 사용하고 준수합니다.
- `takePicture()`: 카메라 API는 카메라로 사진을 찍거나 사진 앨범에서 기존 사진을 선택할 수 있는 기능을 제공합니다.
- `takeClipboard()`: 클립보드 API를 사용하면 시스템 클립보드에서 복사 및 붙여넣기가 가능합니다.
- `getDeviceInfo()`: Device API는 고유 ID와 같은 사용자 정보와 함께 모델 및 운영 체제 버전과 같은 장치에 대한 내부 정보를 노출합니다.
- `getAppInfo()`: App API는 높은 수준의 앱 상태 및 이벤트를 처리합니다. 예를 들어 이 API는 앱이 포그라운드로 들어오고 나갈 때 이벤트를 내보내고, 딥링크를 처리하고, 다른 앱을 열고, 지속되는 플러그인 상태를 관리합니다
- `takeDialog()`: Dialog API는 경고, 확인 및 입력 프롬프트에 대한 기본 대화 창을 트리거하는 방법을 제공합니다.
- `settingHaptics()`: Haptics API는 터치나 진동을 통해 사용자에게 물리적 피드백을 제공합니다.
- `showToast()`: Storage API는 경량 데이터를 위한 간단한 키/값 영구 저장소를 제공합니다.
- `getNetworkStatus()`: 네트워크 API는 네트워크 및 연결 정보를 제공합니다.
- `settingSplash()`: 스플래시 화면 API는 스플래시 이미지를 표시하거나 숨기는 메소드를 제공합니다.
- `settingStatusBar()`: StatusBar API 표시 또는 숨기기와 함께 상태 표시줄의 스타일을 구성하는 메서드를 제공합니다.
- `settingPushNotification()`: 푸시 알림 API는 기본 푸시 알림에 대한 액세스를 제공합니다.

## Config
Fix "capacitor.config.json"
<docgen-index>

```json
"server": {
    	"url": "url",
    	"cleartext": true
  	}
```


## Android 
안드로이드 에뮬레이터 실행시 이슈 
1. 안드로이드 에뮬레이터 host 파일 접근하기 위해서는 쓰기모드로 실행해야 함.
2. npx cap run android 으로 실행시에는 쓰기모드 실행불가하여 호스트 파일접근 안됨
3. 그래서 개발서버 접근시 ip로 접근할 수 있도록 서버쪽 개발진행 해야 함.  

</docgen-index>