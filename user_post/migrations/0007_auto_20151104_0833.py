# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_post', '0006_auto_20151031_1020'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='post',
        ),
        migrations.DeleteModel(
            name='Photo',
        ),
    ]
