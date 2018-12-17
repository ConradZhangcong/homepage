package com.conrad.blog.controller;

import com.conrad.blog.aspect.HttpAspect;
import com.conrad.blog.domain.Result;
import com.conrad.blog.domain.User;
import com.conrad.blog.repository.UserRepository;
import com.conrad.blog.service.UserService;
import com.conrad.blog.service.UserServiceImpl;
import com.conrad.blog.util.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Id;
import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    private final static Logger logger = LoggerFactory.getLogger(HttpAspect.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // 查询所有User 返回UserList
    @GetMapping(value = "/users")
    public Result<User> userList() {
        return ResultUtil.success(userRepository.findAll());
    }

    // 添加User
    @PostMapping(value = "/users")
    public Result<User> userAdd(@Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResultUtil.error(101, bindingResult.getFieldError().getDefaultMessage());
        }
        user.setEmail(user.getEmail());
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());
        return ResultUtil.success(userRepository.save(user));
    }

    // 查询User
    @GetMapping(value = "/users/{id}")
    public Result<User> userFind(@PathVariable("id") Long id) {
        return ResultUtil.success(userRepository.findById(id).get());
    }

    // 删除User
    @DeleteMapping(value = "/users/{id}")
    public Result<User> userDelete(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).get();
        userRepository.delete(user);
        return ResultUtil.success(null);
    }

    // 修改User
    @PutMapping(value = "/users/{id}")
    public Result<User> userUpdate(@Valid User user) {
        user.setId(user.getId());
        user.setEmail(user.getEmail());
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());
        return ResultUtil.success(userRepository.save(user));
    }

    // 插入10个用户
    @PostMapping(value = "users/insert")
    public void userInsert() {
        userService.insertUsers();
    }

    //删除多个用户
    @DeleteMapping(value = "")
    public void userListDelete(){

    }
}
