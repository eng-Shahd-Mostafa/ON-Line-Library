
from django.urls import path
from . import views


urlpatterns = [ path("0", views.index, name='index'),
                path("SignUp", views.signup_view, name='signup'),
                path("LogIn", views.login_view, name='login'),
                path("ResetPassword", views.reset_password, name='reset_password'),
                path("About", views.about, name='about'),
                path("Contact", views.contact, name='contact'),
                
                
                path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
                path('admin-dashboard/AdminProfile', views.adminProfile, name='adminProfile'),
                path('admin-dashboard/AddBook', views.add_book, name='addBook'),
                path('delete-book/<int:book_id>/', views.delete_book, name='delete_book'),
                path('admin-dashboard/edit-book/<int:book_id>/', views.editBook, name='edit_book'),
                path('book/<int:book_id>/', views.book_detail, name='book_detail'),
                path('admin-dashboard/UsersList', views.UsersList, name='usersList'),
                path('admin-dashboard/AdminsList', views.AdminsList, name='adminsList'),
                path('delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
                path('delete-admin/<int:user_id>/', views.delete_admin, name='delete_admin'),





                path('user-dashboard/', views.user_dashboard, name='user_dashboard'),
                path("user-dashboard/AboutUs", views.aboutUser, name='aboutUser'),
                path("user-dashboard/ContactUs", views.contactUser, name='contactUser'),
                path("user-dashboard/Profile", views.userProfile, name='userProfile'),
                path("user-dashboard/editProfile", views.editProfile, name='editProfile'),
                path('Book/<int:book_id>/', views.BDetails, name='BookDetails'),
                path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
                path('return-book/<int:record_id>/', views.return_book, name='return_book'),





                path('logout/', views.logout_view, name='logout'),
               ]


