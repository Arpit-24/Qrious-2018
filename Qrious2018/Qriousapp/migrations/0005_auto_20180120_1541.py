# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-20 10:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Qriousapp', '0004_auto_20180120_1425'),
    ]

    operations = [
        migrations.RenameField(
            model_name='problem',
            old_name='prob_data',
            new_name='prob_ques',
        ),
        migrations.AddField(
            model_name='custuser',
            name='current_ques',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='custuser',
            name='forfeited_ques_list',
            field=models.CommaSeparatedIntegerField(default=[0], max_length=100),
        ),
        migrations.AddField(
            model_name='custuser',
            name='success_ques_list',
            field=models.CommaSeparatedIntegerField(default=[0], max_length=100),
        ),
        migrations.AddField(
            model_name='problem',
            name='prob_is_forfeit',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='problem',
            name='prob_is_pass',
            field=models.IntegerField(default=0),
        ),
    ]
