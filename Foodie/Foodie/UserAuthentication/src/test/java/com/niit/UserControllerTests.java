/*
 * Author : Mushib Khan
 * Date : 04-05-2023
 * Created with : IntelliJ IDEA Community Edition
 */

package com.niit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.controller.UserController;
import com.niit.domain.User;
import com.niit.security.JwtSecurityTokenGenerator;
import com.niit.service.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class UserControllerTests {
    @Mock
    UserServiceImpl userService;
    @InjectMocks
    UserController userController;
    @Mock
    private JwtSecurityTokenGenerator jwtSecurityTokenGenerator;

    @Autowired
    MockMvc mockMvc;
    private User user;
    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch (JsonProcessingException e) {
            result = "JSON processing error";
        }
        return result;
    }
    @BeforeEach
    void setUp() {
        user = new User("ayazkhan110903@gmail.com","123456789","kl");
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    void tearDown() {
        user = null;
    }
    @Test
    public void testAddUser() throws Exception {
        // Mock the service method to return the same user object
        when(userService.addUser(any(User.class))).thenReturn(user);
        // Simulate an HTTP POST request to the /userAuth/register endpoint
        mockMvc.perform(post("/userAuth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).addUser(any(User.class));

    }
    @Test
    public void testLoginUser() throws Exception {
        User loggedUser = new User();

        loggedUser.setEmailId(user.getEmailId());
        loggedUser.setPassword(user.getPassword());

        Map<String,String> token = new HashMap<>();


        when(userService.loginUser(any(User.class))).thenReturn(loggedUser);
        when(jwtSecurityTokenGenerator.tokenGenerator(any(User.class))).thenReturn(token);
        mockMvc.perform(post("/userAuth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonToString(user)))
                .andExpect(status().isAccepted()).andDo(MockMvcResultHandlers.print());
        verify(userService,times(1)).loginUser(any(User.class));
    }
}
