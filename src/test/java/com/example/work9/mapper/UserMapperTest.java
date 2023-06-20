package com.example.work9.mapper;

import com.example.work9.entity.User;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DBRider
@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserMapperTest {
    @Autowired
    UserMapper userMapper;

    @Test
    @DataSet(value = "datasets/names.yml")
    @Transactional
    void 全てのユーザーが取得できること() {
        List<User> users = userMapper.findAll();
        assertThat(users)
                .hasSize(3)
                .contains(
                        new User(1, "tanaka"),
                        new User(2, "yamada"),
                        new User(3, "suzuki")
                );
    }

    @Test
    @DataSet(value = "datasets/empty.yml")
    @Transactional
    void ユーザーが存在しないときは空のリストを返すこと() {
        List<User> users = userMapper.findAll();
        assertThat(users).isEmpty();
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @Transactional
    void 指定したidのユーザーが取得できること() {
        Optional<User> users = userMapper.findById(1);
        assertThat(users).contains(new User(1, "tanaka"));
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @Transactional
    public void 指定したidのユーザーが存在しない時空のOptionalを返すこと() {
        Optional<User> users = userMapper.findById(99);
        assertThat(users).isEmpty();
    }
}
