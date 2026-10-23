import axiosInstance from '../lib/axios-instance';
import type {
  AxiosCustomConfig,
  Product,
  ProductPayload,
  UploadImageResponse,
} from '../types';

class ProductApi {
  private static productListUrl = '/inventory/products/';

  static async getProducts(config?: AxiosCustomConfig): Promise<Product[]> {
    const response = await axiosInstance.get(this.productListUrl, config);
    return response.data;
  }

  static async createProduct(
    payload: ProductPayload,
    config?: AxiosCustomConfig
  ): Promise<Product> {
    const response = await axiosInstance.post(
      this.productListUrl,
      payload,
      config
    );
    return response.data;
  }

  static async uploadImage(
    productId: number,
    data: FormData,
    config?: AxiosCustomConfig
  ): Promise<UploadImageResponse> {
    const response = await axiosInstance.post(
      `${this.productListUrl}${productId}/upload-image/`,
      data,
      config
    );
    return response.data;
  }

  static async deleteProduct(
    id: number,
    config?: AxiosCustomConfig
  ): Promise<void> {
    await axiosInstance.delete(`${this.productListUrl}${id}/`, config);
  }
}

export default ProductApi;
