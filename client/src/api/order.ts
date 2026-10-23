import axiosInstance from '../lib/axios-instance';
import type {
  AxiosCustomConfig,
  CreateOrderPayload,
  Order,
  OrderDetail,
} from '../types';

class OrderApi {
  private static readonly orderListUrl = '/inventory/orders/';

  static async getOrders(config?: AxiosCustomConfig): Promise<Order[]> {
    const response = await axiosInstance.get(this.orderListUrl, config);
    return response.data;
  }

  static async getOrderById(
    id: number | null,
    config?: AxiosCustomConfig
  ): Promise<OrderDetail> {
    if (!id) throw new Error('Id is not provided');

    const response = await axiosInstance.get(
      `${this.orderListUrl}${id}/`,
      config
    );
    return response.data;
  }

  static async createOrder(
    payload: CreateOrderPayload,
    config?: AxiosCustomConfig
  ): Promise<Order> {
    const response = await axiosInstance.post(
      this.orderListUrl,
      payload,
      config
    );
    return response.data;
  }

  static async deleteOrder(
    id: number,
    config?: AxiosCustomConfig
  ): Promise<void> {
    await axiosInstance.delete(`${this.orderListUrl}${id}/`, config);
  }
}

export default OrderApi;
