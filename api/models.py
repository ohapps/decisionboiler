from django.db import models
from django.contrib.auth.models import User


class Decision (models.Model):
    user = models.ForeignKey(User)
    description = models.CharField(max_length=200)
    complete = models.IntegerField(default=0)

    def __unicode__(self):
        return self.description


class Option (models.Model):
    decision = models.ForeignKey(Decision)
    description = models.CharField(max_length=200)

    def __unicode__(self):
        return self.description


class CriteriaType (models.Model):
    description = models.CharField(max_length=100)

    def __unicode__(self):
        return self.description


class Criteria (models.Model):
    decision = models.ForeignKey(Decision)
    type = models.ForeignKey(CriteriaType)
    description = models.CharField(max_length=200)
    weight = models.PositiveIntegerField(default=1)
    sort_order = models.PositiveIntegerField(default=1)

    def __unicode__(self):
        return self.description


class OptionScore (models.Model):
    option = models.ForeignKey(Option)
    criteria = models.ForeignKey(Criteria)
    result = models.CharField(max_length=200)

    def __unicode__(self):
        return self.result



