package com.visceb.backstage.service;

import com.visceb.backstage.dao.BookRepository;
import com.visceb.backstage.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zy
 * @description
 * @date 2020/12/18 16:53
 */
@Service
public class BookService {
    @Autowired
    private BookRepository bookrepository;

    public List<Map<String, String>> getGradeBooks(String grade) {
        List<Book> books = bookrepository.findByIsRecom(grade);
        List<Map<String, String>> gradeBooks = new ArrayList<>();
        for (int i = 0; i < books.size(); ++i) {
            Map<String, String> item = new HashMap<String,String>();
            item.put("bookName", books.get(i).getBookName());
            item.put("emotion", books.get(i).getBookEmotion());
            item.put("grade", books.get(i).getIsRecom());
            gradeBooks.add(item);
        }
        return gradeBooks;
    }


    public List<Map<String, String>> getGradeEmotionBook(List<Map<String, String>> gradeBooks) {
        List<Map<String, String>> emotion = new ArrayList<>();
        for (int i = 0; i < gradeBooks.size(); ++i) {

        }
        return emotion;
    }


    public List<Map<String, String>> getCorpus() {
        List<Book> books = bookrepository.findAll();
        List<Map<String, String>> corpus = new ArrayList<>();

        for (int i = 0; i < books.size(); ++i) {
            Map<String, String> item = new HashMap<String, String>();
            item.put("name", books.get(i).getBookName());
            item.put("intro", books.get(i).getBookIntro());
            corpus.add(item);
        }
        return corpus;
    }

    public List<Map<String, String>> getEmbeddings(List<Map<String, String>> corpus) {
        String exe = "python";
        String command = "F:\\code\\Embedding\\book\\doc2vec_all.py";
//        String argv1 = corpus.toString();
//        String argv2 = "4";
        String[] cmdArr = new String[] {exe, command};
        try {
            Process process = Runtime.getRuntime().exec(cmdArr);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            process.waitFor();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return corpus;
    }


    public static String decodeUnicode(final String dataStr) {
        int start = 0;
        int end = 0;
        final StringBuffer buffer = new StringBuffer();
        while (start > -1) {
            end = dataStr.indexOf("\\u", start + 2);
            String charStr = "";
            if (end == -1) {
                charStr = dataStr.substring(start + 2, dataStr.length());
            } else {
                charStr = dataStr.substring(start + 2, end);
            }
            char letter = (char) Integer.parseInt(charStr, 16); // 16进制parse整形字符串。
            buffer.append(new Character(letter).toString());
            start = end;
        }
        return buffer.toString();
    }
}
