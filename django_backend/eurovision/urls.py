from django.urls import path

from eurovision import views
from eurovision.views import HostCityViewForAutocomplete, VenueViewForAutocomplete, ArtistViewForAutocomplete, \
    CountryViewForAutocomplete, EditionViewForAutocomplete

urlpatterns = [
    path('country/', views.CountryList.as_view()),
    path('country/<int:pk>/', views.CountryDetail.as_view()),
    path('country/autocomplete/', CountryViewForAutocomplete.as_view()),
    path('filter/', views.CountryFilter.as_view()),
    path('hostcity/', views.HostCityList.as_view()),
    path('hostcity/<int:pk>/', views.HostCityDetail.as_view()),
    path('hostcity/autocomplete/', HostCityViewForAutocomplete.as_view()),
    path('venue/', views.VenueList.as_view()),
    path('venue/<int:pk>/', views.VenueDetail.as_view()),
    # path('venue/autocomplete/', VenueViewForAutocomplete.as_view()),
    path('edition/', views.EditionList.as_view()),
    path('edition/<int:pk>/', views.EditionDetail.as_view()),
    path('edition/autocomplete/', EditionViewForAutocomplete.as_view()),
    # path('edition/<int:pk>/ids/',views.EditionIdsList.as_view()),
    # path('edition/<int:pk>/ids/<int:id>',views.EditionIdsDetails.as_view()),
    path('artist/', views.ArtistList.as_view()),
    path('artist/<int:pk>/', views.ArtistDetail.as_view()),
    path('artist/autocomplete/', ArtistViewForAutocomplete.as_view()),
    path('song/', views.SongList.as_view()),
    path('song/<int:pk>/', views.SongDetail.as_view()),
    path('ids/', views.IdsList.as_view()),
    path('ids/<int:pk>/', views.IdsDetailsList.as_view()),
    path('idss/<int:pk>/', views.IdssDetailsList.as_view()),
    path('idss/', views.IdsDetailsList.as_view()),
    path('edition/by-avg-qf/', views.EditionByCountryQF.as_view()),
    path('edition/by-country-nr/', views.EditionByCountryNR.as_view()),
    path('filter-hostcity-by-qf/', views.HostCityFilter.as_view()),
]
