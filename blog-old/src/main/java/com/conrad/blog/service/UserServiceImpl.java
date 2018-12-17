package com.conrad.blog.service;

import com.conrad.blog.domain.User;
import com.conrad.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 用户服务接口实现
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void removeUser(Long id) {
        User user = userRepository.findById(id).get();
        userRepository.delete(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public Page<User> listUserByNameLike(String name, Pageable pageable) {
        // 模糊查询
        name = "%" + name + "%";
        Page<User> users = userRepository.findByNameLike(name, pageable);
        return users;
    }

    @Transactional
    @Override
    public void insertUsers() {
        User user1 = new User();
        user1.setEmail("test1@qq.com");
        user1.setUsername("test1");
        user1.setPassword("123456");
        userRepository.save(user1);

        User user2 = new User();
        user2.setEmail("test2@qq.com");
        user2.setUsername("test2");
        user2.setPassword("123456");
        userRepository.save(user2);

        User user3 = new User();
        user3.setEmail("test3@qq.com");
        user3.setUsername("test3");
        user3.setPassword("123456");
        userRepository.save(user3);

        User user4 = new User();
        user4.setEmail("test4@qq.com");
        user4.setUsername("test4");
        user4.setPassword("123456");
        userRepository.save(user4);

        User user5 = new User();
        user5.setEmail("test5@qq.com");
        user5.setUsername("test5");
        user5.setPassword("123456");
        userRepository.save(user5);

        User user6 = new User();
        user6.setEmail("test6@qq.com");
        user6.setUsername("test6");
        user6.setPassword("123456");
        userRepository.save(user6);

        User user7 = new User();
        user7.setEmail("test7@qq.com");
        user7.setUsername("test7");
        user7.setPassword("123456");
        userRepository.save(user7);

        User user8 = new User();
        user8.setEmail("test8@qq.com");
        user8.setUsername("test8");
        user8.setPassword("123456");
        userRepository.save(user8);

        User user9 = new User();
        user9.setEmail("test9@qq.com");
        user9.setUsername("test9");
        user9.setPassword("123456");
        userRepository.save(user9);

        User user10 = new User();
        user10.setEmail("test10@qq.com");
        user10.setUsername("test10");
        user10.setPassword("123456");
        userRepository.save(user10);

    }

    @Override
    public void deleteUserList(String[] str) {
        for(int i=0;i<str.length;i++){
            long index = Long.parseLong(str[i]);
            User user = userRepository.findById(index).get();
            userRepository.delete(user);
        }
    }
}
