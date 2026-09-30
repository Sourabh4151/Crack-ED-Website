from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'API'

    def ready(self):
        from corsheaders.signals import check_request_enabled

        from .brochure_cors import allow_public_brochure_cors

        check_request_enabled.connect(
            allow_public_brochure_cors,
            dispatch_uid='api.allow_public_brochure_cors',
        )
