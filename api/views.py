from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer, GroupSerializer, DecisionSerializer
from api.models import Decision
from api.permissions import IsOwner


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class DecisionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows decisions to be viewed or edited.
    """
    queryset = Decision.objects.all()
    serializer_class = DecisionSerializer

    def get_queryset(self):
        return Decision.objects.filter(user=self.request.user)

    def pre_save(self, obj):
        obj.user = self.request.user


class DecisionList(APIView):
    """
    List all decisions for current user
    """
    def get(self, request, format=None):
        decisions = Decision.objects.filter(user=request.user)
        serializer = DecisionSerializer(decisions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DecisionSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def pre_save(self, obj):
        obj.user = self.request.user