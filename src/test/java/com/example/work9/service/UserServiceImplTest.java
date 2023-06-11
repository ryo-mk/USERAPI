package com.example.work9.service;

import com.example.work9.entity.User;
import com.example.work9.exception.ResourceNotFoundException;
import com.example.work9.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userServiceImpl;

    @Mock
    UserMapper userMapper;

    @Test
    public void 全てのユーザーが取得できること() {
        List<User> user = List.of(
                new User(1, "tanaka"),
                new User(2, "suzuki"),
                new User(3, "yamada"));
        doReturn(user).when(userMapper).findAll();
        List<User> actual = userServiceImpl.findAll();
        assertThat(actual).isEqualTo(user);
        verify(userMapper, times(1)).findAll();
    }

    @Test
    public void 存在するユーザーのidを指定した時に正常にユーザーが返されること() {
        doReturn(Optional.of(new User(1, "tanaka"))).when(userMapper).findById(1);
        User actual = userServiceImpl.findUser(1);
        assertThat(actual).isEqualTo(new User(1, "tanaka"));
        verify(userMapper, times(1)).findById(1);
    }

    @Test
    public void 存在しないidを指定した時に例外がスローされること() {
        doReturn(Optional.empty()).when(userMapper).findById(99);

        assertThatThrownBy(() -> userServiceImpl.findUser(99))
                .isInstanceOfSatisfying(ResourceNotFoundException.class, e -> {
                    assertThat(e.getMessage()).isEqualTo("id:99,resource not found");
                });
        verify(userMapper, times(1)).findById(99);
    }

}
