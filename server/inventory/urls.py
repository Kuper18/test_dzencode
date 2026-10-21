from django.urls import include, path
from rest_framework import routers

from inventory.views import OrderViewSet, ProductViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("orders", OrderViewSet)

urlpatterns = (path("", include(router.urls)),)

app_name = "inventory"
