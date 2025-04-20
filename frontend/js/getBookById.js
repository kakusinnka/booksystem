/**
 * 書籍IDに基づいて書籍データを非同期で取得します。
 * @param {number|string} id 取得する書籍のID。
 * @returns {Promise<object>} Promiseオブジェクト。成功時には書籍オブジェクトに解決され、失敗時にはエラーメッセージと共に拒否されます。
 * @throws {Error} ネットワークリクエストが失敗した場合、またはサーバーがエラーステータスコード（例：404 Not Found）を返した場合。
 */
async function getBookById(id) {
    // APIエンドポイントのURL。ローカルホストとポートが正しいことを確認してください。
    const apiUrl = `http://localhost:8082/api/v1/books/${id}`;
    console.log(`書籍を取得中、ID: ${id}、URL: ${apiUrl}`);

    try {
        // GETリクエストを送信
        const response = await fetch(apiUrl);

        // HTTPレスポンスステータスコードを確認
        if (!response.ok) {
            // ステータスコードが2xxでない場合 (例: 404, 500)
            if (response.status === 404) {
                // 404 Not Found を特別に処理
                throw new Error(`ID ${id} の書籍が見つかりませんでした (404 Not Found)`);
            } else {
                // その他のエラーステータスコード
                // サーバーが返した可能性のあるエラーメッセージテキストを取得しようとします
                const errorText = await response.text();
                throw new Error(`書籍の取得に失敗しました。ステータスコード: ${response.status}, 情報: ${errorText || response.statusText}`);
            }
        }
        // レスポンスが成功した場合 (ステータスコード 2xx)、JSONデータを解析
        const bookData = await response.json();
        console.log("書籍データの取得に成功:", bookData);
        return bookData; // 取得した書籍オブジェクトを返す

    } catch (error) {
        // ネットワークエラー（fetch自体の失敗）または上記でスローされたエラーをキャッチ
        console.error('書籍取得中にエラーが発生しました:', error);
        // エラーを再スローし、呼び出し元が処理できるようにします
        throw error;
    }
}

// --- ページの読み込み完了後に実行 ---
document.addEventListener('DOMContentLoaded', async () => {
    // DOM要素への参照を取得
    const bookTitleEl = document.getElementById('book-title');
    const bookAuthorEl = document.getElementById('book-author');
    const bookPublishDateEl = document.getElementById('book-publish-date');
    const bookIsbnEl = document.getElementById('book-isbn');
    const bookSummaryEl = document.getElementById('book-summary');

    // 1. URLから書籍IDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id'); // `?id=xxx` から値を取得

    if (!bookId) {
        // URLにIDがない場合
        console.warn('URLに書籍IDが含まれていません。');
        // 必要であれば、ここでエラーメッセージを表示するなどの処理を追加できます。
        // 例: errorMessageDiv.textContent = 'URLに書籍IDが必要です。'; errorMessageDiv.style.display = 'block';
        return; // 実行を停止
    }

    // 2. APIを呼び出してデータを取得
    try {
        const book = await getBookById(bookId);

        // 3. HTMLの内容を更新
        // バックエンドデータにフィールドがない場合に備えてデフォルト値を提供
        bookTitleEl.textContent = book.title || 'タイトルなし';
        bookAuthorEl.textContent = book.author || '著者不明';
        // バックエンドが 'YYYY-MM-DD' 形式の日付を返すと仮定
        bookPublishDateEl.textContent = book.publishDate || '日付不明';
        bookIsbnEl.textContent = book.isbn || 'ISBNなし';
        // 注意: HTMLのIDは 'book-summary' ですが、取得するプロパティは 'book.description' になっています。
        // バックエンドのBookクラスのフィールド名に合わせてください。ここでは 'description' を使用します。
        bookSummaryEl.textContent = book.description || '概要情報なし';

        // 4. コンテンツを表示し、ローディングインジケーターを非表示にする (該当する要素があれば)
        // 例: loadingIndicator.style.display = 'none';
        // 例: bookDetailsContent.style.display = 'block';

    } catch (error) {
        // 5. データ取得中に発生したエラーを処理
        console.error('書籍情報の読み込みに失敗しました:', error.message);
        // 必要であれば、ここでユーザーにエラーメッセージを表示します。
        // 例: errorMessageDiv.textContent = `読み込みエラー: ${error.message}`; errorMessageDiv.style.display = 'block';
        // 例: bookDetailsContent.style.display = 'none'; // エラー時はコンテンツを隠す
    }
});
