import axios from "axios";

export default {
  // Gets all Products
  getProducts: function() {
    return axios.get("/api/products");
  },
  // Gets the product with the given id
  getProduct: function(id) {
    return axios.get(`/api/products/${id}`);
  },
  // updates the product, used for updating page views
  updateViews: function(id) {
    return axios.put(`/api/products/${id}`);
    }
};
