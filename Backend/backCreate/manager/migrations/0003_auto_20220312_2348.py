# Generated by Django 3.2.8 on 2022-03-12 18:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('manager', '0002_auto_20220312_0252'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='details',
            name='firstName',
        ),
        migrations.RemoveField(
            model_name='details',
            name='lastName',
        ),
        migrations.AddField(
            model_name='details',
            name='postNum',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(max_length=200)),
                ('username', models.CharField(max_length=50)),
                ('createdAt', models.DateField()),
                ('parentId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='self', to='manager.comment')),
                ('userId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='writer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]