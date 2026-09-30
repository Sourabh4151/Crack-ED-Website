"""Let microsites on other domains read the public brochure URL. Admin routes stay locked down."""
import re

_PUBLIC_BROCHURE = re.compile(
    r'^/api/brochures/(?!admin(?:/|$))[a-z0-9-]+/(?:file/)?$'
)


def allow_public_brochure_cors(sender, request, **kwargs):
    if request.method not in ('GET', 'HEAD', 'OPTIONS'):
        return False
    return bool(_PUBLIC_BROCHURE.match(request.path or ''))
