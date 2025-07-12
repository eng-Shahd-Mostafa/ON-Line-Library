# models.py
from django.contrib.auth.models import AbstractUser , User
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    is_admin_user = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    favorite_category = models.CharField(max_length=100, blank=True, null=True)

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='book_covers/')
    description = models.TextField(max_length=255)
    published_date = models.DateField(auto_now_add=True)  
    copies = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.title

    @property
    def copies_borrowed(self):
        # Count how many copies are currently borrowed (not returned)
        return BorrowRecord.objects.filter(book=self, status='borrowed').count()

    @property
    def copies_available(self):
        return self.copies - self.copies_borrowed


class BorrowRecord(models.Model):
    STATUS_CHOICES = [
        ('borrowed', 'Borrowed'),
        ('returned', 'Returned'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='borrowed')
    borrow_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.status})"


