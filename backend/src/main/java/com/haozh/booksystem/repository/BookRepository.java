package com.haozh.booksystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.haozh.booksystem.entity.Book;
import java.util.List;

/**
 * Book エンティティのリポジトリインターフェース。
 * JpaRepository を継承して、基本的な CRUD 操作、ページング、およびソート機能を利用します。
 *
 * @param Book エンティティの型
 * @param Long プライマリキーの型
 */
@Repository // これが Spring 管理のリポジトリ Bean であることを示します (任意ですが推奨)
public interface BookRepository extends JpaRepository<Book, Long> {

    // --- Spring Data JPA はメソッド名に基づいてクエリを自動生成します ---

    /**
     * 書籍名で書籍を検索します (完全一致)。
     * 
     * @param title 書籍名
     * @return 一致する書籍のリスト (空の場合があります)
     */
    List<Book> findByTitle(String title);

    /**
     * 書籍名をあいまい検索します (大文字小文字を区別しない)。
     * 
     * @param keyword 書籍名に含まれるキーワード
     * @return 一致する書籍のリスト (空の場合があります)
     */
    List<Book> findByTitleContainingIgnoreCase(String keyword);

}
