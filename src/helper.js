const localStorageService = {
  setItem: function(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: function(key) {
    let data = localStorage.getItem(key) || null;
    return JSON.parse(data);
  }
};

export { localStorageService };
