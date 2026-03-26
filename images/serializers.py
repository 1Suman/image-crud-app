from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Image
        fields = ['id', 'title', 'image', 'description',
                  'uploaded_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'uploaded_by', 'created_at', 'updated_at']