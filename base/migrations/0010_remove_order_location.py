# Generated by Django 4.0.1 on 2022-02-09 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_order_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='location',
        ),
    ]
