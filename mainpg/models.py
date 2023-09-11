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
