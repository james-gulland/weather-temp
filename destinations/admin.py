from django.contrib import admin
from .models import Destination, Image

# Define the ImageInline class for inline display
class ImageInline(admin.StackedInline):  # Use TabularInline if you prefer a tabular layout.
    model = Image

# Customize the DestinationAdmin class to include the ImageInline
class DestinationAdmin(admin.ModelAdmin):
    inlines = [ImageInline]

# Register your models here.
admin.site.register(Destination, DestinationAdmin)  # Use DestinationAdmin for customizing the Destination admin view
admin.site.register(Image)  # Register the Image model separately to access it directly in the admin