
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from manager.views import *
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
	path('showadmin/',admin.site.urls),
	#path('auth/', include('Accounts.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
     url('showPost/',PostsView.as_view(),name="postview"),
     url('showComments/',CommentView.as_view(),name="comment"),
    # url(r'^rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    # path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    url('details/',DetailView.as_view(),name="hello"),
    # url('setPref/', SetPrefView.as_view(),name="Pref"),
    # url('getSwipe/',GetSwipe.as_view(),name="swipe"),
    # url('sendSwipe/', SwipeView.as_view(), name="SwipeView"),
    # url('getFeed/',NewsPost.as_view(),name='news'),
    # url('mySchedule/',ScheduleView.as_view(),name='sv')
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)