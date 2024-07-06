from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Product


def check_products(request):
    product = request.GET.get('product')
    products = Product.objects.filter(name=product)
    print(f'product: {products}')
    # if products.exists():
    #     return HttpResponse('Product already exists')
    # return HttpResponse('Product available for registration')
    return render(request, 'partials/htmx/check_products.html',
                  {'products': products})


def save_product(request):
    name = request.POST.get('product')
    price = request.POST.get('price')

    product = Product(name=name, price=price)
    product.save()
    products = Product.objects.all()

    return render(request, 'partials/htmx/all_products.html',
                  {'products': products})


@csrf_exempt
@require_http_methods(['DELETE'])
def delete_product(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    products = Product.objects.all()

    return render(request, 'partials/htmx/all_products.html',
                  {'products': products})
