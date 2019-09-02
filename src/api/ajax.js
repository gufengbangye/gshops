import axios from 'axios'

export default{
  ajax (url = '', data = {}, type = 'get') {
    return new Promise(function (resolve, reject) {
      let promise
      if (type === 'get') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
        }
        promise = axios(url)
      } else {
        promise = axios.post(url, data)
      }
      promise.then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        reject(error)
      })
    })
  }
}
