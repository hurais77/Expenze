package com.expensetracker.backend.controllers;
import com.expensetracker.backend.entity.User;
import com.expensetracker.backend.repository.UserRepository;
import com.expensetracker.backend.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"},
        allowCredentials = "true",
        maxAge = 3600,
        allowedHeaders = "*",
        methods= {RequestMethod.GET,RequestMethod.POST,
                RequestMethod.DELETE, RequestMethod.PUT,
                RequestMethod.PATCH, RequestMethod.OPTIONS,
                RequestMethod.HEAD, RequestMethod.TRACE})
@RequestMapping("/users")
public class UserController {

    UserRepository userRepository;
    JwtUtil jwtUtil;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    UserController(UserRepository userRepository, JwtUtil jwtUtil)
    {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;

    }

    @GetMapping("")
    public List<User> getUsers()
    {
        return userRepository.findAll();
    }


    @GetMapping("/email={email}")
    public User getByEmail(@PathVariable String email)
    {
        User user = userRepository.findByEmail(email);
        if (user != null)
            return user;
        throw new RuntimeException("No User Found with the given email - "+email);
    }

    @PostMapping("")
    public User addUser(@RequestBody User user, HttpServletResponse response)
    {

        String salt = BCrypt.gensalt(10);
        user.setPassword(BCrypt.hashpw(user.getPassword(), salt));
        String token = jwtUtil.generateToken(user);
        System.out.println(token);
        Cookie cookie = new Cookie("active_user", token);
        cookie.setMaxAge(60*60*24*10);
        response.addCookie(cookie);
        return userRepository.save(user);
    }

    @GetMapping("/auth")
    public ResponseEntity<User> authUser(HttpServletRequest request)
    {
        Cookie[] cookies = request.getCookies();
        Cookie available = WebUtils.getCookie(request, "jwt");
        if(available != null) {
            Integer id = jwtUtil.getId(available.getValue());
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isEmpty())
                throw new RuntimeException("Invalid Request");

            User cookieUser = optionalUser.get();
            cookieUser.setPassword(null);

            return new ResponseEntity<>(cookieUser,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }

    }
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user, HttpServletResponse response, HttpServletRequest request)
    {
        try
        {
            User u = authUser(request).getBody();
            System.out.println(u);
            assert u != null;
            u.setPassword(null);
            return new ResponseEntity<>(u,HttpStatus.OK);
        }
        catch (RuntimeException e)
        {
            System.out.println("Login is required");
        }

        User getUser = userRepository.findByEmail(user.getEmail());
        if(getUser == null)
        {
            Map<String, String> mp = new HashMap<>();
            mp.put("error","Invalid Email Address");
            return new ResponseEntity<>(mp, HttpStatus.UNAUTHORIZED);
        }


        String enteredPassword = user.getPassword();

        if(BCrypt.checkpw(enteredPassword, getUser.getPassword()))
        {
                String token = jwtUtil.generateToken(getUser);
                Cookie cookie = new Cookie("jwt", token);
                cookie.setPath("/");
                cookie.setSecure(true);
                cookie.setMaxAge(60 * 60 * 24 * 10);//like JWT, the max age is 10 hours
                response.addCookie(cookie);
                getUser.setPassword(null);
                return new ResponseEntity<>(getUser, HttpStatus.OK);
        }
        else {
            Map<String, String> mp = new HashMap<>();
            mp.put("error","Invalid Password");
            return new ResponseEntity<>(mp, HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/logout")
    public String logoutUser(HttpServletResponse response)
    {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setMaxAge(0);//like JWT, the max age is 10 hour
        response.addCookie(cookie);
        return "Logout Successfully";
    }

}
