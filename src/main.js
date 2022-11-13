import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'flowbite'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping, faScannerGun, faSliders, faHouse, faForkKnife, faTrees, faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import { faTree as faTreeDuo } from '@fortawesome/pro-duotone-svg-icons'
import { faTree, faCoin } from '@fortawesome/pro-solid-svg-icons'

library.add(faCartShopping, faScannerGun, faSliders, faHouse, faForkKnife, faTrees, faTreeDuo, faSpinner, faTree, faCoin)

import './index.css'
import './assets/main.css'

createApp(App)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
