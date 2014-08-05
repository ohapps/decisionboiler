from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Decision, Option, Criteria, OptionScore, CriteriaType


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class DecisionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Decision
        fields = ('user', 'description', 'complete')