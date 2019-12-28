import axios from './axios'
import vues from '@/main.js'
let instance = axios()


export default {
  get(url, params, headers, response,syn) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.get(url, options).then(
      (result) => {
        if (result.code == 200) {
          response && response(result);
        } else if (result.code == 401) {
         
          vues.$message({
            type: 'info',
            message: result.message
          });
          
          vues.$router.push("/login");
          return
        }else if(result.code == 500) {
          vues.$message({
            type: 'info',
            message:result.codeDesc
          });
          
        }  else {
         
          vues.$message({
            type: 'info',
            message: result.message
          });
          return
        }

      }

    )
  },
  post(url, params, headers, data, response) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.post(url, data, options).then(
      (result) => {
        if (result.code == 200) {
          response && response(result);
        } else if (result.code == 406) {
          // vues.$message({
          //   type: 'info',
          //   message: result.message
          // });
          response && response(result);
        } else if (result.code == 401) {
          vues.$message({
            type: 'info',
            message: result.message
          });
          
          vues.$router.push("/login");
        }else if(result.code == 500) {
          vues.$message({
            type: 'info',
            message:result.codeDesc
          });
          
        }  else {
          vues.$message({
            type: 'info',
            message: result.message
          });
          
        }

      }

    )
  },
  put(url, params, headers) {
    let options = {}

    if (headers) {
      options.headers = headers
    }
    return instance.put(url, params, options)
  },
  delete(url, params, headers) {
    let options = {}

    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.delete(url, options)
  }
}
