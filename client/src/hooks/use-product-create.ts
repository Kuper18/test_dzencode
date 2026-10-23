import useAppMutation from './use-app-mutation';
import type { UseFormSetError } from 'react-hook-form';
import queryClient from '../lib/react-query';
import QUERY_KEYS from '../constants/query-keys';
import type { ProductPayload } from '../types';
import ProductApi from '../api/product';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { ProductFormValues } from '../schemas/product';
import { setOpenProductForm } from '../features/inventory/slice';

type CreateProductVariables = {
  payload: ProductPayload;
  image?: File;
};

const useProductCreate = (setError: UseFormSetError<ProductFormValues>) => {
  const { selectedOrderId } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();

  return useAppMutation({
    mutationFn: async ({ payload, image }: CreateProductVariables) => {
      const product = await ProductApi.createProduct(payload);

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        await ProductApi.uploadImage(product.id, formData);
      }

      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderDetail, selectedOrderId],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.productList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.orderList],
      });
      dispatch(setOpenProductForm(false))
    },
    onError: () => {
      setError('root.server', {
        type: 'server',
        message: 'Failed to create product or upload its image.',
      });
    },
  });
};

export default useProductCreate;
