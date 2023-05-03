from rest_framework import serializers
from .models import Country, HostCity, Venue, Edition, Song, Artist, Ids


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'country_name', 'year_of_entrance', 'country_capital', 'quality_factor')


class HostCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = HostCity
        fields = ('__all__')


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ('id', 'venue_name', 'venue_adress', 'capacity', 'rating', 'host_city_id','nb_editions')


class EditionSerializer(serializers.ModelSerializer):
    country_nr = serializers.IntegerField(read_only=True)

    class Meta:
        model = Edition
        fields = ('id', 'edition_year', 'final_date', 'motto', 'venue_id', 'country_nr')


class EditionSerializerAVG(serializers.ModelSerializer):
    avg_qf = serializers.IntegerField(read_only=True)

    class Meta:
        model = Edition
        fields = ('id', 'edition_year', 'final_date', 'motto', 'venue_id', 'avg_qf')


class EditionDetailsSerializer(serializers.ModelSerializer):
    venue_id = VenueSerializer(read_only=True)
    countries = CountrySerializer(read_only=True, many=True)

    class Meta:
        model = Edition
        fields = ('id', 'edition_year', 'final_date', 'motto', 'venue_id', 'countries')


class VenueDetailsSerializer(serializers.ModelSerializer):
    host_city_id = HostCitySerializer(read_only=True)
    editions = EditionSerializer(read_only=True, many=True)

    class Meta:
        model = Venue
        fields = ('id', 'venue_name', 'venue_adress', 'host_city_id', 'capacity', 'rating', 'editions')


class HostCityDetailsSerializer(serializers.ModelSerializer):
    venues = VenueSerializer(read_only=True, many=True)

    def validate_hostcity_population(self, hostcity_population):
        if hostcity_population is not None:
            if hostcity_population<1000:
                raise serializers.ValidationError("HostCity Population should be greater than 1000 ")
        return hostcity_population

    class Meta:
        model = HostCity
        fields = (
            'id', 'host_city_name', 'host_city_population', 'host_city_mayor', 'is_capital', 'quality_factor', 'venues')


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'artist_name', 'artist_age', 'description', 'country')


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'song_name', 'artist_id', 'release_date', 'album_name')


class SongDetailsSerializer(serializers.ModelSerializer):
    artist_id = ArtistSerializer(read_only=True)


    class Meta:
        model = Song
        fields = ('id', 'song_name', 'artist_id', 'release_date', 'album_name')


class ArtistDetailsSerializer(serializers.ModelSerializer):
    songs = SongSerializer(read_only=True, many=True)
    country = CountrySerializer(read_only=True)

    class Meta:
        model = Artist
        fields = ('id', 'artist_name', 'artist_age', 'description', 'songs', 'country')


class IdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ids
        fields = ('id', 'edition', 'country', 'place', 'points')

class IdsDetailsSerializer(serializers.ModelSerializer):
    edition = EditionSerializer(read_only=True)
    country = CountrySerializer(read_only=True)

    class Meta:
        model = Ids
        fields = ('id', 'edition', 'country', 'place', 'points')





class CountryDetailsSerializer(serializers.ModelSerializer):
    editions = EditionSerializer(read_only=True, many=True)
    artists = ArtistSerializer(read_only=True, many=True)

    class Meta:
        model = Country
        fields = (
            'id', 'country_name', 'year_of_entrance', 'country_capital', 'quality_factor', 'artists', 'editions')
