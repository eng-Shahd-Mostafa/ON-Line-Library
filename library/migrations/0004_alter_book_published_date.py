# Generated by Django 5.2.1 on 2025-05-15 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_book_published_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='published_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
