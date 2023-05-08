from django.db.models.functions import Coalesce
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, Http404
from django.db.models import Avg, Count, OuterRef, Subquery, Q, Case, When, \
    IntegerField, Exists
from drf_spectacular.utils import extend_schema
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination

from .models import Country, HostCity, Venue, Edition, Artist, Song, Ids
from .serializers import CountrySerializer, CountryDetailsSerializer, VenueSerializer, HostCitySerializer, \
    HostCityDetailsSerializer, VenueDetailsSerializer, EditionSerializer, EditionDetailsSerializer, ArtistSerializer, \
    ArtistDetailsSerializer, SongSerializer, SongDetailsSerializer, IdsSerializer, EditionSerializerAVG, \
    IdsDetailsSerializer
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView


class EntityPaginator(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    page_query_param = 'page'


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all().order_by('id')
    serializer_class = CountrySerializer
    pagination_class = EntityPaginator


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all().order_by('id')
    serializer_class = CountryDetailsSerializer


class CountryFilter(generics.ListCreateAPIView):
    serializer_class = CountrySerializer
    pagination_class = EntityPaginator

    def get_queryset(self):
        queryset = Country.objects.all().order_by('id')
        var = self.request.GET.get('var', 0)
        if var is not None:
            queryset = queryset.filter(quality_factor__gt=var)
        return queryset


#  http://127.0.0.1:8000/eurovision/filter/?var=400


class HostCityList(generics.ListCreateAPIView):
    queryset = HostCity.objects.all().order_by('id')
    serializer_class = HostCitySerializer
    pagination_class = EntityPaginator

    def get_queryset(self):
        hostcities = HostCity.objects.annotate(
            nb_venues=Coalesce(Subquery(
                Venue.objects.filter(host_city_id=OuterRef('pk')).values('host_city_id').annotate(count=Count('id')).values(
                    'count')
            ), 0)
        )
        return hostcities

    def get_serializer(self, args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        serializer = serializer_class(args, **kwargs)
        if self.request.method == "GET":
            serializer.child.fields['nb_venues'] = serializers.IntegerField()
        return serializer


class HostCityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = HostCity.objects.all().order_by('id')
    serializer_class = HostCityDetailsSerializer


class HostCityFilter(generics.ListCreateAPIView):
    serializer_class = HostCitySerializer
    pagination_class = EntityPaginator

    def get_queryset(self):
        queryset = HostCity.objects.all().order_by('id')
        var = self.request.GET.get('var', 0)
        if var is not None:
            queryset = queryset.filter(quality_factor__gt=var)
        return queryset


# http://127.0.0.1:8000/eurovision/filter-hostcity-by-qf/?var=600


class HostCityViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=HostCitySerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            hostcities = HostCity.objects.filter(Q(host_city_name__icontains=query))[:10]
        else:
            hostcities = HostCity.objects.all()[:10]

        serialized_hostcities = HostCitySerializer(hostcities, many=True)
        return Response(serialized_hostcities.data)


class VenueList(generics.ListCreateAPIView):
    queryset = Venue.objects.all().order_by('id')
    serializer_class = VenueSerializer
    pagination_class = EntityPaginator

    def get_queryset(self):
        editions = Venue.objects.annotate(
            nr_editions=Coalesce(Subquery(
                Edition.objects.filter(venue_id=OuterRef('pk')).values('venue_id').annotate(
                    count=Count('id')).values(
                    'count')
            ), 0)
        )
        return editions

    def get_serializer(self, args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault("context", self.get_serializer_context())
        serializer = serializer_class(args, **kwargs)
        if self.request.method == "GET":
            serializer.child.fields['nr_editions'] = serializers.IntegerField()
        return serializer

class VenueViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=VenueDetailsSerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            venues = Venue.objects.filter(Q(venue_name__icontains=query))[:10]
        else:
            venues = Venue.objects.all()[:10]

        serialized_venues = VenueDetailsSerializer(venues, many=True)
        return Response(serialized_venues.data)




class VenueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venue.objects.all().order_by('id')
    serializer_class = VenueDetailsSerializer



class EditionList(generics.ListCreateAPIView):
    queryset = Edition.objects.all().order_by('id')
    serializer_class = EditionSerializer
    pagination_class = EntityPaginator


class EditionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Edition.objects.all().order_by('id')
    serializer_class = EditionDetailsSerializer


class ArtistList(generics.ListCreateAPIView):
    queryset = Artist.objects.all().order_by('id')
    serializer_class = ArtistSerializer
    pagination_class = EntityPaginator


class ArtistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all().order_by('id')
    serializer_class = ArtistDetailsSerializer


class ArtistViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=ArtistSerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            venues = Artist.objects.filter(Q(artist_name__icontains=query))[:10]
        else:
            venues = Artist.objects.all()[:10]

        serialized_artists = ArtistSerializer(venues, many=True)
        return Response(serialized_artists.data)


class SongList(generics.ListCreateAPIView):
    queryset = Song.objects.all().order_by('id')
    serializer_class = SongSerializer
    pagination_class = EntityPaginator


class SongDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all().order_by('id')
    serializer_class = SongDetailsSerializer


class IdsList(generics.ListCreateAPIView):
    queryset = Ids.objects.all().order_by('id')
    serializer_class = IdsSerializer
    pagination_class = EntityPaginator


class IdsDetailsList(generics.ListCreateAPIView):
    queryset = Ids.objects.all().order_by('id')
    serializer_class = IdsDetailsSerializer


class IdssDetailsList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ids.objects.all().order_by('id')
    serializer_class = IdsDetailsSerializer


class CountryViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=CountrySerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            countries = Country.objects.filter(Q(country_name__icontains=query))[:10]
        else:
            countries = Country.objects.all()[:10]

        serialized_countries = CountrySerializer(countries, many=True)
        return Response(serialized_countries.data)


class EditionViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=EditionSerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            editions = Edition.objects.filter(Q(edition_year__icontains=query))[:10]
        else:
            editions = Edition.objects.all()[:10]

        serialized_editions = EditionSerializer(editions, many=True)
        return Response(serialized_editions.data)


class EditionByCountryQF(generics.ListAPIView):
    serializer_class = EditionSerializerAVG
    pagination_class = EntityPaginator

    def get_queryset(self):
        queryset = Edition.objects \
            .annotate(avg_qf=Avg('ids__country__quality_factor')) \
            .order_by('-avg_qf')
        return queryset


class EditionByCountryNR(generics.ListAPIView):
    serializer_class = EditionSerializer
    pagination_class = EntityPaginator

    def get_queryset(self):
        queryset = Edition.objects \
            .annotate(country_nr=Count('countries__id')) \
            .order_by('-country_nr')
        return queryset
