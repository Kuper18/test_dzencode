from django.db import models
from django.db.models import UniqueConstraint
from rest_framework.exceptions import ValidationError


class Price(models.Model):
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
            ),
        )

    def __str__(self):
        return f"{self.value} {self.currency}"


class Order(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

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

    @staticmethod
    def validate_guarantee_dates(
        guarantee_start,
        guarantee_end,
        error_to_raise,
    ):
        if guarantee_end < guarantee_start:
            raise error_to_raise(
                "Guarantee end date cannot be earlier than start date."
            )

    def clean(self):
        self.validate_guarantee_dates(
            self.guarantee_start,
            self.guarantee_end,
            ValidationError,
        )

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} {self.type}"
