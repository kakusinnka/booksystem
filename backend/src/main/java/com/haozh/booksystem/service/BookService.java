package com.haozh.booksystem.service;

import org.springframework.stereotype.Service;

import com.haozh.booksystem.entity.Book;
import com.haozh.booksystem.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * すべての書籍を取得
     * 
     * @return すべての書籍のリスト
     */
    public List<Book> getAllBooks() {
        // JpaRepositoryから継承したfindAll()メソッドを直接呼び出す
        return bookRepository.findAll();
    }

    /**
     * IDに基づいて書籍を検索します。
     * 
     * @param id 書籍のID
     * @return 書籍が見つかった場合はその書籍を含む Optional、見つからない場合は空の Optional
     */
    public Optional<Book> findBookById(Long id) {
        // データベースや他のデータソースから書籍を検索する処理をシミュレートします
        // Optional.ofNullable は bookRepository.get(id) が null を返す可能性を扱います
        return bookRepository.findById(id);
    }
}
