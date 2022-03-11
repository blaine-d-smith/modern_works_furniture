from django.contrib import admin
from .models import *


class OrderAdmin(admin.ModelAdmin):
    list_display = ('_id', 'dateCreated', 'isPaid')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'countInStock', 'numReviews')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('_id', 'product', 'user')

# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
