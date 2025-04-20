package com.haozh.booksystem.service;

import org.springframework.stereotype.Service;

import com.haozh.booksystem.entity.Book;
import com.haozh.booksystem.repository.BookRepository;

import java.util.List;

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
}
