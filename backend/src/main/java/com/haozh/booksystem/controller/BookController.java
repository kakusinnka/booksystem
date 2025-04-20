package com.haozh.booksystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haozh.booksystem.entity.Book;
import com.haozh.booksystem.service.BookService;

/**
 * 書籍に関連する HTTP リクエストを処理するコントローラー。
 */
@RestController // これが RESTful コントローラーであり、メソッドの戻り値が直接レスポンスボディに書き込まれることを示します
@CrossOrigin(origins = "http://127.0.0.1:5500")
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

    /**
     * 指定された ID に基づいて書籍情報を取得します。
     * HTTP GET リクエストを /api/v1/books/{id} にマッピングします。
     *
     * @param id URL パスから抽出された書籍の ID (例: /api/v1/books/1 の場合は 1)
     * @return 書籍オブジェクトと HTTP ステータスコードを含む ResponseEntity
     */
    @GetMapping("/{id}") // HTTP GET リクエストをこのメソッドにマッピングします。{id} はパス変数です。
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        // 1. Service レイヤーを呼び出して書籍を検索します
        Optional<Book> bookOptional = bookService.findBookById(id);

        // 2. 検索結果に基づいて ResponseEntity を構築します
        if (bookOptional.isPresent()) {
            // 書籍が見つかった場合:
            // - HTTP ステータスコード 200 OK
            // - レスポンスボディに書籍オブジェクトを設定
            Book foundBook = bookOptional.get();
            return ResponseEntity.ok(foundBook);
            // または: return new ResponseEntity<>(foundBook, HttpStatus.OK);
        } else {
            // 書籍が見つからなかった場合:
            // - HTTP ステータスコード 404 Not Found
            // - レスポンスボディは空
            return ResponseEntity.notFound().build();
            // または: return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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