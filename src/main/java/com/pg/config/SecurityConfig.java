package com.pg.config;


import com.pg.config.jwt.JwtAuthenticationEntryPoint;
import com.pg.config.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationEntryPoint authEntryPointJwt;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors(Customizer.withDefaults())
				.csrf(csrf -> csrf.disable())
				.exceptionHandling(ex -> ex.authenticationEntryPoint(authEntryPointJwt))
				// 토큰 기반 인증이므로 세션은 stateless
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
						// 비로그인 허용: 인증, 가입 중복 체크, 비밀번호 재설정(이메일 링크) 플로우
						.requestMatchers("/api/auth/**").permitAll()
						.requestMatchers("/api/user/checkNicknameAvailability", "/api/user/checkEmailAvailability").permitAll()
						.requestMatchers(HttpMethod.GET, "/api/user/passwordChange/*").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/user/password").permitAll()
						.requestMatchers(HttpMethod.PUT, "/api/user/password").permitAll()
						// 그 외 API와 FCM은 로그인 필수
						.requestMatchers("/api/**", "/fcm/**").authenticated()
						// 정적 리소스와 SPA 라우트
						.anyRequest().permitAll());
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
