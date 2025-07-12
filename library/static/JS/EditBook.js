    const categorySelect = document.getElementById('id_category');
    const newCategoryDiv = document.getElementById('new-category-div');

    function toggleNewCategoryField() {
        if (categorySelect.value === "") {
            newCategoryDiv.style.display = 'block';
        } else {
            newCategoryDiv.style.display = 'none';
        }
    }

    categorySelect.addEventListener('change', toggleNewCategoryField);
    window.addEventListener('load', toggleNewCategoryField);