package com.visceb.backstage.controller;
import com.visceb.backstage.entity.Book;
import org.apache.catalina.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.visceb.backstage.dao.UserRepository;
import com.visceb.backstage.entity.Users;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author zy
 * @description
 * @date 2020/11/19 19:26
 */
@RestController
@RequestMapping("users")
@CrossOrigin()
public class UserController {
    @Autowired
    private UserRepository userrepository;

    @RequestMapping(value ="/login", method = RequestMethod.POST)
    @ResponseBody
    public int  login(@RequestBody Map<String, String> user) {
        Users thisUser = userrepository.findByUserName(user.get("userName"));
        if(thisUser == null){
            return 1;
        }
        else{
            if (user.get("password").equals(thisUser.getPassWord())) {
                if(user.get("identity").equals(thisUser.getIdentity()))
                {
                    if(user.get("identity").equals("0"))
                        return 2;
                    else
                        return 3;
                }
                else
                {
                    return 4;
                }
            }
            else {
                return 5;
            }
        }
    }

    @RequestMapping("/isDuplicate")
    @ResponseBody
    public String isDuplicate(String user_name) {
        Users user = userrepository.findByUserName(user_name);
        if (user == null) {
            return "true";
        }
        else {
            return "false";
        }
    }

    @RequestMapping(value ="/signin", method = RequestMethod.GET)
    @ResponseBody
//    public Users signIn(@RequestBody Users user) {
//        System.out.println(user.getPassWord());
//        System.out.println(userrepository.save(user));
//        return userrepository.save(user);
//    }
    public Users signIn(@RequestBody Users user) {
        System.out.println(user.getPassWord());
        Users name=userrepository.findByUserName(user.getUserName());
        String c_name = name.getUserName();
        if(c_name==null){
            return userrepository.save(user);
        }
        return null;
    }

    @RequestMapping("/initUser")
    public List<Users> initUser(){
        List<Users> users = userrepository.findAll();
        // System.out.println(users.get(0));
        return users;
    }
    @RequestMapping("/isIdentity")
    @ResponseBody
    public List<Users> isIdentity(String user_identity) {
        List<Users> user1 = userrepository.findAllByIdentity(user_identity);
        return user1;
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public Users addUser(@RequestBody Users b) {
        Users user = userrepository.save(b);
        return user;
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    @Transactional
    public int deleteUserByName(@RequestBody Map<String,String> name) {
        System.out.println(name.get("userName"));
        int users=userrepository.deleteByUserName(name.get("userName").toString());
        return users;
    }

    @RequestMapping(value = "/searchByUserName",method = RequestMethod.GET)
    public  List<Users> searchByUserName(String userName){
        System.out.println("userName "+userName);
        List<Users> nameUser =userrepository.findAllByUserName(userName);
        System.out.println("nameUser "+nameUser);
        return nameUser;
    }
}

