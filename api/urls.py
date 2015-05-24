from django.conf.urls import patterns, url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'decisions', views.DecisionViewSet)
router.register(r'criteriatype', views.CriteriaTypeViewSet)
router.register(r'criteria', views.CriteriaViewSet)
router.register(r'option', views.OptionViewSet)
router.register(r'optionscore', views.OptionScoreViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^decision-summary/(?P<id>[0-9]+)$', views.decision_summary),
    url(r'^update-decision-option', views.update_decision_option),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
)
