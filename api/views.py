from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer, DecisionSerializer, CriteriaTypeSerializer, CriteriaSerializer, OptionSerializer, OptionScoreSerializer
from api.models import Decision, CriteriaType, Criteria, Option, OptionScore
from api.permissions import IsOwner


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class DecisionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows decisions to be viewed or edited.
    """
    queryset = Decision.objects.all()
    serializer_class = DecisionSerializer

    def get_queryset(self):
        print 'get decisions ' + str(self.request.user.id)
        decisions = Decision.objects.filter(user=self.request.user)
        complete = self.request.QUERY_PARAMS.get('complete', None)
        if complete is not None:
            decisions = decisions.filter(complete=complete)
        return decisions

    def pre_save(self, obj):
        obj.user = self.request.user    

class CriteriaTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows criteria type to be viewed or edited.
    """
    queryset = CriteriaType.objects.all()
    serializer_class = CriteriaTypeSerializer

class CriteriaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows criteria to be viewed or edited.
    """
    queryset = Criteria.objects.all()
    serializer_class = CriteriaSerializer

    def get_queryset(self):
        criteria = Criteria.objects.filter(decision__user=self.request.user)
        decisionId = self.request.QUERY_PARAMS.get('decisionId', None)
        if decisionId is not None:
            criteria = criteria.filter(decision__id=decisionId)
        return criteria

class OptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows criteria to be viewed or edited.
    """
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

    def get_queryset(self):
        return Option.objects.filter(decision__user=self.request.user)

class OptionScoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows option score to be viewed or edited.
    """
    queryset = OptionScore.objects.all()
    serializer_class = OptionScoreSerializer

    def get_queryset(self):
        return OptionScore.objects.filter(option__decision__user=self.request.user)

@api_view(['GET'])
def decision_summary(request, id):
    if request.method == 'GET':
        summaries = []
        options = Option.objects.filter(decision__user=request.user)
        options = options.filter(decision__id=id)
        for option in options:
            summary = {
                'id' : option.id,
                'description' : option.description,
                'decision_id' : id
            }
            for optionscore in option.optionscore_set.all():
                summary['criteria_' + str(optionscore.criteria_id)] = optionscore.result
            summaries.append(summary)
        return Response(summaries)

@api_view(['POST'])
def update_decision_option(request):
    if request.method == 'POST':
        options = Option.objects.filter(decision__user=request.user)
        options = options.filter(id=request.DATA['id'])
        if len(options) == 1:
            option = options[0]
            option.description = request.DATA['description']
            option.save()
            for param in request.DATA:
                if param[:9] == 'criteria_':
                    criteriaId = param[9:]
                    scores = option.optionscore_set.filter(criteria_id=criteriaId)
                    if len(scores) == 1:
                        score = scores[0]
                        score.result = request.DATA[param]
                        score.save()
                    else:
                        score = OptionScore.objects.create(option_id=option.id, criteria_id=criteriaId, result=request.DATA[param])
            return Response()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
