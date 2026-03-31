from django.urls import path
from . import views

urlpatterns = [
    path('analyze/',            views.analyze_view,         name='analyze'),
    path('analyses/',           views.analyses_list_view,   name='analyses-list'),
    path('analyses/<int:pk>/',  views.analysis_detail_view, name='analysis-detail'),
    path('rewrite/',            views.rewrite_view,         name='rewrite'),
    path('dashboard/',          views.dashboard_view,       name='dashboard'),
]