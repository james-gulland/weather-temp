# Generated by Django 4.2.2 on 2023-08-14 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinations', '0008_destination_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='slug',
            field=models.SlugField(null=True),
        ),
    ]