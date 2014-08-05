from django.contrib import admin
from api.models import Decision, Option, Criteria, OptionScore, CriteriaType

admin.site.register(Decision)
admin.site.register(Option)
admin.site.register(Criteria)
admin.site.register(OptionScore)
admin.site.register(CriteriaType)

