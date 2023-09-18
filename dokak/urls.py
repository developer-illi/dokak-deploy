"""
URL configuration for dokak project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from mainpg import views as main_v
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('',  main_v.first_page, name='fir_page'),
    path('test', main_v.test, name='test'),
    path('admin', main_v.admin, name='admin'),
    path('my_page', main_v.my_page, name='my_page'),
    path('login', main_v.login, name='login'),
    path('email_send', main_v.email_sends, name='email_send'),
    path('email_ck', main_v.email_ck, name='email_ck'),
    path('nick_ck', main_v.nick_ck, name='nick_ck'),
    path('sign_up', main_v.sign_up, name='sign_up'),
    path('myinfo_ch', main_v.myinfo_ch, name='myinfo_ch'),
    path('lecture_add', main_v.lecture_add, name='lecture_add'),
    path('preview_ck', main_v.preview_ck, name='preview_ck'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
