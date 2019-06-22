/**
 * 本文件将一些常用的wx异步API封装成promise形式
 */

export default {
  FileSystemManager: {
    /**options不需要传success和fail回调，使用promise的resolve和reject即可 */
    readFile: function (options) {
      return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
          ...options,
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          }
        })
      })
    },
  },
  cloud: {
    uploadFile: function (options) {
      return new Promise((resolve, reject) => {
        wx.cloud.uploadFile({
          ...options,
          success: res => {
            resolve(res)
          },
          fail: err => {
            reject(err)
          }
        })
      })
    }
  }  
}