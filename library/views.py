from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth.models import AbstractUser
from django.contrib import messages
from django.contrib.auth import  get_user_model,authenticate, login,logout
from django.contrib.auth.hashers import make_password
from .forms import BookForm, EditBookForm
from .models import Book, Category, BorrowRecord,CustomUser
from django.db.models import Q
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils import timezone
from django.http import JsonResponse
from django.urls import reverse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now

#Main......................................................................................................................................

User = get_user_model()

def signup_view(request):
    if request.method == 'POST':
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':  # Check if AJAX
            username = request.POST.get('username').strip()
            email = request.POST.get('email').strip()
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm-password')
            admin_pin = request.POST.get('admin-pin')

            if password != confirm_password:
                return JsonResponse({'success': False, 'message': "Passwords don't match."})

            if not email.endswith('@gmail.com'):
                return JsonResponse({'success': False, 'message': 'Email must end with "@gmail.com".'})

            if len(password) < 6:
                return JsonResponse({'success': False, 'message': 'Password must be at least 6 characters long.'})

            if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Username or email already in use.'})

            is_admin_user = (admin_pin == '1234')

            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                is_superuser=is_admin_user,
            )
            return JsonResponse({'success': True, 'message': 'Registration successful!'})

    return render(request, 'Register.html')

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':  # AJAX
            if user is not None:
                login(request, user)
                dashboard_url = 'admin_dashboard' if user.is_superuser else 'user_dashboard'
                return JsonResponse({'success': True, 'redirect_url': dashboard_url})
            else:
                return JsonResponse({'success': False, 'message': "Invalid username or password"})
        
        # fallback for non-AJAX login
        if user is not None:
            login(request, user)
            return redirect(reverse('admin_dashboard' if user.is_superuser else 'user_dashboard'))
        else:
            messages.error(request, "Invalid username or password")

    return render(request, "login.html")

def reset_password(request):
    if request.method == 'POST':
        if request.headers.get('x-requested-with') == 'XMLHttpRequest': 
            username = request.POST.get('username')
            new_password = request.POST.get('new_password')
            confirm_password = request.POST.get('confirm_password')

            if len(new_password) < 6:
                        return JsonResponse({'success': False, 'message': 'New password must be at least 6 characters long.'})

            if new_password != confirm_password:
                return JsonResponse({'success': False, 'message': "Passwords do not match."})

            try:
                user = User.objects.get(username=username)
                user.set_password(new_password)
                user.save()
                return JsonResponse({'success': True, 'message': "Password reset successfully."})
            except User.DoesNotExist:
                return JsonResponse({'success': False, 'message': "Username not found."})

    return render(request, 'forgetPassword.html')

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def user_book_list(request):
    books = Book.objects.all()
    return render(request, 'user_book_list.html', {'books': books})

def index(request):
    books = Book.objects.all().order_by('-id') 
    query = request.GET.get('q')
    if query:
        books = Book.objects.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(category__name__icontains=query)
        )
    else:
        books = Book.objects.all() 
    return render(request, 'index.html', {'books': books})

def contact(request):
    return render(request, 'contact.html')

def about(request):
    return render(request, 'About Us.html')

def is_admin(user):
    return user.is_superuser

#Admin Pages---------------------------------------------------------------------------------------------------------------------------------
def admin_dashboard(request):
    books = Book.objects.all()
    
    # Get filters from query parameters
    title = request.GET.get('title')
    category = request.GET.get('category')
    author = request.GET.get('author')
    search_query = request.GET.get('q')
    availability = request.GET.get('availability', '')

    

    # Apply search filter
    if search_query:
        books = books.filter(
            Q(title__icontains=search_query) |
            Q(author__icontains=search_query) |
            Q(category__name__icontains=search_query)
        )

    # Apply filters
    if title and title != "All":
        books = books.filter(title__iexact=title)

    if category and category != "All":
        books = books.filter(category__name__iexact=category)

    if author and author != "All":
        books = books.filter(author__iexact=author)

    if availability == "Available":
        books = books.filter(copies__gt=0)
    elif availability == "Unavailable":
        books = books.filter(copies=0)

    context = {
        'books': books,
        'titles': Book.objects.values_list('title', flat=True).distinct(),
        'categories': Category.objects.values_list('name', flat=True).distinct(),
        'authors': Book.objects.values_list('author', flat=True).distinct(),
        'current_title': title or "All",
        'current_category': category or "All",
        'current_author': author or "All",
        'current_availability': availability,
    }

    return render(request, 'Admin-Main.html', context)

def adminProfile(request):
    if request.method == 'POST' and request.FILES.get('profile_image'):
        request.user.profile_image = request.FILES['profile_image']
        request.user.save()

    total_books = Book.objects.count()
    total_users = User.objects.filter(is_superuser=False).count()  
    total_admins = User.objects.filter(is_superuser=True).count()
    return render(request, 'adminProfile.html',{'total_books': total_books, 'total_users': total_users,'total_admins': total_admins,}) 

@login_required
@user_passes_test(is_admin)
def add_book(request):
    if request.method == "POST":
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_dashboard') 
    else:
        form = BookForm()
    return render(request, 'Add-Books.html', {'form': form})

def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return redirect('admin_dashboard')

def editBook(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    categories = Category.objects.all()

    if request.method == 'POST':
        form = EditBookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return redirect('admin_dashboard') 
    else:
        form = EditBookForm(instance=book) 

    category_id = request.POST.get('category')
    new_category_name = request.POST.get('new_category')

    if new_category_name:
        category, _ = Category.objects.get_or_create(name=new_category_name)
    elif category_id:
        category = get_object_or_404(Category, id=category_id)
    else:
        category = None

    book.category = category

    return render(request, 'EditBook.html', {'form': form, 'book': book, 'categories': categories})

def book_detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'bookDetailsAdmin.html', {'book': book})


def AdminsList(request):
    return render(request, 'AdminAdmins.html')

@login_required
@user_passes_test(lambda u: u.is_superuser)  
def UsersList(request):
    users = User.objects.filter(is_superuser=False) 
    return render(request, 'AdminUsers.html', {'users': users})

@login_required
@user_passes_test(lambda u: u.is_superuser)
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        if not user.is_superuser:
            # Step 1: Return all borrowed books
            borrowed_records = BorrowRecord.objects.filter(user=user, status='borrowed')
            for record in borrowed_records:
                record.status = 'returned'
                record.return_date = now()
                record.book.copies += 1  # increment copies available physically (only if you want)
                record.book.save()
                record.save()
            
            # Step 2: Delete the user
            user.delete()
    except User.DoesNotExist:
        pass
    return redirect('usersList') 


@login_required
@user_passes_test(lambda u: u.is_superuser)  
def AdminsList(request):
    users = User.objects.filter(is_superuser=True) 
    return render(request, 'AdminAdmins.html', {'users': users})

@login_required
@user_passes_test(lambda u: u.is_superuser)
def delete_admin(request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            if user != request.user:
                user.delete()
        except User.DoesNotExist:
            pass
    return redirect('adminsList')  


#User Pages----------------------------------------------------------------------------------------------------------------------------


def user_dashboard(request):
    books = Book.objects.all()
    
    # Get filters from query parameters
    title = request.GET.get('title')
    category = request.GET.get('category')
    author = request.GET.get('author')
    search_query = request.GET.get('q')
    availability = request.GET.get('availability', '')

    

    # Apply search filter
    if search_query:
        books = books.filter(
            Q(title__icontains=search_query) |
            Q(author__icontains=search_query) |
            Q(category__name__icontains=search_query)
        )

    # Apply filters
    if title and title != "All":
        books = books.filter(title__iexact=title)

    if category and category != "All":
        books = books.filter(category__name__iexact=category)

    if author and author != "All":
        books = books.filter(author__iexact=author)

    if availability == "Available":
        books = books.filter(copies__gt=0)
    elif availability == "Unavailable":
        books = books.filter(copies=0)

    context = {
        'books': books,
        'titles': Book.objects.values_list('title', flat=True).distinct(),
        'categories': Category.objects.values_list('name', flat=True).distinct(),
        'authors': Book.objects.values_list('author', flat=True).distinct(),
        'current_title': title or "All",
        'current_category': category or "All",
        'current_author': author or "All",
        'current_availability': availability,
    }

    return render(request, 'Select.html', context)


def contactUser(request):
    return render(request, 'contactUser.html')

def aboutUser(request):
    return render(request, 'About Us User.html')

def userProfile(request):
    borrowed_books = BorrowRecord.objects.filter(user=request.user)
    return render(request, 'userProfile.html' , {'borrowed_books': borrowed_books})

@login_required
def editProfile(request):
    user = request.user  # CustomUser instance

    if request.method == 'POST':
        user.first_name = request.POST.get('fName')
        user.last_name = request.POST.get('lName')
        user.email = request.POST.get('email')
        user.phone = request.POST.get('phone')
        user.address = request.POST.get('address')
        user.favorite_category = request.POST.get('category')

        if 'profile_picture' in request.FILES:
            user.profile_image = request.FILES['profile_picture']

        user.save()
        return redirect('editProfile')

    return render(request, 'EditProfile.html')



def BDetails(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'bookDetailsUser.html', {'book': book})

@login_required
def borrow_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if BorrowRecord.objects.filter(user=request.user, book=book, status='borrowed').exists():
        return JsonResponse({'success': False, 'message': "You have already borrowed this book and haven't returned it yet."})

    if book.copies <= 0:
        return JsonResponse({'success': False, 'message': "No copies available to borrow at the moment. Please wait until a copy is returned."})

    # Decrease copies and save borrow record
    book.copies -= 1
    book.save()

    BorrowRecord.objects.create(user=request.user, book=book, status='borrowed', borrow_date=timezone.now())

    return JsonResponse({'success': True, 'message': f'You successfully borrowed "{book.title}".', 'copies_left': book.copies})


@login_required
@login_required
def return_book(request, record_id):
    from .models import BorrowRecord
    from django.utils.timezone import now

    try:
        record = BorrowRecord.objects.get(id=record_id, user=request.user)
        record.status = 'returned'
        record.return_date = now()
        record.save()
        book = record.book
        book.copies += 1
        book.save()

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Book returned successfully'})

        return redirect('userProfile')
    except BorrowRecord.DoesNotExist:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'message': 'Borrow record not found'}, status=404)
        return redirect('userProfile')


