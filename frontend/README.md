# BOOKSYSTEM プロジェクト
## 概要
BOOKSYSTEM は、書籍の管理を簡単にするためのウェブアプリケーションです。本プロジェクトは、書籍情報の追加、編集、表示をサポートしています。

## プロジェクト構成
- **html/**
  - `book_add.html`：書籍を追加するページ
  - `book_detail.html`：書籍の詳細を表示するページ
  - `book_edit.html`：書籍情報を編集するページ
  - `book_list.html`：書籍リストを表示するページ
  - `common/`：共通のヘッダーとフッターを含むディレクトリ
- **css/**：スタイルシートを格納するディレクトリ
- **js/**
  - `loadCommonContent.js`：HTMLコンテンツを動的にロードするためのスクリプト
- **index.html**：プロジェクトのメインページ

## データベース設計
以下は、書籍情報を格納するためのデータベーステーブルの設計です。

```sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '書籍ID',
    title VARCHAR(255) NOT NULL COMMENT '書籍タイトル',
    author VARCHAR(255) NOT NULL COMMENT '著者名',
    publish_date DATE COMMENT '出版日',
    isbn VARCHAR(13) COMMENT 'ISBNコード',
    description TEXT COMMENT '書籍説明',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'レコード最終更新日時'
) COMMENT='書籍情報を格納するテーブル';
```

## 使用方法
1. リポジトリをクローンします。
2. 必要な依存関係をインストールします。
3. ローカルサーバーを起動し、ブラウザで `index.html` を開きます。

