export class AppStorage {
  /**
   * Save products in the local storage
   * @param {*} data 
   */
  saveItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * Retrieve all products from local storage
   */
  getAllItems() {
    // TODO: make sure to parse retrieved data to Javacript object(JSON.parse) since they come as string
  }

  /**
   * Update an item from the data that are stored in localstorage
   * @param {*} id 
   */
  updateItem(id) {
    // 1. use GetAllItems function to get all data
    // 2. Loop through the list and find the related item
    // 3. Use functional array method to update the list(https://stackoverflow.com/questions/42053178/update-array-of-object-without-mutation)
    // 4. Use saveItem function to save the updated list in the local storage
  }
}

