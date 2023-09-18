from django.db import models

class Auth_code_ck(models.Model):
    email = models.CharField(max_length=100, unique=True)
    auth_code = models.CharField(max_length=100, null=False)
    val = models.BooleanField(default=False)

    class Meta:
        db_table = 'Auth_code'
    def __str__(self):
        return str(self.email)

class User_model(models.Model):
    email = models.CharField(max_length=100, unique=True)
    user_name = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=100, null=False)
    nick_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=1000, null=False)

    class Meta:
        db_table = 'User_table'

    def __str__(self):
        return str(self.email)

class Lecture(models.Model):
    title = models.CharField(max_length=100, unique=True)
    title_img = models.ImageField(upload_to='lecture_img')
    company = models.CharField(max_length=50, null=False)
    teacher = models.CharField(max_length=50, null=False)
    live_time = models.CharField(max_length=1000, null=False)
    lecture_text = models.CharField(max_length=10000, null=False)
    runnig_time = models.CharField(max_length=1000, null=False)
    urls = models.CharField(max_length=1000, null=True, default=None)
    live = models.IntegerField(null=True, default=1)

    class Meta:
        db_table = 'Lecture'

    def __str__(self):
        return str(self.title)

