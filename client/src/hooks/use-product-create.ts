import { useQueryClient } from '@tanstack/react-query';
import type { UseFormSetError } from 'react-hook-form';
import ProductApi from '../api/product';
import QUERY_KEYS from '../constants/query-keys';
import { setOpenProductForm } from '../features/inventory/slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { ProductFormValues } from '../schemas/product';
import type { ProductPayload } from '../types';
import useAppMutation from './use-app-mutation';

type CreateProductVariables = {
  payload: ProductPayload;
  image?: File;
};

const useProductCreate = (setError: UseFormSetError<ProductFormValues>) => {
  const { selectedOrderId } = useAppSelector((state) => state.inventory);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

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
      dispatch(setOpenProductForm(false));
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
