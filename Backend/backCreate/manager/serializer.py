from xml.etree.ElementTree import Comment
from django.db.models import fields
from rest_framework import serializers
from rest_framework.utils import field_mapping
from .models import *

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= Details
        fields = ('__all__')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model= Posts
        fields = ('__all__')       

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields = ('__all__')       