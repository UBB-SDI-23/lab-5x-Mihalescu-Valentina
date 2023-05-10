from django.db import models

# Create your models here.
from django.db import models
from datetime import *
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

# Create your models here.


def validate_country_name(value):
    if any(char.isdigit() for char in value):
        raise ValidationError(
            _("%(value)s has to contain only letters"),
            params={"value": value},
        )

def validate_country_capital(value):
    if any(char.isdigit() for char in value):
        raise ValidationError(
            _("%(value)s has to contain only letters"),
            params={"value": value},
        )
class Country(models.Model):
    country_name = models.CharField(max_length=150,validators=[validate_country_name],db_index=True)
    year_of_entrance = models.IntegerField()
    country_capital = models.CharField(max_length=150,validators=[validate_country_capital])
    country_hymn = models.CharField(max_length=150)
    quality_factor = models.IntegerField(db_index=True)
    editions = models.ManyToManyField('Edition', through='Ids')

    def __str__(self):
        return self.country_name



def validate_population_inferior(value):
    if value < 1000:
        raise ValidationError(
            _("%(value)s is not over 1000"),
            params={"value": value},
        )



def validate_population_superior(value):
    if value > 5000000:
        raise ValidationError(
            _("%(value)s is over 5000000"),
            params={"value": value},
        )

class HostCity(models.Model):
    host_city_name = models.CharField(max_length=150,db_index=True)
    host_city_population = models.IntegerField(validators=[validate_population_inferior,validate_population_superior])
    host_city_mayor = models.CharField(max_length=150)
    is_capital = models.BooleanField()
    quality_factor = models.IntegerField()

    def __str__(self):
        return self.host_city_name

def validate_capacity(value):
    if value > 1000:
        raise ValidationError(
            _("%(value)s is over 1000"),
            params={"value": value},
        )

def validate_venue_name(value):
    if "Venue" not in value:
        raise ValidationError(
            _("%(value)s has to start with Venue"),
            params={"value": value},
        )

def validate_venue_adress(value):
    if "Adress" not in value:
        raise ValidationError(
            _("%(value)s has to start with Adress"),
            params={"value": value},
        )
class Venue(models.Model):
    venue_name = models.CharField(max_length=150,validators=[validate_venue_name],db_index=True)
    venue_adress = models.CharField(max_length=200,validators=[validate_venue_adress])
    host_city_id = models.ForeignKey(HostCity, related_name='venues', on_delete=models.CASCADE)
    capacity = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return self.venue_name


class Edition(models.Model):
    edition_year = models.IntegerField(db_index=True)
    final_date = models.DateField()
    motto = models.CharField(max_length=200)
    venue_id = models.ForeignKey(Venue, related_name='editions', on_delete=models.CASCADE)
    # winner_id = models.ForeignKey(Country, related_name='editions',on_delete=models.CASCADE)
    countries = models.ManyToManyField(Country, through='Ids')

def validate_artist_age(value):
    if value<=0:
        raise ValidationError(
            _("%(value)s has to be a positive value"),
            params={"value": value},
        )



class Artist(models.Model):
    artist_name = models.CharField(max_length=200,db_index=True)
    artist_age = models.IntegerField(default=0,validators=[validate_artist_age])
    description = models.CharField(max_length=10000, default='')
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='artists')

def validate_song_album(value):
    if "Album" not in value:
        raise ValidationError(
            _("%(value)s has to start with Album"),
            params={"value": value},
        )
class Song(models.Model):
    song_name = models.CharField(max_length=200)
    artist_id = models.ForeignKey(Artist, related_name='songs', on_delete=models.CASCADE)
    release_date = models.CharField(max_length=200, default='')
    album_name = models.CharField(max_length=150, default='',validators=[validate_song_album])


class Ids(models.Model):
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, db_index=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    place = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.country.country_name}- {self.edition.edition_year}"
