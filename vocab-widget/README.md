# Widget từ vựng trên màn hình khóa iPhone

Script cho app [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) (miễn phí). Mỗi lần iOS làm mới widget, màn hình khóa sẽ hiện một từ tiếng Anh kèm nghĩa tiếng Việt và câu giải thích, cùng thanh tiến độ. Không cần máy Mac hay tài khoản nhà phát triển.

## Cài đặt

1. Cài Scriptable từ App Store.
2. Mở Scriptable, bấm dấu **+**, dán toàn bộ nội dung file [`TuVung.js`](TuVung.js), đặt tên (ví dụ "Từ vựng") rồi bấm **Done**.
3. Bấm ▶ để chạy thử một lần.
4. Thêm widget từ vựng: nhấn giữ màn hình khóa → **Tùy chỉnh** → **Màn hình khóa** → chạm ô tiện ích dưới giờ → chọn **Scriptable** → chọn widget hình chữ nhật. Chạm vào widget vừa thêm và ở mục **Script** chọn "Từ vựng".
5. Thêm widget tiến độ (không bắt buộc): thêm một widget chữ nhật nữa, chọn cùng script và nhập `tiendo` vào ô **Parameter**. Widget tròn thì tự hiện vòng tiến độ, không cần nhập gì.

Widget một dòng phía trên giờ và widget ở màn hình chính (nhỏ, vừa, lớn) cũng dùng được với cùng script.

## Cách ôn

Chạm vào widget để mở app với đúng từ đang hiện. Tại đây bạn có thể:

- **Nhớ rồi**: từ lên một mức nhớ và được hẹn ôn lại sau.
- **Chưa nhớ**: từ về mức 0 và sẽ hiện lại trên màn hình khóa sớm hơn các từ khác.
- **Ôn tập 10 từ**: hiện từ trước, bấm "Xem nghĩa" rồi tự chấm Nhớ hoặc Quên.
- **Thêm từ mới**, **Danh sách từ**, **Tiến độ**, **Xem trước widget**.

Mỗi từ có mức nhớ từ 0 đến 5. Khoảng cách ôn lại lần lượt là 1, 3, 7, 14 và 30 ngày. Từ đạt mức 3 được tính là đã thuộc. Tiến độ 100% nghĩa là mọi từ đều đã thuộc.

## Lưu ý

- iOS tự quyết định khi nào làm mới widget, thường cách nhau vài phút đến vài chục phút. Vì vậy từ không đổi sau mỗi lần mở máy. Sau khi bạn bấm trong app, widget cũng chỉ đổi ở lần làm mới kế tiếp.
- Widget màn hình khóa chỉ hiện một màu theo quy định của iOS, nên phần nghĩa không có màu vàng như ảnh quảng cáo. Widget màn hình chính thì có màu.
- Tiến độ được lưu trong máy, ở file `tuvung-data.json` trong thư mục của Scriptable. Nếu xóa app Scriptable thì tiến độ và các từ tự thêm sẽ mất.
- Muốn đổi bộ từ có sẵn thì sửa mảng `WORDS` ở đầu script. Các tùy chọn khác nằm ngay phía trên mảng đó: `ROTATE_MINUTES` (thời gian tối thiểu trước khi đổi từ), `SESSION_SIZE` (số từ mỗi lượt ôn), `SERIF_FONT` (dùng font có chân) và `LOCK_BACKGROUND` (thêm nền mờ sau widget).
