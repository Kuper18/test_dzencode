from django.db import transaction
from rest_framework import serializers

from inventory.models import Order, Price, Product


class PriceListSerializer(serializers.ListSerializer):
    def validate(self, data):
        currencies = {price["currency"] for price in data}
        required_currencies = {"UAH", "USD"}

        if currencies != required_currencies:
            raise serializers.ValidationError(
                "Prices must contain both UAH and USD currencies."
            )

        default_prices = sum(price["is_default"] for price in data)

        if default_prices != 1:
            raise serializers.ValidationError(
                "Exactly one price must be set as default."
            )

        return super().validate(data)


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = (
            "id",
            "value",
            "currency",
            "is_default",
        )
        read_only_fields = ("id",)
        list_serializer_class = PriceListSerializer


class ProductSerializer(serializers.ModelSerializer):
    prices = PriceSerializer(many=True, read_only=False, allow_empty=False)

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "serial_number",
            "is_new",
            "type",
            "specification",
            "guarantee_start",
            "guarantee_end",
            "order",
            "prices",
            "created_at",
        )
        read_only_fields = (
            "id",
            "created_at",
        )

    @transaction.atomic
    def create(self, validated_data):
        prices = validated_data.pop("prices")
        product = Product.objects.create(**validated_data)

        for price in prices:
            Price.objects.create(product=product, **price)

        return product

    def validate(self, attrs):
        data = super().validate(attrs)

        Product.validate_guarantee_dates(
            attrs["guarantee_start"],
            attrs["guarantee_end"],
            serializers.ValidationError,
        )

        return data


class OrderSerializer(serializers.ModelSerializer):
    total_products = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "title",
            "description",
            "total_products",
            "created_at",
        )
        read_only_fields = ("id", "created_at")
