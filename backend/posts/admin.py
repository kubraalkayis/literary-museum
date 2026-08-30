from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "content_type",
        "visibility",
        "status",
        "created_at",
    )

    list_filter = (
        "content_type",
        "visibility",
        "status",
    )

    search_fields = (
        "title",
        "author__username",
    )