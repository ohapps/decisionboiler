from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Decision, Option, Criteria, OptionScore, CriteriaType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')

class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = ('id', 'user', 'description', 'complete')
        read_only_fields = ['user']

class CriteriaTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria
        fields = ('id', 'description')

class CriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria
        fields = ('id', 'decision', 'type', 'description', 'weight', 'sort_order')

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'decision', 'description')

class OptionScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionScore
        fields = ('id', 'result', 'criteria', 'option')
