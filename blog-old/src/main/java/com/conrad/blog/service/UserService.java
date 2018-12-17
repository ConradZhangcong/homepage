package com.conrad.blog.service;

import com.conrad.blog.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 用户服务接口
 */
public interface UserService {

    // 新增、编辑、保存用户
    User saveOrUpdateUser(User user);

    // 注册用户
    User registerUser(User user);

    // 删除用户
    void removeUser(Long id);

    // 根据id获取用户
    User getUserById(Long id);

    // 根据用户名进行分页模糊查询
    Page<User> listUserByNameLike(String name, Pageable pageable);

    void insertUsers();

    void deleteUserList(String[] str);
}
