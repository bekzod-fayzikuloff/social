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
    permission_classes=(permissions.AllowAny,),
)
