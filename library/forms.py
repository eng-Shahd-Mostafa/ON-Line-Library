from django import forms
from .models import Book, Category

class BookForm(forms.ModelForm):
    new_category = forms.CharField(max_length=100, required=False, label="Or Add New Category")

    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'cover', 'description' , 'copies']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].empty_label = "None (Add new category)"
        self.fields['category'].required = False  # Allow skipping this

    def clean(self):
        cleaned_data = super().clean()
        category = cleaned_data.get('category')
        new_category = cleaned_data.get('new_category')

        if not category and not new_category:
            raise forms.ValidationError("Please select a category or add a new one.")

        return cleaned_data

    def save(self, commit=True):
        new_category = self.cleaned_data.get('new_category')
        if not self.cleaned_data.get('category') and new_category:
            category, created = Category.objects.get_or_create(name=new_category)
            self.instance.category = category
        return super().save(commit=commit)

class EditBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'cover', 'description', 'copies']