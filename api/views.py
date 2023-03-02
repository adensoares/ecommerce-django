from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render


from .models import Product, Category, Order, OrderItem
from .serializers import ProductSerializer, CategorySerializer, OrderSerializer, OrderItemSerializer


def index(request):
    return render(request, "build/index.html")

# Product
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Category
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Order
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()    
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()    
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

