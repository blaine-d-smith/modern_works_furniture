# Generated by Django 4.0.1 on 2022-02-04 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_postalcode_shippingaddress_zipcode'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='shippingCost',
            new_name='shippingPrice',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='taxCost',
            new_name='taxPrice',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='totalCost',
            new_name='totalPrice',
        ),
    ]
