from django.core.exceptions import ObjectDoesNotExist
#from django.db.models.expressions import Exists
from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q,Subquery,Exists
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.contrib.humanize.templatetags.humanize import naturalday, naturaltime
# import geopy.distance
# from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from rest_auth.registration.views import SocialLoginView
class DetailView(APIView):
    serializer_class = DetailSerializer
    permission_classes = [IsAuthenticated]
    parser_classes= [MultiPartParser, FormParser,JSONParser]
    def get(self,request,*args,**kwargs):
        # serializer = UserSerializer(request.user)
        # return Response(serializer.data)
        num=request.user.pk
       
        postobjs=Posts.objects.filter(author=request.user.pk)
        postNum=len(postobjs)
        #username="hey"
        username=User.objects.filter(pk=num)[0].username
        print(request.user.username)
        detail = [ {"pic":detail.profileImg.url,"Bio":detail.bio,"postNum":postNum,"username":username }
        for detail in Details.objects.filter(owner=num)]
        
        return Response(detail)
    def post(self, request,*args,**kwargs):
        num=request.user.pk
        obj=Details.objects.filter(owner=num)
        if(len(obj)==0):
            data=request.data
            serializer = DetailSerializer(data=data)
            data['owner']=request.user.pk
            if (serializer.is_valid(raise_exception=True)):
            #if((datetime.date.today() - self.dob) > datetime.timedelta(days=18*365)):
               serializer.save()
               return Response(serializer.data)
        else:
            return Response("Already filled")

class PostsView(APIView):
    serializer_class=PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes= [MultiPartParser, FormParser,JSONParser]
    def get(self,request,*args,**kwargs):
        posts = [ {"id":post.pk,"blogCategory":post.blogCategory,"blogTitle":post.blogTitle,"blogImage":post.blogImage.url,"postedOn":naturaltime(post.postedOn),"author":'anchal',"blogText":post.blogText,"slug":post.blogTitle}
        for post in Posts.objects.all()]
        return Response(posts)
    def post(self,request,*args,**kwargs):
        data=request.data
        serializer=PostSerializer(data=data)
        #data._mutable=True
        data['author']=request.user.pk
        data['username']=User.objects.filter(pk=1)[0].username
        data['postedOn']=datetime.now()
        print(data)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            #print("swiped right: "+data['swipedUser'])
            return Response(serializer.data)


class CommentView(APIView):
    serializer_class=CommentSerializer
    parser_classes= [MultiPartParser, FormParser,JSONParser]
    def get(self,request,*args,**kwargs):
        commentData = [ {"id":comm.pk,"body":comm.body,"username":comm.username,"userId":(comm.userId).pk,"parentId":comm.parentId,"createdAt":comm.createdAt}
        for comm in Comment.objects.all()]
        print(commentData)
        return Response(commentData)
    def post(self,request,*args,**kwargs):
        
        #UserId=request.user.pk
        
        data=request.data
        serializer=CommentSerializer(data=data)
        #data._mutable=True
        data['userId']=1
        data['username']=User.objects.filter(pk=1)[0].username
        data['createdAt']=datetime.now().date()
        
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            #print("swiped right: "+data['swipedUser'])
            return Response(serializer.data)
