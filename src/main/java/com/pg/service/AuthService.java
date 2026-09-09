package com.pg.service;

import com.pg.exception.BadRequestException;
import com.pg.model.User;
import com.pg.repository.UserRepository;
import com.pg.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class AuthService {

    static final String REDIS_CHANGE_PASSWORD_PREFIX = "CPW";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Value("${app.password-reset.base-url:http://localhost:3000/user/passwordChange/}")
    private String changePasswordLink;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("멤버가 조회되지 않음"));
    }

    // redis에 key가 존재하는지 검증
    public boolean isPasswordUuidValidate(String key) {
        String email = redisUtil.getData(key);
        return email != null && !email.isEmpty();
    }

    // key로 이메일 조회 (만료/오입력 시 예외)
    public String getUserEmailByCode(String code) {
        String email = redisUtil.getData(code);
        if (email == null) {
            throw new BadRequestException("만료되었거나 잘못된 코드입니다.");
        }
        return email;
    }

    // 비밀번호 변경 링크를 이메일로 전송
    public void requestChangePassword(User user) {
        if (user == null) throw new BadRequestException("잘못된 경로입니다. 다시 시도해 주세요.");
        String key = REDIS_CHANGE_PASSWORD_PREFIX + UUID.randomUUID();
        redisUtil.setDataExpire(key, user.getEmail(), 60 * 30L);
        emailService.sendMail(user.getEmail(), "[PillGood] 회원 비밀번호 변경 안내 메일",
                "비밀번호 재설정을 위한 링크를 전송했습니다.\n\n아래의 링크로 접속해 비밀번호를 재설정해 주세요!\n\n" + changePasswordLink + key);
    }

    // 링크를 통해 비밀번호 변경 실행
    public void changePassword(User user, String password) {
        if (user == null) throw new BadRequestException("잘못된 경로입니다. 다시 시도해 주세요");
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    // 사용된 재설정 key는 즉시 만료시켜 재사용을 막는다
    public void expirePasswordResetKey(String key) {
        redisUtil.deleteData(key);
    }
}
