// --- API 設定 ---
const API_BASE_URL = 'http://localhost:8082/api/v1/books';

// --- 関数定義 ---

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

/**
 * 新しい書籍データを追加します。
 * @param {object} bookData - 追加する書籍のデータオブジェクト (title, author, publish_date, isbn, description を含む)
 * @returns {Promise<object|null>} 追加された書籍データ (ID を含む)、またはエラー時に null を返します。
 */
async function addBook(bookData) {
    const apiUrl = API_BASE_URL; // API エンドポイント URL

    try {
        // fetch API を使用して POST リクエストを送信
        const response = await fetch(apiUrl, {
            method: 'POST', // HTTP メソッドを POST に設定
            headers: {
                'Content-Type': 'application/json', // リクエストボディが JSON 形式であることを指定
                'Accept': 'application/json' // レスポンスとして JSON を期待することを指定
            },
            body: JSON.stringify(bookData) // JavaScript オブジェクトを JSON 文字列に変換してボディに設定
        });

        // レスポンスが正常かどうかを確認
        if (!response.ok) {
            // エラーレスポンスの場合、可能な限りエラーメッセージを取得
            let errorBody = '不明なエラー';
            try {
                errorBody = await response.text(); // テキストとしてエラーボディを読み取る試み
            } catch (e) {
                // ボディの読み取りに失敗した場合
                console.error('エラーボディの読み取りに失敗:', e);
            }
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }

        // 成功した場合、レスポンスボディを JSON として解析 (通常、新しく作成されたリソースが返される)
        const newBook = await response.json();
        console.log('書籍の追加に成功しました:', newBook);
        return newBook; // 追加された書籍データを返す
    } catch (error) {
        // エラーが発生した場合の処理
        console.error('書籍の追加に失敗しました:', error);
        return null; // エラーを示すために null を返す
    }
}

/**
 * 指定された ID の書籍データを取得します。
 * @param {number|string} bookId - 取得したい書籍の ID
 * @returns {Promise<object|null>} 取得した書籍データ、または見つからない/エラー時に null を返します。
 */
async function getBookById(bookId) {
    // テンプレートリテラルを使用して URL に書籍 ID を埋め込む
    const apiUrl = `${API_BASE_URL}/${bookId}`;

    try {
        // fetch API を使用して GET リクエストを送信
        const response = await fetch(apiUrl);

        // レスポンスが正常かどうかを確認
        if (!response.ok) {
            // 404 Not Found の場合は特別なメッセージを出力
            if (response.status === 404) {
                console.warn(`ID ${bookId} の書籍は見つかりませんでした。`);
                return null; // 見つからなかったことを示すために null を返す
            }
            // その他のエラーの場合はエラーをスロー
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // レスポンスボディを JSON として解析
        const book = await response.json();
        console.log(`取得した書籍 (ID: ${bookId}):`, book);
        return book; // 取得した書籍データを返す
    } catch (error) {
        // エラーが発生した場合の処理
        console.error(`書籍 (ID: ${bookId}) の取得に失敗しました:`, error);
        return null; // エラーを示すために null を返す
    }
}

/**
 * 指定された ID の書籍データを更新します。
 * @param {number|string} bookId - 更新したい書籍の ID
 * @param {object} updatedData - 更新するデータを含むオブジェクト (更新したいフィールドのみ、または全フィールド)
 * @returns {Promise<object|null>} 更新された書籍データ、またはエラー時に null を返します。
 */
async function updateBook(bookId, updatedData) {
    const apiUrl = `${API_BASE_URL}/${bookId}`; // API エンドポイント URL

    try {
        // fetch API を使用して PUT リクエストを送信 (API 設計によっては PATCH の場合もあります)
        const response = await fetch(apiUrl, {
            method: 'PUT', // HTTP メソッドを PUT に設定
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedData) // 更新データを JSON 文字列に変換
        });

        // レスポンスが正常かどうかを確認
        if (!response.ok) {
            let errorBody = '不明なエラー';
            try {
                errorBody = await response.text();
            } catch (e) {
                console.error('エラーボディの読み取りに失敗:', e);
            }
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }

        // 成功した場合、レスポンスボディを JSON として解析 (通常、更新されたリソースが返される)
        const updatedBook = await response.json();
        console.log(`書籍 (ID: ${bookId}) の更新に成功しました:`, updatedBook);
        return updatedBook; // 更新された書籍データを返す
    } catch (error) {
        // エラーが発生した場合の処理
        console.error(`書籍 (ID: ${bookId}) の更新に失敗しました:`, error);
        return null; // エラーを示すために null を返す
    }
}

/**
 * 指定された ID の書籍データを削除します。
 * @param {number|string} bookId - 削除したい書籍の ID
 * @returns {Promise<boolean>} 削除が成功した場合は true、失敗した場合は false を返します。
 */
async function deleteBook(bookId) {
    const apiUrl = `${API_BASE_URL}/${bookId}`; // API エンドポイント URL

    try {
        // fetch API を使用して DELETE リクエストを送信
        const response = await fetch(apiUrl, {
            method: 'DELETE' // HTTP メソッドを DELETE に設定
        });

        // レスポンスが正常 (200 OK または 204 No Content) かどうかを確認
        // DELETE 操作では、成功時にボディがない 204 No Content が返されることが一般的です
        if (!response.ok && response.status !== 204) {
            let errorBody = '不明なエラー';
            try {
                // エラーメッセージがあるかもしれないので読み取りを試みる
                errorBody = await response.text();
            } catch (e) {
                console.error('エラーボディの読み取りに失敗:', e);
            }
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
        }

        // 成功メッセージをコンソールに出力
        console.log(`書籍 (ID: ${bookId}) の削除に成功しました。`);
        // 削除が成功したことを示すために true を返す
        return true;
    } catch (error) {
        // エラーが発生した場合の処理
        console.error(`書籍 (ID: ${bookId}) の削除に失敗しました:`, error);
        // 削除が失敗したことを示すために false を返す
        return false;
    }
}

// --- 関数呼び出し例 ---

// すべての書籍を取得
getAllBooks();

// 新しい書籍を追加する例 (コメントアウトされています)
/*
const newBookData = {
  title: '新しい日本の小説',
  author: '新しい著者',
  publish_date: '2025-04-21', // バックエンドが期待する日付形式に注意
  isbn: '9781234567890', // 13桁のISBN
  description: 'これはテスト用の新しい書籍の説明です。'
};
addBook(newBookData);
*/

// ID を指定して書籍を取得する例 (ID: 5 が存在すると仮定)
// getBookById(5);

// 書籍情報を更新する例 (ID: 5 が存在すると仮定)
/*
const bookUpdates = {
  description: '更新された書籍の説明文です。',
  publish_date: '2024-01-01' // 出版日を更新
  // 更新したいフィールドのみ、または API の要件に応じて全フィールドを指定
};
updateBook(5, bookUpdates);
*/

// 書籍を削除する例 (ID: 10 が存在すると仮定、実行するにはコメントアウトを解除)
// deleteBook(10);

