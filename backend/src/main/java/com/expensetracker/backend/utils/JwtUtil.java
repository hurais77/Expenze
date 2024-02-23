package com.expensetracker.backend.utils;

import com.expensetracker.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    public String generateToken(User user)
    {
        return Jwts.builder()
                .issuer(String.valueOf(user.getId()))
                .issuedAt(new Date())
                .subject(user.getUsername())
                .id(String.valueOf(user.getId())).compact();

    }

    public String getSubject(String token)
    {
        return Jwts.parser().unsecured().build().parseUnsecuredClaims(token).getPayload().getSubject();
    }
    public Integer getId(String token)
    {
        return Integer.valueOf(Jwts.parser().unsecured().build().parseUnsecuredClaims(token).getPayload().getId());
    }
}
