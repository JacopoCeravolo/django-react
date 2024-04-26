from django.shortcuts import render
from django.contrib.auth.models import User
from .serialazers import NoteSerialazer, UserSerializer
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework import  generics
from .models import Note

# Create your views here.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerialazer
    permission_classes = [IsAuthenticated]


    # this function returns the list of notes associated with the authenticated user:
    # you have  the acces to the list of your notes but not notes associated with
    # other users.
    #! This function override the 'get_queryset' method 
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    # this function creaate a new Note and control if the fields are valid.
    #! This function override the 'perform_create' method 
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print (serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerialazer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):

    queryset = User.objects.all()   # all Users created, to compare and to not create an existing User
    serializer_class = UserSerializer # requirement data to create a new User (username, password, email)
    permission_classes = [AllowAny] # who can call this method

