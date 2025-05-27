// Xử lý modal thêm chủ đề
const addTopicBtn = document.querySelector('.btn-add-topic');
const topicModal = document.getElementById('addTopicModal');
const addTopicForm = document.getElementById('addTopicForm');

addTopicBtn.addEventListener('click', () => {
  topicModal.style.display = 'block';
});

function closeTopicModal() {
  topicModal.style.display = 'none';
}

addTopicForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(addTopicForm);
  const data = {
    tenChuDe: formData.get('tenChuDe'),
    moTa: formData.get('moTa')
  };

  try {
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
      alert('Thêm chủ đề thành công!');
      location.reload();
    } else {
      alert('Có lỗi xảy ra: ' + result.message);
    }
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Có lỗi xảy ra khi thêm chủ đề');
  }
});

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
  if (event.target == topicModal) {
    closeTopicModal();
  }
}