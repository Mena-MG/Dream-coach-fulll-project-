document.addEventListener('DOMContentLoaded', function() {
    // Handle post creation
    const createPostInput = document.querySelector('.create-post input');
    const postOptions = document.querySelectorAll('.post-options button');

    createPostInput.addEventListener('focus', function() {
        this.style.background = '#fff';
        this.style.boxShadow = '0 0 0 2px #e7f3ff';
    });

    createPostInput.addEventListener('blur', function() {
        this.style.background = '#f0f2f5';
        this.style.boxShadow = 'none';
    });

    postOptions.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.background = '#f0f2f5';
        });
        button.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });

    // Handle friend request buttons
    const confirmButtons = document.querySelectorAll('.confirm');
    const deleteButtons = document.querySelectorAll('.delete');

    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            const request = this.closest('.request');
            request.innerHTML = '<p>Friend request accepted!</p>';
            setTimeout(() => {
                request.remove();
            }, 2000);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const request = this.closest('.request');
            request.remove();
        });
    });

    // Add scroll shadow to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Add post interaction functionality
    document.querySelectorAll('.post-actions-buttons button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const post = this.closest('.post');
            const statsElement = post.querySelector('.reactions');

            if (action.includes('Like')) {
                this.classList.toggle('liked');
                if (this.classList.contains('liked')) {
                    this.style.color = '#1877f2';
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                } else {
                    this.style.color = '#65676b';
                    this.querySelector('i').classList.remove('fas');
                    this.querySelector('i').classList.add('far');
                }
            }
        });
    });

    // Add lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add smooth scroll for trending topics
    document.querySelectorAll('.trending-topics .topic').forEach(topic => {
        topic.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Add post creation preview
  // Update the Enter key handler
createPostInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        const mediaElement = mediaPreview.querySelector('img, video');
        let mediaSrc = null;
        let mediaType = null;
        
        if (mediaElement) {
            mediaSrc = mediaElement.src;
            mediaType = mediaElement.tagName.toLowerCase();
        }
        
        const newPost = createNewPost(this.value.trim(), mediaSrc, mediaType);
        const posts = document.querySelector('.posts');
        posts.insertBefore(newPost, posts.firstChild);
        
        this.value = '';
        removeMedia(); // Clear media preview after posting
    }
});

    function createNewPost(content, mediaSrc, mediaType) {
        const post = document.createElement('div');
        post.className = 'post';
        
        let mediaHTML = '';
        if (mediaSrc && mediaType) {
            mediaHTML = `
                <div class="post-content">
                    ${mediaType === 'img' ? 
                        `<div class="post-image">
                            <img src="${mediaSrc}" alt="Post media">
                        </div>` : 
                        `<video src="${mediaSrc}" controls style="width:100%; max-height:500px; object-fit:cover;"></video>`
                    }
                </div>
            `;
        }
    
        post.innerHTML = `
            <div class="post-header">
                <div class="user-avatar">
                    <img src="https://i.pravatar.cc/150?img=32" alt="Profile">
                </div>
                <div class="post-info">
                    <h4>You</h4>
                    <span>Just now</span>
                </div>
            </div>
            <div class="post-text">
                <p>${content}</p>
            </div>
            ${mediaHTML}
            <div class="post-stats">
                <div class="reactions">
                    <span>❤️ 0</span>
                    <span>💬 0 comments</span>
                    <span>🔄 0 shares</span>
                </div>
            </div>
            <div class="post-actions-buttons">
                <button><i class="far fa-thumbs-up"></i> Like</button>
                <button><i class="far fa-comment"></i> Comment</button>
                <button><i class="fas fa-share"></i> Share</button>
            </div>
        `;
        return post;
    }
    

    // Add click handler for search button
    document.querySelector('.search-btn').addEventListener('click', function() {
        // Add your search functionality here
        console.log('Search clicked');
    });

    // Add click handler for cart button
    document.querySelector('.cart-btn').addEventListener('click', function() {
        // Add your cart functionality here
        console.log('Cart clicked');
    });

    // Optional: Add keyboard navigation for dropdown
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const dropdown = document.querySelector('.dropdown-content');
            if (dropdown.style.visibility === 'visible') {
                dropdown.style.visibility = 'hidden';
                dropdown.style.opacity = '0';
            }
        }
    });

    // Update post creation elements
    const mediaUpload = document.getElementById('media-upload');
    const mediaPreview = document.getElementById('media-preview');
    const postInput = document.getElementById('post-input');
    const emojiPicker = document.getElementById('emoji-picker');
    const emojiButton = document.querySelector('.emoji-button');

    // Handle media upload
    if (mediaUpload && mediaPreview) {
        mediaUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    mediaPreview.style.display = 'block';
                    if (file.type.startsWith('image/')) {
                        mediaPreview.innerHTML = `
                            <div class="preview-container">
                                <img src="${e.target.result}" alt="Preview">
                                <button class="remove-media">×</button>
                            </div>
                        `;
                    } else if (file.type.startsWith('video/')) {
                        mediaPreview.innerHTML = `
                            <div class="preview-container">
                                <video src="${e.target.result}" controls></video>
                                <button class="remove-media">×</button>
                            </div>
                        `;
                    }
                    // Add event listener to remove button
                    const removeButton = mediaPreview.querySelector('.remove-media');
                    if (removeButton) {
                        removeButton.addEventListener('click', removeMedia);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle emoji picker
    if (emojiButton && emojiPicker) {
        const emojis = ['😀', '😂', '😊', '😍', '🥰', '😎', '🤔', '😴', '😭', '😡', '👍', '👎', '❤️', '💔', '🎉'];

        emojiButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (emojiPicker.style.display === 'none' || !emojiPicker.style.display) {
                emojiPicker.innerHTML = emojis.map(emoji =>
                    `<span class="emoji">${emoji}</span>`
                ).join('');
                emojiPicker.style.display = 'block';

                // Add click handlers to emoji spans
                emojiPicker.querySelectorAll('.emoji').forEach(span => {
                    span.addEventListener('click', () => {
                        postInput.value += span.textContent;
                        emojiPicker.style.display = 'none';
                    });
                });
            } else {
                emojiPicker.style.display = 'none';
            }
        });
    }

    // Close emoji picker when clicking outside
    document.addEventListener('click', function(e) {
        if (emojiPicker && !e.target.closest('.emoji-picker') && !e.target.closest('.emoji-button')) {
            emojiPicker.style.display = 'none';
        }
    });

    function removeMedia() {
        if (mediaPreview) {
            mediaPreview.style.display = 'none';
            mediaPreview.innerHTML = '';
        }
        if (mediaUpload) {
            mediaUpload.value = '';
        }
    }

    // Make startLiveVideo globally available
    window.startLiveVideo = function() {
        alert('Live video feature coming soon!');
    };
});