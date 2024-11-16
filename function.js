document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('commentsContainer');
    const charCounter = document.getElementById('charCounter');
    const resetButton = document.getElementById('resetButton');
    const newCommentForm = document.getElementById('newCommentForm');
    const usernameInput = document.getElementById('username-input');
    const commentText = document.getElementById('commentText');
    
    const charLimit = 250;

    const randomUserNames = [
        "John Doe", "Jane Smith", "Mark Wilson", "Emily Davis", "Michael Brown", 
        "Sarah Lee", "David Clark", "Sophia Johnson", "James White", "Olivia Harris"
    ];

    const randomAvatarURLs = [
        "./ai-generated-8635685_640.webp", "./d7090ecd0836259fe622e0bb84370d54.jpg", 
        "./generative-ai-young-smiling-man-avatar-man-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-d-vector-people-279560903.webp", 
        "./4.jpeg", "./5.jpeg" ,"./7.webp", "./8.jpg", "./9.jpeg", "./10.jpg", 
        "https://thumbs.dreamstime.com/b/image-smiling-man-who-has-idea-handsome-bearded-guy-sweater-just-came-up-great-thought-white-background-134071461.jpg", 
        "https://st2.depositphotos.com/1337688/5718/i/450/depositphotos_57188137-stock-photo-smiling-young-boy-in-a.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ0FpBg5Myb9CQ-bQpFou9BY9JXoRG6208_Q&s", 
        "https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
    ];

    initializeDefaultComments();

    resetButton.addEventListener('click', () => {
        window.location.reload();
    });

    function getRandomUserName() {
        return randomUserNames[Math.floor(Math.random() * randomUserNames.length)];
    }

    function getRandomAvatar() {
        return randomAvatarURLs[Math.floor(Math.random() * randomAvatarURLs.length)];
    }

    function addComment(text, userName, avatarURL, parentElement = commentsContainer, isReply = false) {
        const comment = document.createElement('div');
        comment.classList.add('p-4', 'bg-gray-50', 'border', 'border-gray-200', 'rounded-lg', 'space-y-2', 'shadow-sm', 'flex', 'items-start', 'space-x-3');

        comment.innerHTML = `
            <img src="${avatarURL}" alt="${userName}" class="w-10 h-10 rounded-full">
            <div class="flex-1">
                <p class="text-gray-800"><strong>${userName}:</strong> <span class="comment-text">${text}</span></p>
                <div class="flex space-x-2 mt-1">
                    <button class="text-blue-500 text-sm hover:underline reply-btn">Reply</button>
                    ${isReply ? '<button class="text-gray-500 text-sm hover:underline edit-btn">Edit</button>' : ''}
                    ${isReply ? '<button class="text-red-500 text-sm hover:underline delete-btn">Delete</button>' : ''}
                </div>
                <div class="replies ml-6 mt-2 space-y-2 hidden"></div>
            </div>
        `;

        const replyBtn = comment.querySelector('.reply-btn');
        const editBtn = comment.querySelector('.edit-btn');
        const deleteBtn = comment.querySelector('.delete-btn');
        const repliesContainer = comment.querySelector('.replies');
        const commentTextElement = comment.querySelector('.comment-text');
        
        replyBtn.addEventListener('click', () => {
            if (repliesContainer.querySelector('.reply-form')) {
                repliesContainer.querySelector('.reply-form').remove();
            } else {
                const replyForm = createReplyFormWithUsername();
                repliesContainer.classList.remove('hidden');
                repliesContainer.appendChild(replyForm);
            }
        });

        deleteBtn?.addEventListener('click', () => {
            parentElement.removeChild(comment);
        });

        editBtn?.addEventListener('click', () => {
            const isEditing = editBtn.textContent === 'Save';
            if (isEditing) {
                const editText = comment.querySelector('.edit-textarea').value.trim();
                if (editText) {
                    commentTextElement.textContent = editText;
                }
                editBtn.textContent = 'Edit';
                commentTextElement.classList.remove('hidden');
                comment.querySelector('.edit-textarea').remove();
            } else {
                const editTextarea = document.createElement('textarea');
                editTextarea.className = 'edit-textarea w-full p-2 mt-1 border border-gray-300 rounded-lg resize-none';
                editTextarea.maxLength = charLimit;
                editTextarea.value = commentTextElement.textContent;
                commentTextElement.classList.add('hidden');
                commentTextElement.parentElement.appendChild(editTextarea);
                editBtn.textContent = 'Save';
            }
        });

        if (isReply) {
            parentElement.appendChild(comment); // Replies appear at the bottom
        } else {
            parentElement.prepend(comment); // New comments appear at the top
        }

        return comment;
    }

    function createReplyFormWithUsername() {
        const replyForm = document.createElement('div');
        replyForm.classList.add('reply-form', 'mt-2');
        replyForm.innerHTML = `
            <input type="text" placeholder="Enter your username" 
                class="w-[200px] p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400" id="username-input">
            <textarea rows="2" maxlength="250" placeholder="Add a reply..." 
                class="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-400" id="comment-input"></textarea>
            <div class="flex justify-between items-center mt-1">
                <span class="reply-counter text-sm text-gray-600">250 characters left</span>
                <button class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 reply-submit">Submit</button>
            </div>
        `;

        const replyInput = replyForm.querySelector('#comment-input');
        const replyCounter = replyForm.querySelector('.reply-counter');
        const replySubmitBtn = replyForm.querySelector('.reply-submit');
        const usernameInput = replyForm.querySelector('#username-input');

        replyInput.addEventListener('input', () => {
            const remaining = charLimit - replyInput.value.length;
            replyCounter.textContent = `${remaining} characters left`;
        });

        replySubmitBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const replyText = replyInput.value.trim();

            if (username && replyText) {
                addComment(replyText, username, getRandomAvatar(), replyForm.parentElement, true);
                replyForm.remove();
            } else {
                alert("Username and comment box must not be empty.");
            }
        });

        return replyForm;
    }

    function initializeDefaultComments() {
        const comment1 = addComment("Nice Work....! Brother", getRandomUserName(), getRandomAvatar(), commentsContainer, false);
        addNestedReply(comment1, "Thanks, Appreciate it!", getRandomUserName(), getRandomAvatar());
        addNestedReply(comment1, "Can you share your LinkedIn profile, Bro?", getRandomUserName(), getRandomAvatar());

        const comment2 = addComment("Your UI is Good Brother...👍", getRandomUserName(), getRandomAvatar(), commentsContainer, false);
        addNestedReply(comment2, "Thank you! Let me know if you need any help.", getRandomUserName(), getRandomAvatar());
        addNestedReply(comment2, "Where do you get these ideas for your UI?", getRandomUserName(), getRandomAvatar());
    }

    function addNestedReply(comment, text, userName, avatarURL) {
        const repliesContainer = comment.querySelector('.replies');
        const replyComment = addComment(text, userName, avatarURL, repliesContainer, true);
        repliesContainer.classList.remove('hidden');
    }

    newCommentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const text = commentText.value.trim();

        if (username && text) {
            addComment(text, username, getRandomAvatar());
            usernameInput.value = '';
            commentText.value = '';
            charCounter.textContent = `${charLimit} characters left`;
        } else {
            alert('Please fill in both the username and comment text.');
        }
    });

    commentText.addEventListener('input', () => {
        const remaining = charLimit - commentText.value.length;
        charCounter.textContent = `${remaining} characters left`;
    });
});
