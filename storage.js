export class AppStorage {
  /**
   * Save products in the local storage
   * @param {*} data
   */
  saveItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Retrieve all products from local storage
   */
  getAllItems(key) {
    // TODO: make sure to parse retrieved data to Javacript object(JSON.parse) since they come as string
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Update an item from the data that are stored in localstorage
   * @param {*} id
   */
  updateItem(current) {
    // 1. use GetAllItems function to get all data
    const products = this.getAllItems("products");
    // 2. Loop through the list and find the related item
    let currentProduct = products.find((p) => p.id === current.id);
    currentProduct = current;
    // 3. Use functional array method to update the list(https://stackoverflow.com/questions/42053178/update-array-of-object-without-mutation)
    const index = products.findIndex((p) => p.id === currentProduct.id);
    const updatedProducts = [
      ...products.slice(0, index),
      currentProduct,
      ...products.slice(index + 1),
    ];
    console.log(updatedProducts);
    // 4. Use saveItem function to save the updated list in the local storage
    this.saveItem("products", updatedProducts);
    console.log("Saved!");
  }
}
