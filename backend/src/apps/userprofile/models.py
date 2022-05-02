from django.db import models

from django.utils import timezone
from django.db.models.signals import post_save
from django.conf import settings
from django.core.exceptions import ValidationError
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='profile')
    profile_image = models.ImageField(upload_to='users/%Y/%m/%d', blank=True)
    profile_description = models.TextField()

    def __str__(self) -> str:
        return f"{self.user.username}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"


class Follower(models.Model):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friends')
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Follower"
        verbose_name_plural = "Followers"
        unique_together = ("from_user", "to_user")

    def __str__(self):
        return f"User #{self.to_user_id} follow to #{self.from_user_id}"

    def save(self, *args, **kwargs):

        if self.to_user == self.from_user:
            raise ValidationError("Users cannot follow to themselves.")

        super().save(*args, **kwargs)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, **kwargs):
    if kwargs.get('created', False):
        Profile.objects.create(user=kwargs.get("instance"))
