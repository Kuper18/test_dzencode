import axiosInstance from "../lib/axios-instance";

class OrderApi {
  private static readonly orderListUrl = '/inventory/orders/';

  static async getOrders() {
    const response = await axiosInstance.get(this.orderListUrl);
    return response.data;
  }
}

export default OrderApi;
