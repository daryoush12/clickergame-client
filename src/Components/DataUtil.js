export const ConverseToArray = conversable => {
  if (conversable != null) {
    var arr = [];
    for (let [key, value] of Object.entries(conversable)) {
      arr.push(value);
    }
    return arr;
  } else {
    return [];
  }
};
