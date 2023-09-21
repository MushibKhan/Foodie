/*
 * Author : Mushib Khan
 * Date : 04-05-2023
 * Created with : IntelliJ IDEA Community Edition
 */

package com.niit;

import com.niit.domain.User;
import com.niit.exception.UserAlreadyExistsException;
import com.niit.exception.UserNotFoundException;
import com.niit.repository.UserRepository;
import com.niit.service.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTests {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;
    private User user;
    @BeforeEach
    void setUp() {
        user = new User("ayazkhan110903@gmail.com","123456789","kl");
    }

    @AfterEach
    void tearDown() {
        user = null;
    }
    @Test
    public void testAddUser() throws UserAlreadyExistsException {
        // Arrange
        when(userRepository.findById(any())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(user);
        // Act
        User result = userService.addUser(user);
        // Assert
        assertEquals(user, result);
        verify(userRepository, times(1)).findById(anyString());
        verify(userRepository, times(1)).save(any(User.class));
    }
    @Test
    public void testAddUserThrowsUserAlreadyExistsException() {
        // Arrange

        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));

        // Act and Assert
        assertThrows(UserAlreadyExistsException.class, () -> userService.addUser(user));
        verify(userRepository, times(1)).findById(anyString());
        verify(userRepository, times(0)).save(any(User.class));
    }
    @Test
    public void testLoginUser() throws UserNotFoundException {
        // Arrange
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));
        // Act
        User result = userService.loginUser(user);
        // Assert
        assertEquals(user, result);
        verify(userRepository, times(2)).findById(anyString());
    }
    @Test
    public void testLoginUserThrowsUserNotFoundException() {
        // Arrange

        when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(UserNotFoundException.class, () -> userService.loginUser(user));
        verify(userRepository, times(1)).findById(anyString());
    }
}
