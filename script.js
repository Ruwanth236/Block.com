// Initialize the blog container
const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search");

// Load blogs from localStorage
const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Display existing blogs on load
function loadBlogs() {
    blogContainer.innerHTML = ""; // Clear current blogs
    savedBlogs.forEach((blog, index) => createBlogElement(blog.title, blog.content, index));
}

// Create a blog post element with edit and delete buttons
function createBlogElement(title, content, index) {
    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");

    blogPost.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="action-buttons">
            <button class="edit" onclick="editBlog(${index})">Edit</button>
            <button class="delete" onclick="deleteBlog(${index})">Delete</button>
        </div>
    `;

    blogContainer.appendChild(blogPost);
}

// Add a new blog and save it
document.getElementById("blog-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // Add to the saved blogs list
    savedBlogs.push({ title, content });

    // Save to localStorage
    localStorage.setItem("blogs", JSON.stringify(savedBlogs));

    // Create and display the blog
    createBlogElement(title, content, savedBlogs.length - 1);

    // Clear form fields
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
});

// Delete a blog
function deleteBlog(index) {
    // Remove from savedBlogs
    savedBlogs.splice(index, 1);

    // Update localStorage
    localStorage.setItem("blogs", JSON.stringify(savedBlogs));

    // Reload blogs
    loadBlogs();
}

// Edit a blog
function editBlog(index) {
    const blog = savedBlogs[index];

    // Populate the form with the existing data
    document.getElementById("title").value = blog.title;
    document.getElementById("content").value = blog.content;

    // Remove the blog from savedBlogs temporarily
    deleteBlog(index);

    // Scroll to the form
    document.getElementById("title").focus();
}

// Implement search functionality
searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    // Filter blogs by search term
    const filteredBlogs = savedBlogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.content.toLowerCase().includes(searchTerm)
    );

    // Display filtered blogs
    blogContainer.innerHTML = "";
    filteredBlogs.forEach((blog, index) => createBlogElement(blog.title, blog.content, index));
});

// Load blogs on page load
loadBlogs();