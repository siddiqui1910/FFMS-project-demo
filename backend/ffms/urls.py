from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # DRF's built-in login for the browsable API
    path('api-auth/', include('rest_framework.urls')),
]