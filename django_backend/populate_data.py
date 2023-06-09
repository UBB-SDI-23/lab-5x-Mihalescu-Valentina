import datetime
import os
import uuid
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')

django.setup()

from faker import Faker
import random


fake = Faker()

NO_RECORDS = 1000000
NO_RECORDS_INTERMEDIARY = 10000000


#


# def drop_constraints_indexes():
#     file = open("drop_constraints_indexes.sql", "w")
#
#
#     file.write(
#         "ALTER TABLE eurovision_venue DROP CONSTRAINT IF EXISTS eurovision_venue_host_city_id_id_dc4c2aff_fk_eurovisio;\n")
#
#
#     file.write(
#         "ALTER TABLE eurovision_edition DROP CONSTRAINT IF EXISTS eurovision_edition_venue_id_id_8c70153c_fk_eurovision_venue_id;\n")
#
#
#
#     file.write(
#         "ALTER TABLE eurovision_artist DROP CONSTRAINT IF EXISTS eurovision_artist_country_id_47605989_fk_eurovision_country_id;\n")
#
#
#     file.write(
#         "ALTER TABLE eurovision_song DROP CONSTRAINT IF EXISTS eurovision_song_artist_id_id_865d0e06_fk_eurovision_artist_id;\n")
#
#
#     file.write(
#         "ALTER TABLE eurovision_ids DROP CONSTRAINT IF EXISTS eurovision_ids_country_id_c0d299f5_fk_eurovision_country_id;\n")
#
#     file.write(
#         "ALTER TABLE eurovision_ids DROP CONSTRAINT IF EXISTS FK_eurovision_ids_edition_id;\n")
#
#     file.close()

def drop_constraints_indexes():
    file = open("drop_constraints_indexes.sql", "w")

    file.write(
        "ALTER TABLE eurovision_venue DROP CONSTRAINT IF EXISTS eurovision_venue_host_city_id_id_dc4c2aff_fk_eurovisio;\n")
    file.write("DROP INDEX IF EXISTS IDX_HostCity_ID;\n")

    file.write(
        "ALTER TABLE eurovision_edition DROP CONSTRAINT IF EXISTS eurovision_edition_venue_id_id_8c70153c_fk_eurovision_venue_id;\n")

    file.write(
        "ALTER TABLE eurovision_artist DROP CONSTRAINT IF EXISTS eurovision_artist_country_id_47605989_fk_eurovision_country_id;\n")

    file.write(
        "ALTER TABLE eurovision_song DROP CONSTRAINT IF EXISTS eurovision_song_artist_id_id_865d0e06_fk_eurovision_artist_id;\n")

    file.write(
        "ALTER TABLE eurovision_ids DROP CONSTRAINT IF EXISTS eurovision_ids_country_id_c0d299f5_fk_eurovision_country_id;\n")

    file.write(
        "ALTER TABLE eurovision_ids DROP CONSTRAINT IF EXISTS eurovision_ids_edition_id_1d2c1e8a_fk_eurovision_edition_id;\n")
    file.write("DROP INDEX IF EXISTS IDX_Venue_ID;\n")
    file.write("DROP INDEX IF EXISTS IDX_Country_ID;\n")
    file.write("DROP INDEX IF EXISTS IDX_Artist_ID;\n")
    file.write("DROP INDEX IF EXISTS IDX_Country_IDD;\n")
    file.write("DROP INDEX IF EXISTS IDX_Edition_IDD;\n")



    file.close()


def add_constraints_indexes():
    file = open("add_constraints_indexes.sql", "w")


    file.write("ALTER TABLE eurovision_venue ADD CONSTRAINT eurovision_venue_host_city_id_id_dc4c2aff_fk_eurovisio FOREIGN key(host_city_id_id) references eurovision_hostcity(id) on delete cascade;\n")


    file.write(
        "ALTER TABLE eurovision_edition ADD CONSTRAINT eurovision_edition_venue_id_id_8c70153c_fk_eurovision_venue_id FOREIGN key(venue_id_id) references eurovision_venue(id) on delete cascade;\n")



    file.write(
        "ALTER TABLE eurovision_artist ADD CONSTRAINT  eurovision_artist_country_id_47605989_fk_eurovision_country_id FOREIGN key(country_id) references eurovision_country(id) on delete cascade;\n")



    file.write(
        "ALTER TABLE eurovision_song ADD CONSTRAINT  eurovision_song_artist_id_id_865d0e06_fk_eurovision_artist_id FOREIGN key(artist_id_id) references eurovision_artist(id) on delete cascade;\n")



    file.write(
        "ALTER TABLE eurovision_ids ADD CONSTRAINT  eurovision_ids_country_id_c0d299f5_fk_eurovision_country_id FOREIGN key(country_id) references eurovision_country(id) on delete cascade;\n")

    file.write(
        "ALTER TABLE eurovision_ids ADD CONSTRAINT eurovision_ids_edition_id_1d2c1e8a_fk_eurovision_edition_id  FOREIGN key(edition_id) references eurovision_edition(id) on delete cascade;\n")

    file.write("CREATE INDEX IDX_HostCity_ID ON eurovision_venue(host_city_id_id);\n")
    file.write("CREATE INDEX IDX_Venue_ID ON eurovision_edition(venue_id_id);\n")
    file.write("CREATE INDEX IDX_Country_ID ON eurovision_artist(country_id);\n")
    file.write("CREATE INDEX IDX_Artist_ID ON eurovision_song(artist_id_id);\n")
    file.write("CREATE INDEX IDX_Edition_IDD ON eurovision_ids(edition_id);\n")
    file.write("CREATE INDEX IDX_Country_IDD ON eurovision_ids(country_id);\n")

    file.close()


def hostcity_insert_data():
    file = open("hostcity_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_hostcity RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the hostcity table...")

    for i in range(NO_RECORDS):
        host_city_name = fake.city()[:50]
        host_city_population = random.randint(1000, 5000000)
        host_city_mayor = fake.text(max_nb_chars=50)
        is_capital = bool(random.getrandbits(1))
        quality_factor = random.randint(10, 10000)
        batch_values += f"('{host_city_name}', '{host_city_population}', '{host_city_mayor}', '{is_capital}', '{quality_factor}'),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO eurovision_hostcity (host_city_name, host_city_population, host_city_mayor, is_capital, quality_factor) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def venue_insert_data():
    file = open("venue_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_venue RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Venue table...")

    for i in range(NO_RECORDS):
        nr = random.randint(1, 50)
        venue_name = "Venue" + str(nr)
        venue_adress = "Adress" + str(nr)
        host_city_id_id = random.randint(1, NO_RECORDS)
        capacity = random.randint(1, 1000)
        rating = random.uniform(1.0, 5.0)

        batch_values += f"('{venue_name}', '{venue_adress}', {host_city_id_id},{capacity}, {rating}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO eurovision_venue (venue_name, venue_adress,host_city_id_id, capacity, rating) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def edition_insert_data():
    file = open("edition_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_edition RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Edition table...")

    for i in range(NO_RECORDS):
        edition_year = random.randint(1960, 2023)
        final_date = fake.date_between_dates(date_start = datetime.date(1980, 1, 1), date_end= datetime.date(2023, 1, 1))
        motto = fake.text(max_nb_chars=50)
        venue_id_id = random.randint(1, NO_RECORDS)

        batch_values += f"('{edition_year}', '{final_date}', '{motto}', {venue_id_id}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO eurovision_edition(edition_year, final_date, motto, venue_id_id) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def country_insert_data():
    file = open("country_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_country RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Country table...")

    for i in range(NO_RECORDS_INTERMEDIARY):
        country_name = fake.country()[:50]
        country_name = country_name.replace("'", "")
        year_of_entrance = random.randint(1960, 2023)
        country_capital = fake.city()[:50]
        nr = random.randint(1, 50)
        country_hymn = "Hymn" + str(nr)
        quality_factor = random.randint(1, 1000)

        batch_values += f"('{country_name}', '{year_of_entrance}', '{country_capital}', '{country_hymn}',{quality_factor}),"

        if (i + 1) % 10000 == 0:
            file.write(
                f"INSERT INTO eurovision_country(country_name, year_of_entrance, country_capital,country_hymn,quality_factor) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def artist_insert_data():
    file = open("artist_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_artist RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Artist table...")

    for i in range(NO_RECORDS_INTERMEDIARY):

        artist_name = fake.text(max_nb_chars=50)
        artist_age = random.randint(1, 125)
        description = fake.paragraph(nb_sentences=3)
        country_id = random.randint(1, NO_RECORDS)

        batch_values += f"('{artist_name}', '{artist_age}', '{description}', {country_id}),"

        if (i + 1) % 10000 == 0:
            file.write(
                f"INSERT INTO eurovision_artist(artist_name, artist_age, description,country_id) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def song_insert_data():
    file = open("song_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_song RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Song table...")

    for i in range(NO_RECORDS_INTERMEDIARY):
        song_name = fake.text(max_nb_chars=50)
        artist_id_id = random.randint(1, NO_RECORDS)
        release_date = str(fake.date_between(datetime.date(1980, 1, 1), datetime.date(2023, 1, 1)))
        album_name = "Album" + song_name

        batch_values += f"('{song_name}', '{artist_id_id}', '{release_date}', '{album_name}'),"

        if (i + 1) % 10000 == 0:
            file.write(
                f"INSERT INTO eurovision_song(song_name, artist_id_id, release_date,album_name) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def ids_insert_data():
    file = open("ids_insert_data.sql", "w")
    file.write("TRUNCATE TABLE eurovision_ids RESTART IDENTITY CASCADE;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Ids table...")

    for i in range(NO_RECORDS_INTERMEDIARY):

        country_id = random.randint(1, NO_RECORDS)
        edition_id = random.randint(1, NO_RECORDS)
        place = random.randint(1, 30)
        points = random.randint(1, 1000)

        batch_values += f"('{country_id}', '{edition_id}', {place}, {points}),"

        if (i + 1) % 10000 == 0:
            file.write(
                f"INSERT INTO eurovision_ids(country_id, edition_id, place,points) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


if __name__ == '__main__':
    #drop_constraints_indexes()
    add_constraints_indexes()
    # hostcity_insert_data()
    # venue_insert_data()
    # edition_insert_data()
    # country_insert_data()
    # artist_insert_data()
    # song_insert_data()
    # ids_insert_data()
