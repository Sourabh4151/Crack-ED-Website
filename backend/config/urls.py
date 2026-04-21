"""
URL configuration for CRACK-ED backend.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

def favicon(request):
    """Avoid 404 for /favicon.ico (browsers request it automatically)."""
    return HttpResponse(status=204)

urlpatterns = [
    path('favicon.ico', favicon),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
