from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """
    Creates a new Product model.
    """
    name = models.CharField(max_length=150, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2,
                                null=True, blank=True)
    image = models.ImageField(upload_to='products/', blank=True,
                              default='/placeholder.jpg')
    brand = models.CharField(max_length=100, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2,
                                 null=True, blank=True)
    numReviews = models.IntegerField(blank=True, null=True, default=0)
    countInStock = models.IntegerField(blank=True, null=True, default=0)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    """
    Creates a new Review model.
    """
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(blank=True, null=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    """
    Creates a new Order model.
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=150, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,
                                        null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2,
                                   null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2,
                                     null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    datePaid = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    dateDelivered = models.DateTimeField(auto_now_add=False,
                                         null=True, blank=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.dateCreated)


class OrderItem(models.Model):
    """
    Creates a new OrderItem model.
    """
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    qty = models.IntegerField(blank=True, null=True,
                              default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,
                                null=True, blank=True)
    image = models.CharField(max_length=250, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    """
    Creates a new ShippingAddress model.
    """
    order = models.OneToOneField(Order, on_delete=models.CASCADE,
                                 null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    zipCode = models.CharField(max_length=50, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,
                                        null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
