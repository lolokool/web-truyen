# Các bước chạy server:
- Yêu cầu: 
    + Phải cài đặt Nodejs (link tải: https://nodejs.org/en) - Version 20.2.0 Current
    + Phải có MySQL (link tải: https://dev.mysql.com/downloads/workbench/). Hướng dẫn cài: https://drive.google.com/file/d/1JewWgYRPuQ-JyOFSoSprYxNjKyyxK_iY/view?usp=sharing

- Chạy lệnh call API:
B1: Mở command line (hoặc git bash) và cd vào folder server
B2: chạy lệnh ` npm install `.
B3: Chạy lệnh ` npm run start `
B4: Hiện ra bảng thông báo dứoi command line: ` Server started at http://localhost:8888 Connected!!! ` có nghĩa là connect thành công.

- Cài DB của MySql:
B1: Mở file ` DB_Product.sql ` và chạy script.
B2: Bôi đen toàn bộ và chạy lệnh ` Execute ` trong mysql.
B3: Mở và kiểm tra DB ` ProductManagement `.

- Import PostMan:
B1: Mở PostMan và Click Vào Button Import.
B2: Kéo hoặc up file ` VTI_API_Package1.json ` trong folder server vào.
B3: Mở folder VTI và run thử (trước khi gọi postman thì phải chạy server).