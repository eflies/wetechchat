const StorageService = {
    get: key =>
      new Promise((resolve, reject) => {
        const localValue = localStorage.getItem(key);
        const sessionValue = sessionStorage.getItem(key);
        try {
          if (localValue) {
            resolve(JSON.parse(localValue));
          } else if (sessionValue) {
            resolve(JSON.parse(sessionValue));
          }
        } catch (e) {
          console.error(e);
        }
        resolve();
      }),
  
    set: ({ key, value, remember }) =>
      new Promise((resolve, reject) => {
        remember
          ? localStorage.setItem(key, JSON.stringify(value))
          : sessionStorage.setItem(key, JSON.stringify(value));
        resolve();
      }),
    remove: key =>
      new Promise(resolve => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
        resolve();
      }),
  };
  
  export default StorageService;