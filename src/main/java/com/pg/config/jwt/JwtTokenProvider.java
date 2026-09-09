package com.pg.config.jwt;

import com.pg.service.PrincipalDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${gg.app.jwtSecret}")
    private String jwtSecret;

    @Value("${gg.app.jwtExpirationMs}")
    private int jwtExpirationInMs;

    // 토큰 생성
    public String generateToken(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return generateToken(principalDetails.getId(), principalDetails.getNickname());
    }

    // 리프레시 등 인증 객체 없이 유저 정보로 직접 발급할 때 사용
    public String generateToken(Long userId, String nickname) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .setIssuer(nickname)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSignKey())
                .compact();
    }

    public Long getUserIdFromJWT(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

		/*
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(jwtSecret)
			.parseClaimsJws(token)
			.getBody();*/

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            logger.error("JWT 토큰이 유효하지 않습니다.");
        } catch (ExpiredJwtException ex) {
            logger.error("JWT 토큰이 만료되었습니다.");
        } catch (UnsupportedJwtException ex) {
            logger.error("JWT 토큰이 지원되지 않습니다.");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT 클레임이 비어 있습니다.");
        }
        return false;
    }

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}