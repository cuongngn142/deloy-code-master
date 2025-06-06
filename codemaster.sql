USE [codemasterDb]
GO
/****** Object:  Table [dbo].[BaiNop]    Script Date: 3/23/2025 1:13:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaiNop](
	[MaBaiNop] [int] IDENTITY(1,1) NOT NULL,
	[MaNguoiDung] [int] NULL,
	[MaBaiTap] [int] NULL,
	[MaNgonNgu] [int] NULL,
	[MaNguon] [nvarchar](max) NOT NULL,
	[ThoiGianNop] [datetime] NULL,
	[TrangThai] [nvarchar](50) NULL,
	[ThoiGianChay] [float] NULL,
	[BoNhoSuDung] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaBaiNop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BaiTap]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaiTap](
	[MaBaiTap] [int] IDENTITY(1,1) NOT NULL,
	[TieuDe] [nvarchar](255) NOT NULL,
	[MoTa] [nvarchar](max) NOT NULL,
	[MucDoKho] [nvarchar](50) NOT NULL,
	[MaChuDe] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiTao] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaBaiTap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BoTest]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BoTest](
	[MaTest] [int] IDENTITY(1,1) NOT NULL,
	[MaBaiTap] [int] NULL,
	[DuLieuDauVao] [nvarchar](max) NOT NULL,
	[DauRaMongDoi] [nvarchar](max) NOT NULL,
	[LaCongKhai] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaTest] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDanhSachBaiTap]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDanhSachBaiTap](
	[MaChiTiet] [int] IDENTITY(1,1) NOT NULL,
	[MaDanhSach] [int] NULL,
	[MaBaiTap] [int] NULL,
	[ThuTu] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChiTiet] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_DanhSach_BaiTap] UNIQUE NONCLUSTERED 
(
	[MaDanhSach] ASC,
	[MaBaiTap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChuDe]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChuDe](
	[MaChuDe] [int] IDENTITY(1,1) NOT NULL,
	[TenChuDe] [nvarchar](50) NOT NULL,
	[MoTa] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChuDe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TenChuDe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DanhSachBaiTap]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DanhSachBaiTap](
	[MaDanhSach] [int] IDENTITY(1,1) NOT NULL,
	[TenDanhSach] [nvarchar](255) NOT NULL,
	[MoTa] [nvarchar](500) NULL,
	[MaNguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[LaCongKhai] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaDanhSach] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KetQuaBaiNop]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KetQuaBaiNop](
	[MaKetQua] [int] IDENTITY(1,1) NOT NULL,
	[MaBaiNop] [int] NULL,
	[MaTest] [int] NULL,
	[DauRaThucTe] [nvarchar](max) NULL,
	[DatYeuCau] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaKetQua] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichSuHoatDong]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichSuHoatDong](
	[MaHoatDong] [int] IDENTITY(1,1) NOT NULL,
	[MaNguoiDung] [int] NULL,
	[MoTaHoatDong] [nvarchar](500) NULL,
	[ThoiGianHoatDong] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHoatDong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NgonNguLapTrinh]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NgonNguLapTrinh](
	[MaNgonNgu] [int] IDENTITY(1,1) NOT NULL,
	[TenNgonNgu] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNgonNgu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[TenNgonNgu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NguoiDung]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDung](
	[MaNguoiDung] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[MatKhau] [nvarchar](50) NOT NULL,
	[VaiTro] [nvarchar](50) NOT NULL,
	[NgayTao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNguoiDung] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XepHang]    Script Date: 3/23/2025 1:13:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XepHang](
	[MaXepHang] [int] IDENTITY(1,1) NOT NULL,
	[MaNguoiDung] [int] NULL,
	[DiemSo] [int] NULL,
	[HuyHieu] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaXepHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


CREATE TABLE "BaiHoc" (
	"MaBaiHoc"	INTEGER,
	"TieuDe"	TEXT NOT NULL,
	"MoTa"	TEXT,
	"DuongDanFile"	TEXT,
	"NgonNguLapTrinh"	TEXT,
	"NgayTao"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	"NgayCapNhat"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	"MaNguoiTao"	INTEGER,
	PRIMARY KEY("MaBaiHoc" AUTOINCREMENT),
	FOREIGN KEY("MaNguoiTao") REFERENCES "NguoiDung"("MaNguoiDung") ON DELETE SET NULL
);
GO
ALTER TABLE [dbo].[BaiNop] ADD  DEFAULT (getdate()) FOR [ThoiGianNop]
GO
ALTER TABLE [dbo].[BaiTap] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[BoTest] ADD  DEFAULT ((0)) FOR [LaCongKhai]
GO
ALTER TABLE [dbo].[DanhSachBaiTap] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[DanhSachBaiTap] ADD  DEFAULT ((0)) FOR [LaCongKhai]
GO
ALTER TABLE [dbo].[LichSuHoatDong] ADD  DEFAULT (getdate()) FOR [ThoiGianHoatDong]
GO
ALTER TABLE [dbo].[NguoiDung] ADD  DEFAULT (getdate()) FOR [NgayTao]
GO
ALTER TABLE [dbo].[XepHang] ADD  DEFAULT ((0)) FOR [DiemSo]
GO
ALTER TABLE [dbo].[BaiNop]  WITH CHECK ADD FOREIGN KEY([MaBaiTap])
REFERENCES [dbo].[BaiTap] ([MaBaiTap])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BaiNop]  WITH CHECK ADD FOREIGN KEY([MaNgonNgu])
REFERENCES [dbo].[NgonNguLapTrinh] ([MaNgonNgu])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BaiNop]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BaiTap]  WITH CHECK ADD FOREIGN KEY([MaChuDe])
REFERENCES [dbo].[ChuDe] ([MaChuDe])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[BaiTap]  WITH CHECK ADD FOREIGN KEY([NguoiTao])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[BoTest]  WITH CHECK ADD FOREIGN KEY([MaBaiTap])
REFERENCES [dbo].[BaiTap] ([MaBaiTap])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChiTietDanhSachBaiTap]  WITH CHECK ADD FOREIGN KEY([MaBaiTap])
REFERENCES [dbo].[BaiTap] ([MaBaiTap])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ChiTietDanhSachBaiTap]  WITH CHECK ADD FOREIGN KEY([MaDanhSach])
REFERENCES [dbo].[DanhSachBaiTap] ([MaDanhSach])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DanhSachBaiTap]  WITH CHECK ADD FOREIGN KEY([MaNguoiTao])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[KetQuaBaiNop]  WITH CHECK ADD FOREIGN KEY([MaBaiNop])
REFERENCES [dbo].[BaiNop] ([MaBaiNop])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[KetQuaBaiNop]  WITH CHECK ADD FOREIGN KEY([MaTest])
REFERENCES [dbo].[BoTest] ([MaTest])
GO
ALTER TABLE [dbo].[LichSuHoatDong]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[XepHang]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BaiNop]  WITH CHECK ADD CHECK  (([TrangThai]='Quá th?i gian' OR [TrangThai]='L?i runtime' OR [TrangThai]='L?i biên d?ch' OR [TrangThai]='Sai' OR [TrangThai]='Ðúng' OR [TrangThai]='Ðang ch?m'))
GO
ALTER TABLE [dbo].[BaiTap]  WITH CHECK ADD CHECK  (([MucDoKho]='Khó' OR [MucDoKho]='Trung Bình' OR [MucDoKho]='D?'))
GO
ALTER TABLE [dbo].[NguoiDung]  WITH CHECK ADD CHECK  (([VaiTro]='Admin' OR [VaiTro]='User'))
GO
