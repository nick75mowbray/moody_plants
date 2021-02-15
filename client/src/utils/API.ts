import axios from "axios";
import mongoose from 'mongoose';

export default {
  // Gets all Products
  getProducts: function() {
    return axios.get("/api/products");
  },
  // Gets the product with the given id
  getProduct: function(id:mongoose.ObjectId) {
    return axios.get(`/api/products/${id}`);
  },
  // updates the product, used for updating page views
  updateViews: function(id:mongoose.ObjectId, body:any) {
    return axios.put(`/api/products/${id}`, body);
    }
};
