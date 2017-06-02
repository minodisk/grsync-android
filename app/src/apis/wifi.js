import wifi from 'react-native-android-wifi'

// RICOH_64FD48

export function loadWifis() {
  return new Promise((resolve, reject) => {
    wifi.loadWifiList((list) => {
      const wifis = JSON.parse(list)
      const map = {}
      wifis.forEach((wifi) => {
        const w = map[wifi.SSID]
        if (w == null || wifi.level > w.level) {
          map[wifi.SSID] = wifi
          return
        }
      })
      const ws = []
      Object.keys(map).forEach((ssid) => ws.push(map[ssid]))
      resolve(ws)
    }, (err) => {
      reject(err)
    })
  })
}

export function currentWifi() {
  return new Promise((resolve, reject) => {
    wifi.isEnabled((enabled) => {
      if (!enabled) return reject(new Error(`Wi-Fi service is disabled`))
      wifi.getSSID(resolve)
    })
  })
}

export function connectWifi(ssid, password) {
  return new Promise((resolve, reject) => {
    wifi.findAndConnect(ssid, password, (found) => {
      if (!found) return reject(new Error(`${ssid} is not in range`))
      resolve()
    })
  })
}
