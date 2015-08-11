# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0002_auto_20150807_1332'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventGuest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(related_name='guests', to='events.Event')),
                ('user', models.ForeignKey(related_name='guests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventOrganizer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(related_name='organizers', to='events.Event')),
                ('user', models.ForeignKey(related_name='organizers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventProduct',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(related_name='event_products', to='events.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=250)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductRating',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rating', models.DecimalField(max_digits=3, decimal_places=2)),
                ('rated_dt', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(related_name='product_ratings', to='events.Product')),
                ('user', models.ForeignKey(related_name='product_ratings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='eventproduct',
            name='product',
            field=models.ForeignKey(related_name='event_products', to='events.Product'),
        ),
    ]
