from django.db.models import Count
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from inventory.models import Order, Product
from inventory.serializers import (
    OrderDetailSerializer,
    OrderSerializer,
    ProductImageSerializer,
    ProductSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(
        detail=True,
        methods=["POST"],
        url_path="upload-image",
        permission_classes=(IsAuthenticated,),
    )
    def upload_image(self, request: Request, pk=None):
        product = self.get_object()
        serializer = self.get_serializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if self.action == "upload_image":
            return ProductImageSerializer

        return ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action != "upload_image":
            queryset = queryset.prefetch_related("prices")

        product_type = self.request.query_params.get("product-type")
        if product_type:
            queryset = queryset.filter(type__icontains=product_type)

        return queryset


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()

    def get_serializer_class(self):
        serializer = OrderSerializer

        if self.action == "retrieve":
            serializer = OrderDetailSerializer

        return serializer

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action in ("list", "retrieve"):
            queryset = queryset.annotate(
                total_products=Count("products")
            ).prefetch_related("products__prices")

        return queryset
