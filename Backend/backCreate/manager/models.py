from django.db import models
from django.contrib.auth.models import User

def upload_to(instance, filename):
    return 'profiles/{filename}'.format(filename=filename)

def upload_to2(instance, filename):
    return 'postimgs/{filename}'.format(filename=filename)

class Details(models.Model):
    owner=models.ForeignKey(User,related_name="dee",on_delete=models.CASCADE,null=True)
    gender = models.CharField(max_length=30)
    bio = models.CharField(max_length=100)
    profileImg= models.ImageField(blank=True, null=True,upload_to=upload_to)
    postNum=models.IntegerField(blank=True,default=0)
	

class Posts(models.Model):
    author=models.ForeignKey(User,related_name="author",on_delete=models.CASCADE,null=True)
    blogCategory=models.CharField(max_length=30)
    blogTitle=models.CharField(max_length=50)
    postedOn=models.DateTimeField()
    blogImage=models.ImageField(blank=True, null=True, upload_to=upload_to2)
    blogText=models.TextField(max_length=3000)


class Comment(models.Model):
    body=models.CharField(max_length=200)
    username=models.CharField(max_length=50)
    userId=models.ForeignKey(User,related_name="writer",on_delete=models.CASCADE,null=True)
    #parentId=models.ForeignKey('self',related_name="self",null=True,on_delete=models.CASCADE)
    parentId=models.IntegerField(default=0)
    createdAt=models.DateField()