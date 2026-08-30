from rest_framework import permissions, viewsets

from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(
            status=Post.Status.PUBLISHED,
            visibility=Post.Visibility.PUBLIC,
        ).order_by("-created_at")

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]

        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)