from django.db import models
from django.contrib.auth.models import User

#*links data from django
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True) #* (auto_now_add=True)  -->  automathically populate the instance
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')    #? ForeignKey:
                                                                                        #? link an object 'User' to some data that belongs that 'User'
                                                                                        #? (on_delete=models.CASCADE)  -->  if the 'User' is deleted, all the notes are  also deleted

    def __str__(self):
        return self.title