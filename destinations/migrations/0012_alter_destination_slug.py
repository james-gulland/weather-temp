# Generated by Django 4.2.2 on 2023-08-14 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinations', '0011_destination_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='slug',
            field=models.SlugField(),
        ),
    ]
