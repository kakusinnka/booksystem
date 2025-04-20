// --- API 設定 ---
const API_BASE_URL = 'http://localhost:8082/api/v1/books';

// --- 関数定義 ---
// --- DOM 要素の参照 ---
const bookTable = document.getElementById('book-table');
const bookListBody = document.getElementById('book-list-body');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const addBookForm = document.getElementById('add-book-form'); // 追加フォーム
const addBookMessage = document.getElementById('add-book-message'); // 追加メッセージ表示用

/**
 * すべての書籍データを取得します。
 * @returns {Promise<Array|null>} 書籍データの配列、またはエラー時に null を返します。
 */
async function getAllBooks() {
    const apiUrl = API_BASE_URL; // API エンドポイント URL

    try {
        // fetch API を使用して GET リクエストを送信
        const response = await fetch(apiUrl);

        // レスポンスが正常 (ステータスコード 200-299) かどうかを確認
        if (!response.ok) {
            // エラーレスポンスの場合はエラーをスロー
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // レスポンスボディを JSON として解析
        const books = await response.json();
        console.log('取得したすべての書籍:', books); // 取得したデータをコンソールに出力
        return books; // 書籍データの配列を返す
    } catch (error) {
        // エラーが発生した場合の処理
        console.error('すべての書籍の取得に失敗しました:', error);
        // ここでユーザー向けのエラー表示などの処理を追加できます
        return null; // エラーを示すために null を返す
    }
}

getAllBooks();