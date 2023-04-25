package com.visceb.backstage.controller;

import com.visceb.backstage.dao.AuthorRepository;
import com.visceb.backstage.dao.BookRepository;
import com.visceb.backstage.dao.PressRepository;
import com.visceb.backstage.entity.Author;
import com.visceb.backstage.entity.Book;
import com.visceb.backstage.entity.Press;
import com.visceb.backstage.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 32023
 * @description
 * @date 2020/10/23 15:48
 */
@RestController
@RequestMapping("book")
@CrossOrigin()
public class BookController {
    @Autowired
    private BookService bookSer;
    @Autowired
    private BookRepository bookrepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private PressRepository pressRepository;

   @RequestMapping(value = "/addBook", method = RequestMethod.POST)
   public Book addBook(@RequestBody Book b) {
       Book book = bookrepository.save(b);
       return book;
   }

    @RequestMapping(value="/deleteBook", method = RequestMethod.POST)
    @Transactional
    public int deleteBookByName(@RequestBody Map<String, String> name) {
        System.out.println(name.get("bookName"));
        int book = bookrepository.deleteByBookName(name.get("bookName").toString());
        return book;
    }

    @RequestMapping("/findByGrade")
    @ResponseBody
    public List findByGrade(String grade) {
        return bookrepository.findAllByIsRecom(grade);
    }

    @RequestMapping(value ="/searchByBookName", method = RequestMethod.GET)
    public List searchByBookName(String bookName){
        Book nameBook = bookrepository.findByBookName(bookName);
        System.out.println("书籍"+nameBook.getBookName());
        System.out.println("书籍"+nameBook.getBookIntro());
        System.out.println("书籍"+nameBook.getBookEmotion());
        String AuthorId = nameBook.getAuthorId();
        String BookName = nameBook.getBookName();
       return Search(BookName,AuthorId);
    }

    @RequestMapping(value ="/searchBooksByIsbn", method = RequestMethod.GET)
    public List searchBooksByIsbn(Long isbn){
        Book isbnBook = bookrepository.findByBook_isbn(isbn);
        String AuthorId = isbnBook.getAuthorId();
        String BookName = isbnBook.getBookName();
        return Search(BookName,AuthorId);
    }

    @RequestMapping("/GetLikeBooks")
    @ResponseBody
    public List GetLikeBooks(String emotions) {
        List<Book> books = bookrepository.findLikeEmotionBooks(emotions);
        for (int i = 0; i < books.size(); i++) {
            String pressname = pressRepository.findByPress_id(books.get(i).getPressId());
            books.get(i).setBookPicture(pressname);
        }
        return books;
    }

    @RequestMapping(value ="/searchBookByIsbn", method = RequestMethod.GET)
    public Book searchBookByIsbn(Long isbn){
        Book isbnBook = bookrepository.findByBook_isbn(isbn);
        return isbnBook;
    }

    @RequestMapping(value ="/search", method = RequestMethod.GET)
    @ResponseBody
    public List  Search(String searchInfo,String searchAuthorId){
        List searchResult = new ArrayList();

        Book searchBook = bookrepository.findByBookNameAndAuthorId(searchInfo, searchAuthorId);
        String authorname = authorRepository.findByAuthor_id(searchBook.getAuthorId());
        String pressname = pressRepository.findByPress_id(searchBook.getPressId());
        searchBook.setTypeId(pressname);
        searchBook.setBookPicture(authorname);
        if(searchBook == null) {
            System.out.println("1111111111");
            String answer="暂无查询信息";
            searchResult.add(answer);
            return searchResult;
        }
        String AuthorId = searchBook.getAuthorId();

        List<Book> sameAuthor = bookrepository.findAllByAuthorId(AuthorId);
        List<Book> samePress = bookrepository.findAllByPressId(searchBook.getPressId());
        List<Book> sameEmotion = bookrepository.findAllByBookEmotion(searchBook.getBookEmotion());
        searchResult.add(searchBook);
        searchResult.add(sameAuthor);
        searchResult.add(sameEmotion);
        searchResult.add(samePress);
        return searchResult;
    }
//    @RequestMapping("/getEmbeddings")
//    public void getEmbeddings() {
//        List<Map<String, String>> corpus = bookSer.getCorpus();
//        bookSer.getEmbeddings(corpus);
//    }
    @RequestMapping("/initBook")
    public List<Book> initBook(){
        List<Book> books = bookrepository.findAll();
        //System.out.println(books.get(0));
        return books;
    }
    public void createBook() {

    }
}
