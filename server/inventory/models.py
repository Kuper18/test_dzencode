from typing import ClassVar

from django.db import models
from django.db.models import UniqueConstraint


class ProductPrice(models.Model):
    class Currency(models.TextChoices):
        USD = "USD", "USD"
        UAH = "UAH", "UAH"

    product = models.ForeignKey(
        "Product",
        on_delete=models.CASCADE,
        related_name="prices",
    )
    value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )
    currency = models.CharField(
        max_length=3,
        choices=Currency,
    )
    is_default = models.BooleanField(default=False)

    class Meta:
        constraints = (
            UniqueConstraint(
                fields=["product", "currency"],
                name="unique_product_currency",
            )
        )

    def __str__(self):
        return f"{self.value} {self.currency}"


class Order(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=255)
    serial_number = models.PositiveIntegerField()
    is_new = models.BooleanField(default=True)
    type = models.CharField(max_length=100)
    specification = models.TextField(blank=True)

    guarantee_start = models.DateField()
    guarantee_end = models.DateField()

    order = models.ForeignKey(
        "Order",
        on_delete=models.CASCADE,
        related_name="products",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} {self.type}"
