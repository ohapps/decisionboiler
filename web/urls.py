from django.conf.urls import patterns, url

from web import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    (r'^login$', 'django.contrib.auth.views.login', {'template_name': 'web/login.html'}),
    (r'^logout$', 'django.contrib.auth.views.logout_then_login'),
)