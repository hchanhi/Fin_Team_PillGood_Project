package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.model.User;
import com.pg.payload.UserIdentityAvailability;
import com.pg.payload.UserProfile;
import com.pg.payload.UserSummary;
import com.pg.payload.request.PasswordRequest;
import com.pg.payload.request.RequestChangePassword;
import com.pg.payload.response.ApiResponse;
import com.pg.repository.UserRepository;
import com.pg.service.AuthService;
import com.pg.service.PrincipalDetails;
import com.pg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;

    // 현재 로그인한 유저
    @GetMapping("/user/me")
    public UserSummary getCurrentUser(@CurrentUser PrincipalDetails currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getNickname());
    }

    // 유저 닉네임 체크
    @GetMapping("/user/checkNicknameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "nickname") String nickname) {
        return new UserIdentityAvailability(!userRepository.existsByNickname(nickname));
    }

    // 유저 이메일 체크
    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        return new UserIdentityAvailability(!userRepository.existsByEmail(email));
    }

    // 유저 프로필 — 항상 로그인한 본인의 프로필만 반환한다(타인 이메일 노출 방지)
    @GetMapping("/users/{id}")
    public UserProfile getUserProfile(@CurrentUser PrincipalDetails currentUser) {
        return new UserProfile(currentUser.getId(), currentUser.getNickname(), currentUser.getUsername());
    }

    // 닉네임 변경 (본인만)
    @PostMapping("/user/{id}/nickname")
    public boolean editNickname(@CurrentUser PrincipalDetails currentUser, @RequestBody HashMap<String, String> param) {
        return userService.updateNickname(currentUser.getId(), param.get("nickname"));
    }

    // 비밀번호 변경 (본인만)
    @PostMapping("/user/{id}/password")
    public boolean editPassword(@CurrentUser PrincipalDetails currentUser, @RequestBody HashMap<String, String> param) {
        return userService.updatePassword(currentUser.getId(), param.get("oldPassword"), param.get("newPassword"));
    }

    // 회원 삭제 (본인만)
    @PostMapping("/user/delete")
    public void deleteUser(@CurrentUser PrincipalDetails currentUser) {
        userService.deleteUser(currentUser.getId());
    }

    // 비밀번호 찾기 링크 검증
    @GetMapping("/user/passwordChange/{key}")
    public ApiResponse isPasswordUUIdValidate(@PathVariable String key) {
        try {
            if (authService.isPasswordUuidValidate(key))
                return new ApiResponse(true, authService.getUserEmailByCode(key));
        } catch (Exception ignored) {
        }
        return new ApiResponse(false, "잘못된 경로입니다. 다시 확인해 주세요.");
    }

    // 이메일 주소로 비밀번호 변경 링크 전송
    @PostMapping("/user/password")
    public ApiResponse requestChangePassword(@RequestBody RequestChangePassword requestChangePassword) {
        try {
            User user = authService.findByEmail(requestChangePassword.getEmail());
            authService.requestChangePassword(user);
        } catch (Exception ignored) {
            // 존재하지 않는 이메일이어도 동일한 응답을 돌려 계정 존재 여부를 노출하지 않는다
        }
        return new ApiResponse(true, "가입한 이메일 주소로 비밀번호 변경 메일을 보냈습니다.");
    }

    // 이메일 링크의 key 검증 후 비밀번호 변경 — key 없이 이메일만으로는 변경 불가
    @PutMapping("/user/password")
    public ApiResponse changePassword(@RequestBody PasswordRequest passwordRequest) {
        try {
            String email = authService.getUserEmailByCode(passwordRequest.getKey());
            User user = authService.findByEmail(email);
            authService.changePassword(user, passwordRequest.getPassword());
            authService.expirePasswordResetKey(passwordRequest.getKey());
            return new ApiResponse(true, "회원님의 비밀번호가 성공적으로 변경 되었습니다.");
        } catch (Exception e) {
            return new ApiResponse(false, "비밀번호 변경에 실패했습니다. 다시 시도해 주세요.");
        }
    }
}
