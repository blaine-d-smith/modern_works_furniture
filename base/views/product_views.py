import os
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Product, Review
from base.serializers import ProductSerializer
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View


@api_view(['GET'])
def getProducts(request):
    """
    Retrieves all products
    """
    # Retrieves products associated with a specific keyword
    query = request.query_params.get('keyword')
    # If query is empty, returns empty string
    if query is None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    # Gets current page number
    page = request.query_params.get('page')
    paginator = Paginator(products, 9)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    # Returns page 1 if no page number present
    if page is None:
        page = 1

    # Ensures page number is int
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data,
                    'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    """
    Retrieves a single product
    """
    product = Product.objects.get(_id=pk)

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    """
    Retrieves products with a rating of 4-stars and higher
    """
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductsByCategory(request):
    """
    Retrieves products by category
    """
    query = request.query_params.get('category')
    products = Product.objects.filter(category=query)
    # products = Product.objects.filter(category='Sofas')

    serializer = ProductSerializer(products, many=True)
    
    return Response({'products': serializer.data})


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    """
    Creates a new product
    """
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample',
        price=0,
        brand='Sample',
        countInStock=0,
        category='Sample',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    """
    Updates a product
    """
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    """
    Deletes a product
    """
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    """
    Uploads a product image
    """
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')

    product.save()
    return Response('Image uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    """
    Creates a new review
    """
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # Check if review exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Check if rating present
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Create the review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            city=data['city'],
            state=data['state'],
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()
        return Response('Review Added')
