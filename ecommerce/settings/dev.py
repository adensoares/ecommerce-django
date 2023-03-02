from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '_2dcag=&d9vi^@_b-$*5!k4)j8abmlvp8cc*=7-)1=os00svh_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# STATICFILES_DIRS = [BASE_DIR / 'static']
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend', "build", "static"),  # update the STATICFILES_DIRS
)


STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files
MEDIA_URL = 'uploads/'

MEDIA_ROOT = BASE_DIR / 'uploads/'