package com.visceb.backstage.controller;

import com.visceb.backstage.dao.UserBookRepository;
import com.visceb.backstage.dao.BookRepository;
import com.visceb.backstage.entity.UserBook;
import com.visceb.backstage.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("userbook")
@CrossOrigin()
public class UserBookController {
    @Autowired
    private UserBookRepository userbookrepository;
    @Autowired
    private BookRepository bookrepository;

    @RequestMapping(value = "/saveUserBooks", method = RequestMethod.POST)
    @Transactional
    public boolean saveUserBooks(@RequestBody List<UserBook> books) {
        userbookrepository.deleteAllByUserName(books.get(0).getUserName());
        for (int i = 0; i < books.size(); i++) {
            UserBook userbook = userbookrepository.save(books.get(i));
        }
        return true;
    }

    @RequestMapping("/GetRecomBooks")
    @ResponseBody
    public List GetRecomBooks(String username) {
        List<List<Map<String,Integer>>> userNameEomtions = getUserNameEmotions(username);
        List<Map<String,Integer>> emotions = userNameEomtions.get(0);
        List<String> emotion = new ArrayList<>();
        List books = new ArrayList<>();
        Map<String, Integer> map = emotions.get(0);
        int count = 0;
        for(String k : map.keySet()){
            if(map.get(k) == 0){
                emotion.add(k);
                count ++;
            }
            if (count == 3){
                break;
            }
        }
        for(int i = 0; i < 3; i++){
            List<Book>book = bookrepository.findLikeEmotionBooks(emotion.get(i));
            books.add(emotion.get(i));
            books.add(book);
        }
        return books;
    }

    @RequestMapping("/findByGrade")
    @ResponseBody
    public List findByGrade(String grade, String username) {
        return userbookrepository.findByUserNameAndIsRecom(username,grade);
    }

    @RequestMapping("/findByUserName")
    @ResponseBody
    public boolean findByUserName(String username) {
        return userbookrepository.existsByUserName(username);
    }

    @RequestMapping("/getUserNameBooks")
    @ResponseBody
    public List getUserNameBooks(String username) {
        List searchResult = new ArrayList();
        String[] grades =new String[]{"12","34","56"};
        for(int i = 0 ; i < grades.length ; i++){
            List userbook = userbookrepository.findByUserNameAndIsRecom(username,grades[i]);
            searchResult.add(userbook);
        }
        return searchResult;
    }

    @RequestMapping("/getUserNameEmotions")
    @ResponseBody
    public List<List<Map<String,Integer>>> getUserNameEmotions(String username) {
        List<List<Map<String,Integer>>> searchResult = new ArrayList();
        String[] grades =new String[]{"12","34","56"};
        Map<String,Integer> map = new HashMap<String,Integer>();
        for(int i = 0; i < grades.length; i++) {
            List<Book> books = bookrepository.findByIsRecom(grades[i]);
            for(int k = 0; k < 20; k++) {
                String[] splitEmotion = books.get(k).getBookEmotion().split("；|;| ");
                for(String retval: splitEmotion){
                    if(map.get(retval) == null){
                        map.put(retval,0);
                    }
                }
            }
        }
        for(int i = 0; i < grades.length; i++) {
            List stemp = new ArrayList();
            List<UserBook> userbook = userbookrepository.findByUserNameAndIsRecom(username,grades[i]);
            for(int j = 0; j < userbook.size(); j++) {
                Map<String,Integer> stempMap = new HashMap<>();
                stempMap.putAll(map);
                String[] stempEmotion = userbook.get(j).getBookEmotion().split("；|;| ");
                for(String retval: stempEmotion){
                   if(stempMap.get(retval) == null){
                       map.put(retval,0);
                       stempMap.put(retval,1);
                   }else{
                       int frequency = stempMap.get(retval);
                       stempMap.put(retval,++frequency);
                   }
               }
               stempMap.put(userbook.get(j).getBookName(),-1);
               stemp.add(stempMap);
            }
            searchResult.add(stemp);
        }
        return searchResult;
    }

    @RequestMapping("/getMergeEmotions")
    @ResponseBody
    public List getMergeEmotions(String username) {
        List searchResult = new ArrayList();
        String[] grades =new String[]{"12","34","56"};

        Map<String,Integer> map1 = new HashMap<String,Integer>();
        for(int i = 0; i < grades.length; i++) {
            List<Book> books = bookrepository.findByIsRecom(grades[i]);
            for(int k = 0; k < 20; k++) {
                String[] splitEmotion = books.get(k).getBookEmotion().split("；|;| ");
                for(String retval: splitEmotion){
                    if(map1.get(retval) == null){
                        map1.put(retval,0);
                    }
                }
            }
        }

        for(int i = 0; i < grades.length; i++) {
            List<UserBook> userbook = userbookrepository.findByUserNameAndIsRecom(username,grades[i]);
            Map<String,Integer> map = new HashMap<>();
            map.putAll(map1);
            for(int j = 0; j < userbook.size(); j++) {
                String[] splitEmotion = userbook.get(j).getBookEmotion().split("；|;| ");
                for(String retval: splitEmotion){
                    if(map.get(retval) == null){
                        map1.put(retval,0);
                        map.put(retval,1);
                    }else{
                        int frequency = map.get(retval);
                        map.put(retval,++frequency);
                    }
                }
            }
            map.put("grade" + grades[i],-1);
            searchResult.add(map);
        }
        return searchResult;
    }

    @RequestMapping("/getEmotionWords")
    @ResponseBody
    public List<Map> getEmotionWords(String username) {
        List<Map> searchResult = new ArrayList();
        Map<String,Integer> map = new HashMap<String,Integer>();
        Map<String,Integer> map12 = new HashMap<String,Integer>();
        Map<String,Integer> map34 = new HashMap<String,Integer>();
        Map<String,Integer> map56 = new HashMap<String,Integer>();
        List<UserBook> userBooks = userbookrepository.findByUserName(username);
        List<UserBook> userBooks12 = userbookrepository.findByUserNameAndIsRecom(username,"12");
        List<UserBook> userBooks34 = userbookrepository.findByUserNameAndIsRecom(username,"34");
        List<UserBook> userBooks56 = userbookrepository.findByUserNameAndIsRecom(username,"56");
        for(int i = 0; i < userBooks.size(); i++){
            String[] splitEmotion = userBooks.get(i).getBookEmotion().split("；|;| ");
            for(String retval: splitEmotion){
                if(map.get(retval) == null){
                    map.put(retval,1);
                }else{
                    int frequency = map.get(retval);
                    map.put(retval,++frequency);
                }
            }
        }
        for(int i = 0; i < userBooks12.size(); i++){
            String[] splitEmotion = userBooks12.get(i).getBookEmotion().split("；|;| ");
            for(String retval: splitEmotion){
                if(map12.get(retval) == null){
                    map12.put(retval,1);
                }else{
                    int frequency = map12.get(retval);
                    map12.put(retval,++frequency);
                }
            }
        }
        for(int i = 0; i < userBooks34.size(); i++){
            String[] splitEmotion = userBooks34.get(i).getBookEmotion().split("；|;| ");
            for(String retval: splitEmotion){
                if(map34.get(retval) == null){
                    map34.put(retval,1);
                }else{
                    int frequency = map34.get(retval);
                    map34.put(retval,++frequency);
                }
            }
        }
        for(int i = 0; i < userBooks56.size(); i++){
            String[] splitEmotion = userBooks56.get(i).getBookEmotion().split("；|;| ");
            for(String retval: splitEmotion){
                if(map56.get(retval) == null){
                    map56.put(retval,1);
                }else{
                    int frequency = map56.get(retval);
                    map56.put(retval,++frequency);
                }
            }
        }
        searchResult.add(map);
        searchResult.add(map12);
        searchResult.add(map34);
        searchResult.add(map56);
        return searchResult;
    }
}