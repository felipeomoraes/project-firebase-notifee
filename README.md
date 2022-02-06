LINKS:

https://notifee.app/react-native/docs/installation
https://notifee.app/react-native/docs/displaying-a-notification
https://www.youtube.com/watch?v=FfJ1j-uCnd4
https://rnfirebase.io/

---------------------------

CRIAÇÃO DO PROJETO:

expo init project-firebase-notifee
cd project-firebase-notifee/
expo start
yarn android

---------------------------

INSTALAÇÃO E CONFIGURAÇÃO DO NOTIFEE:

yarn add @notifee/react-native

-Alterar versão do SDK para 31 em android/build.gradle:

	compileSdkVersion = 31
	targetSdkVersion = 31
	
-Adicionar linhas abaixo em android/build.gradle:

	// ADD THIS BLOCK - this is how Notifee finds it's Android library:
	maven {
	    url "$rootDir/../node_modules/@notifee/react-native/android/libs"
	}

yarn android
expo start

-------------------------------------

INSTALAÇÃO E CONFIGURAÇÃO DO FIREBASE:

git checkout -b fm_001

yarn add @react-native-firebase/app

-Adicionado arquivo /android/app/google-services.json
-Adicionado linha abaixo em /android/build.gradle:
	buildscript {
	  dependencies {
	    // ... other dependencies
	    classpath 'com.google.gms:google-services:4.3.10'
	    // Add me --- /\
	  }
	}

-Adicionado linha abaixo em /android/app/build.gradle:
	apply plugin: 'com.google.gms.google-services' // <- Add this line


yarn android

---------------------------------

INSTALAÇÃO DO FIREBASE MESSAGING:

yarn add @react-native-firebase/messaging

yarn android