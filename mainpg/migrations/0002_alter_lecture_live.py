# Generated by Django 4.2.4 on 2023-09-18 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainpg', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lecture',
            name='live',
            field=models.CharField(default=1, null=True),
        ),
    ]
