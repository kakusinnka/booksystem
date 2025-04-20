// --- API 設定 ---
const API_BASE_URL = 'http://localhost:8082/api/v1/books';

// --- 関数定義 ---
// --- DOM 要素の参照 ---
const bookListBody = document.getElementById('book-list-body');

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

// --- 書籍リストを表示する関数 (HTML構造に合わせて修正) ---
function displayBooks(books) {
    bookListBody.innerHTML = ''; // 既存の行をクリア

    if (!books || books.length === 0) {
        const row = bookListBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 4; // 列数に合わせて修正
        cell.textContent = '登録されている書籍はありません。';
        cell.style.textAlign = 'center';
    } else {
        books.forEach(book => {
            // APIが返すデータに 'id' が含まれていることを確認してください
            if (book.id === undefined) {
                console.warn('書籍データに ID が含まれていません:', book);
                // IDがないデータはスキップするか、エラー表示するなど検討
                // continue; // このループの反復をスキップする場合
            }

            const row = bookListBody.insertRow();

            // 書名セル
            row.insertCell().textContent = book.title || '-';
            // 著者セル
            row.insertCell().textContent = book.author || '-';
            // ISBNセル
            row.insertCell().textContent = book.isbn || '-';

            // 操作セル
            const actionsCell = row.insertCell();
            actionsCell.classList.add('actions'); // CSSクラスを追加

            // 詳細ボタン (<a> タグを使用し、IDをパラメータで渡す)
            const detailLink = document.createElement('a');
            detailLink.href = `book_detail.html?id=${book.id}`; // 詳細ページのURL + ID
            detailLink.textContent = '詳細';
            detailLink.classList.add('button-like'); // 必要であればボタン風スタイルを適用
            detailLink.style.marginRight = '5px'; // ボタン間のスペース
            // detailLink.target = "_blank"; // 新しいタブで開く場合
            actionsCell.appendChild(detailLink);

            // 編集ボタン (<a> タグを使用し、IDをパラメータで渡す)
            const editLink = document.createElement('a');
            editLink.href = `book_edit.html?id=${book.id}`; // 編集ページのURL + ID
            editLink.textContent = '編集';
            editLink.classList.add('button-like');
            editLink.style.marginRight = '5px';
            actionsCell.appendChild(editLink);

            // 削除ボタン
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '削除';
            deleteButton.onclick = async () => {
                // 削除確認ダイアログ
                if (confirm(`書籍「${book.title}」(ID: ${book.id}) を本当に削除しますか？`)) {
                    try {
                        // 削除処理を実行
                        const success = await deleteBook(book.id);
                        if (success) {
                            alert('書籍を削除しました。リストを更新します。');
                            // 削除成功後、リストを再読み込みして表示を更新
                            loadAndDisplayBooks(); // 再読み込み関数を呼び出す
                        } else {
                            alert('書籍の削除に失敗しました。');
                        }
                    } catch (error) {
                        // deleteBook内でエラーが再スローされた場合
                        console.error('削除処理中にエラー:', error);
                        alert(`削除処理中にエラーが発生しました: ${error.message}`);
                    }
                }
            };
            actionsCell.appendChild(deleteButton);
        });
    }

}

// --- ページ読み込み完了時の処理 ---
document.addEventListener('DOMContentLoaded', async () => {
    const books = await getAllBooks();
    displayBooks(books); // ページ読み込み時に書籍リストを取得・表示
});