from django.urls import path
from . import views, htmx_views

urlpatterns = [
    path('list_products/', views.list_products, name="list_products")
]

htmx_urlpatterns = [
    path('check_products/', htmx_views.check_products, name="check_product"),
    path('save_product/', htmx_views.save_product, name="save_product"),
    path('delete_product/<int:id>',
         htmx_views.delete_product, name="delete_product")
]

urlpatterns += htmx_urlpatterns
