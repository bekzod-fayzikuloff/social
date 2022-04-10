"""social URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title=settings.DOCS_TITLE,
        default_version=settings.DOCS_TITLE,
        description=settings.DOCS_DESCRIPTION,
        terms_of_service=settings.DOCS_TERMS_OF_SERVICE,
        contact=openapi.Contact(email=settings.DOCS_CONTACT),
        license=openapi.License(name=settings.DOCS_LICENSE),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

api_routes = [
    path("", include("apps.auth.urls")),
]

docs_patterns = [
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    re_path(r"^swagger/$", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    re_path(r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

urlpatterns = [
    path("", include(docs_patterns)),
    path("api/", include(api_routes)),
    path("admin/", admin.site.urls),
]
