"""
API URL routes.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'examples', views.ExampleViewSet, basename='example')

urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.health),
    path('jobs/', views.job_list),
    path('jobs/<int:pk>/', views.job_detail),
    path('bid-episode-featured/', views.bid_featured_episode),
    path('quiz/submit/', views.quiz_submit),
    path('submit-lead/', views.submit_lead),
    path('job-apply/', views.job_apply),
]
