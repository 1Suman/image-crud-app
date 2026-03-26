from django.urls import path
from . import views

urlpatterns = [
    path('images/', views.image_list, name='image-list'),
    path('images/create/', views.image_create, name='image-create'),
    path('images/<int:pk>/', views.image_detail, name='image-detail'),
    path('images/<int:pk>/update/', views.image_update, name='image-update'),
    path('images/<int:pk>/delete/', views.image_delete, name='image-delete'),
]