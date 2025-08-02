// Firebase Yorum Sistemi
document.addEventListener('DOMContentLoaded', function() {
    loadCommentsFromFirebase();
});

// Firebase'den yorumları yükle
function loadCommentsFromFirebase() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '<p>Yorumlar yükleniyor...</p>';
    
    const commentsRef = database.ref('comments');
    commentsRef.orderByChild('timestamp').once('value')
        .then((snapshot) => {
            const commentsData = snapshot.val();
            commentsList.innerHTML = '';
            
            if (!commentsData) {
                commentsList.innerHTML = '<p>Henüz yorum yapılmamış. İlk yorumu siz yazın!</p>';
                return;
            }
            
            // Yorumları sırala (yeniden eskiye)
            const sortedComments = Object.values(commentsData).sort((a, b) => b.timestamp - a.timestamp);
            
            sortedComments.forEach(comment => {
                const commentDate = new Date(comment.timestamp);
                const dateString = `${commentDate.getDate()} ${getMonthName(commentDate.getMonth())} ${commentDate.getFullYear()}`;
                
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-avatar">${comment.name.charAt(0).toUpperCase()}</div>
                        <div class="comment-author">${comment.name}</div>
                        <div class="comment-date">${dateString}</div>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                `;
                
                commentsList.appendChild(commentDiv);
            });
        })
        .catch((error) => {
            console.error('Yorumlar yüklenirken hata:', error);
            commentsList.innerHTML = `
                <div class="error-message">
                    <p>Yorumlar şu anda yüklenemiyor.</p>
                    <p>Lütfen daha sonra tekrar deneyin veya <a href="#contact">iletişime geçin</a>.</p>
                </div>
            `;
        });
}

// Yeni yorum ekle
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('comment-name').value.trim();
    const text = document.getElementById('comment-text').value.trim();
    const successMessage = document.getElementById('success-message');
    
    if (!name || !text) {
        alert('Lütfen adınızı ve yorumunuzu giriniz.');
        return;
    }
    
    // Firebase'e yorumu ekle
    const commentsRef = database.ref('comments');
    const newCommentRef = commentsRef.push();
    
    newCommentRef.set({
        name: name,
        text: text,
        timestamp: Date.now()
    })
    .then(() => {
        // Formu temizle
        document.getElementById('comment-form').reset();
        
        // Başarı mesajını göster
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Yorum listesini yenile
        loadCommentsFromFirebase();
    })
    .catch((error) => {
        console.error('Yorum gönderilirken hata:', error);
        alert('Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    });
});

// Ay ismini döndüren yardımcı fonksiyon
function getMonthName(monthIndex) {
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];  
    return months[monthIndex];
}
