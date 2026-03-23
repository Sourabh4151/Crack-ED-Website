"""
API URL routes.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'examples', views.ExampleViewSet, basename='example')
router.register(r'blogs/admin', views.MarketingBlogAdminViewSet, basename='marketing-blog-admin')

urlpatterns = [
    path('blogs/auth/csrf/', views.blog_admin_csrf),
    path('blogs/auth/login/', views.blog_admin_login),
    path('blogs/auth/logout/', views.blog_admin_logout),
    path('blogs/auth/session/', views.blog_admin_session),
    path('blogs/', views.blog_published_list),
    path('blogs/featured/', views.blog_featured),
    path('blogs/detail/<str:lookup>/', views.blog_public_detail),
    path('blogs/upload/', views.blog_upload_image),
    path('', include(router.urls)),
    path('health/', views.health),
    path('jobs/', views.job_list),
    path('jobs/<int:pk>/', views.job_detail),
    path('bid-episode-featured/', views.bid_featured_episode),
    path('quiz/submit/', views.quiz_submit),
    path('submit-lead/', views.submit_lead),
    path('job-apply/', views.job_apply),
]
