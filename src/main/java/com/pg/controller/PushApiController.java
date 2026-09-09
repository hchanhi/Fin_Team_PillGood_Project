package com.pg.controller;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.pg.service.PushNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// FCM 토픽 구독 관리. 구독/해지는 서버의 Admin SDK로만 수행한다(클라이언트에 서버 키 노출 금지).
@RestController
@RequiredArgsConstructor
@RequestMapping("/fcm")
public class PushApiController {

    private final PushNotificationService pushNotificationService;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> param) throws FirebaseMessagingException {
        pushNotificationService.subscribe(param.get("token"), param.get("topic"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<?> unsubscribe(@RequestBody Map<String, String> param) throws FirebaseMessagingException {
        pushNotificationService.unsubscribe(param.get("token"), param.get("topic"));
        return ResponseEntity.ok().build();
    }
}
