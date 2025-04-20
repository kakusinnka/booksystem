package com.haozh.booksystem.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haozh.booksystem.entity.Book;
import com.haozh.booksystem.service.BookService;

/**
 * 書籍に関連する HTTP リクエストを処理するコントローラー。
 */
@RestController // これが RESTful コントローラーであり、メソッドの戻り値が直接レスポンスボディに書き込まれることを示します
@RequestMapping("/api/v1/books") // このコントローラーが処理するリクエストのベースパスを定義します
public class BookController {

    private final BookService bookService;

    /**
     * コンストラクタインジェクションを通じて BookService を注入します。
     * 
     * @param bookService ビジネスロジックサービス Bean
     */
    // コンストラクタが一つだけの場合、このアノテーションは任意です (Spring 4.3+)
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * すべての書籍リストを取得する GET リクエストを処理します。
     * HTTP GET /api/v1/books にマッピングされます。
     * 
     * @return すべての書籍リストを含む ResponseEntity。成功した場合、ステータスコードは 200 OK です。
     */
    @GetMapping // HTTP GET リクエストをこのメソッドにマッピングします
    public ResponseEntity<List<Book>> getAllBooks() {
        // サービス層を呼び出してすべての書籍を取得します
        List<Book> books = bookService.getAllBooks();
        // 書籍リストと HTTP ステータスコード 200 OK を返します
        // Spring Boot は自動的に List<Book> を JSON にシリアライズします (Jackson がクラスパスにある場合)
        return ResponseEntity.ok(books);
        // または、より簡単に List<Book> を直接返すこともできます。Spring Boot がステータスコードを処理します (デフォルトは 200 OK)
        // return books;
    }

    // --- 将来的に他のエンドポイントを追加できます ---
    // 例: 個別の書籍の取得、書籍の作成、書籍の更新、書籍の削除など
    // @GetMapping("/{id}")
    // public ResponseEntity<Book> getBookById(@PathVariable Long id) { ... }
    //
    // @PostMapping
    // public ResponseEntity<Book> createBook(@RequestBody Book book) { ... }
    //
    // @PutMapping("/{id}")
    // public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody
    // Book bookDetails) { ... }
    //
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteBook(@PathVariable Long id) { ... }

}