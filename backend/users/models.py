from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "USER", "User"
        EDITOR = "EDITOR", "Editor"
        ADMIN = "ADMIN", "Admin"

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER,
    )

    preferred_language = models.CharField(
        max_length=2,
        choices=[
            ("EN", "English"),
            ("TR", "Turkish"),
        ],
        default="EN",
    )

    bio = models.TextField(blank=True)
    profile_image = models.URLField(blank=True)

    def __str__(self):
        return self.username