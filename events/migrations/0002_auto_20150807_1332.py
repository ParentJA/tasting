# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='end_date',
            new_name='end_dt',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='start_date',
            new_name='start_dt',
        ),
    ]
