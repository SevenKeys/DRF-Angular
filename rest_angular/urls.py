from django.conf.urls import patterns, include, url
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from user_post.views import PostViewSet, AccountPostsViewSet
from .views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
accounts_router = routers.NestedSimpleRouter(
	router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(accounts_router.urls)),
    url(r'^api/login/', LoginView.as_view(), name='login'),
    url(r'^api/logout/', LogoutView.as_view(), name='logout'),
    url(r'^.*$', IndexView.as_view(), name='index'),
)