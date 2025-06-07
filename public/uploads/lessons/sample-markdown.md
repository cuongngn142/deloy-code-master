# Hướng dẫn lập trình Python cơ bản

## 1. Giới thiệu về Python

Python là một ngôn ngữ lập trình **mạnh mẽ** và *dễ học*. Nó được sử dụng rộng rãi trong:

- Phát triển web
- Khoa học dữ liệu
- Trí tuệ nhân tạo
- Tự động hóa

## 2. Cú pháp cơ bản

### 2.1 Variables và Data Types

```python
# Khai báo biến
name = "Trần Anh"
age = 25
height = 1.75
is_student = True

# In ra màn hình
print(f"Tên: {name}, Tuổi: {age}")
```

### 2.2 Conditional Statements với tiếng Việt

```python
# Điều kiện với ký tự tiếng Việt
tuổi = 25
tên = "Nguyễn Văn Á"

if tuổi >= 18:
    print(f"Chào {tên}! Bạn đã trưởng thành")
    print(">>> Bạn có thể lái xe và bỏ phiếu")
elif tuổi >= 13:
    print(">>> Bạn là thiếu niên")
else:
    print(">>> Bạn còn nhỏ")

# Sử dụng các ký tự đặc biệt
special_chars = ">>>, <<<, -->, <--, ===, !==, +=, -="
print(f"Ký tự đặc biệt: {special_chars}")
```

### 2.3 Working với Unicode và tiếng Việt

```python
# Xử lý chuỗi tiếng Việt
câu_nói = "Xin chào! Tôi là một lập trình viên."
từ_khóa = ["Python", "JavaScript", "C++", "C#"]

# In ra với các ký tự đặc biệt
print("=" * 50)
print(f">>> {câu_nói}")
print(">>> Ngôn ngữ yêu thích:")
for i, ngôn_ngữ in enumerate(từ_khóa, 1):
    print(f"    {i}. {ngôn_ngữ}")
print("=" * 50)
```

## 3. Loops (Vòng lặp)

### For Loop

```python
# Lặp qua danh sách
fruits = ["táo", "cam", "chuối", "nho"]
for fruit in fruits:
    print(f"Tôi thích ăn {fruit}")

# Lặp với range
for i in range(5):
    print(f"Số: {i}")
```

### While Loop

```python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
```

## 4. Functions với ký tự tiếng Việt

```python
def chào_hỏi(tên, lời_chào="Xin chào"):
    """
    Hàm chào hỏi với tiếng Việt
    
    Args:
        tên (str): Tên người được chào
        lời_chào (str): Lời chào
    
    Returns:
        str: Lời chào hoàn chỉnh
    """
    # >>> Tạo message với ký tự đặc biệt
    message = f"{lời_chào}, {tên}!"
    
    # Thêm decoration
    decoration = ">>>" + "=" * len(message) + "<<<"
    
    return f"""
{decoration}
>>> {message} <<<
{decoration}
    """

# Sử dụng hàm với tiếng Việt
kết_quả = chào_hỏi("Trần Thị Ái", "Chúc mừng năm mới")
print(kết_quả)

# Test với các ký tự đặc biệt
symbols = "→ ← ↑ ↓ ≠ ≤ ≥ ± × ÷"
print(f">>> Ký tự đặc biệt: {symbols}")
```

## 5. Bảng so sánh Data Types

| Data Type | Mô tả | Ví dụ |
|-----------|-------|--------|
| `int` | Số nguyên | `42` |
| `float` | Số thực | `3.14` |
| `str` | Chuỗi | `"Hello World"` |
| `bool` | Boolean | `True`, `False` |
| `list` | Danh sách | `[1, 2, 3]` |
| `dict` | Từ điển | `{"key": "value"}` |

## 6. Tips và Best Practices

> **Lưu ý quan trọng:** Luôn viết code rõ ràng và có comment để dễ hiểu.

### Quy tắc đặt tên:
1. Sử dụng **snake_case** cho variables và functions
2. Sử dụng **PascalCase** cho classes
3. Sử dụng **UPPERCASE** cho constants

### Inline code example:
Để cài đặt package, sử dụng `pip install package_name`

---

## 7. Ví dụ với JavaScript

```javascript
// Hàm xử lý tiếng Việt trong JavaScript
function xửLýTiếngViệt(chuỗi) {
    // >>> Loại bỏ dấu tiếng Việt
    const không_dấu = chuỗi
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd');
    
    console.log(`>>> Input: ${chuỗi}`);
    console.log(`>>> Output: ${không_dấu}`);
    
    return không_dấu;
}

// Test function
const tên_tiếng_việt = "Nguyễn Thị Hương";
const kết_quả = xửLýTiếngViệt(tên_tiếng_việt);

// Arrow function với destructuring
const thông_tin = {
    tên: "Lê Văn Đức",
    tuổi: 30,
    địa_chỉ: "Hà Nội"
};

const { tên, tuổi, địa_chỉ } = thông_tin;
console.log(`>>> Tên: ${tên}, Tuổi: ${tuổi}, Địa chỉ: ${địa_chỉ}`);
```

## 8. Kết luận

Python là một ngôn ngữ tuyệt vời để bắt đầu học lập trình. Với cú pháp đơn giản và cộng đồng hỗ trợ mạnh mẽ, bạn có thể nhanh chóng tạo ra những ứng dụng thú vị.

**Chúc bạn học tập vui vẻ!** 🎉

### Liên kết hữu ích:
- [Python Official Documentation](https://docs.python.org/)
- [Python Tutorial](https://www.python.org/about/gettingstarted/)
