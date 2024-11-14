document.addEventListener('DOMContentLoaded', () => {
    const newCommentForm = document.getElementById('newCommentForm');
    const commentInput = document.getElementById('commentInput');
    const commentsContainer = document.getElementById('commentsContainer');
    const charCounter = document.getElementById('charCounter');
    const resetButton = document.getElementById('resetButton');
    const charLimit = 250;

    
    initializeDefaultComments();

    commentInput.addEventListener('input', () => {
        const remaining = charLimit - commentInput.value.length;
        charCounter.textContent = `${remaining} characters left`;
    });

    
    newCommentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText, "You", "./ai-generated-8635685_640.webp", commentsContainer); // Replace with appropriate image path
            commentInput.value = '';
            charCounter.textContent = `${charLimit} characters left`;
        } else {
            alert("Comment box is empty");
        }
    });

    
    resetButton.addEventListener('click', () => {
        commentsContainer.innerHTML = '';
        initializeDefaultComments();
        commentInput.value = '';
        charCounter.textContent = `${charLimit} characters left`;
    });

    function addComment(text, userName, avatarURL, parentElement = commentsContainer) {
        const comment = document.createElement('div');
        comment.classList.add('p-4', 'bg-gray-50', 'border', 'border-gray-200', 'rounded-lg', 'space-y-2', 'shadow-sm', 'flex', 'items-start', 'space-x-3');

        comment.innerHTML = `
            <img src="${avatarURL}" alt="${userName}" class="w-10 h-10 rounded-full">
            <div class="flex-1">
                <p class="text-gray-800"><strong>${userName}:</strong> <span class="comment-text">${text}</span></p>
                <div class="flex space-x-2 mt-1">
                    <button class="text-blue-500 text-sm hover:underline reply-btn">Reply</button>
                    <button class="text-gray-500 text-sm hover:underline edit-btn">Edit</button>
                    <button class="text-red-500 text-sm hover:underline delete-btn">Delete</button>
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
            const replyForm = createReplyForm();
            repliesContainer.classList.remove('hidden');
            repliesContainer.appendChild(replyForm);
        });

        deleteBtn.addEventListener('click', () => {
            parentElement.removeChild(comment);
        });

        editBtn.addEventListener('click', () => {
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

        parentElement.appendChild(comment);
    }

    function createReplyForm() {
        const replyForm = document.createElement('div');
        replyForm.classList.add('reply-form', 'mt-2');
        replyForm.innerHTML = `
            <textarea rows="2" maxlength="250" placeholder="Add a reply..."
                class="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-400"></textarea>
            <div class="flex justify-between items-center mt-1">
                <span class="reply-counter text-sm text-gray-600">250 characters left</span>
                <button class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 reply-submit">Submit</button>
            </div>
        `;

        const replyInput = replyForm.querySelector('textarea');
        const replyCounter = replyForm.querySelector('.reply-counter');
        const replySubmitBtn = replyForm.querySelector('.reply-submit');

        replyInput.addEventListener('input', () => {
            const remaining = charLimit - replyInput.value.length;
            replyCounter.textContent = `${remaining} characters left`;
        });

        replySubmitBtn.addEventListener('click', () => {
            const replyText = replyInput.value.trim();
            if (replyText) {
                addComment(replyText, "You", "./ai-generated-8635685_640.webp", replyForm.parentElement); // Replace with appropriate image path
                replyForm.remove();
            } else {
                alert("Comment box is empty");
            }
        });

        return replyForm;
    }

    function initializeDefaultComments() {
        addComment("Nice Work....! Brother", "Gaurav Sonawane", "./d7090ecd0836259fe622e0bb84370d54.jpg");
        addComment("Your UI is Good Brother...👍", "Pranav Mali", "./generative-ai-young-smiling-man-avatar-man-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-d-vector-people-279560903.webp");
        addComment("Hey, can you share your GitHub repo🚀", "Mansi Mali", "./360_F_616479367_JcdjFpbvTp2H9XhQZxB9HiW1xOpVP5wY.jpg");
    }
});
