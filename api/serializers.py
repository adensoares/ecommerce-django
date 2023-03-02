from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Product, Category, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id', 
            'category',
            'name', 
            'slug',
            'description',
            'price',
            'get_absolute_url', 
            'get_image', 
            'get_thumbnail',
            )


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            'id', 
            'name', 
            'slug',
            'get_absolute_url', 
            'products'
            )


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 
            'user', 
            'created_at', 
            'items'
            )
