package com.pg.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PushNotificationService {

    private static final Set<String> ALLOWED_TOPICS = Set.of("MORNING", "LUNCH", "DINNER");

    private final FirebaseMessaging messaging;

    public void sendTopicMessage(String title, String body, String topic) throws FirebaseMessagingException {
        messaging.send(Message.builder()
                .setTopic(topic)
                .setNotification(Notification.builder().setTitle(title).setBody(body).build())
                .build());
    }

    public void subscribe(String token, String topic) throws FirebaseMessagingException {
        validateTopic(topic);
        messaging.subscribeToTopic(List.of(token), topic);
    }

    public void unsubscribe(String token, String topic) throws FirebaseMessagingException {
        validateTopic(topic);
        messaging.unsubscribeFromTopic(List.of(token), topic);
    }

    private void validateTopic(String topic) {
        if (!ALLOWED_TOPICS.contains(topic)) {
            throw new IllegalArgumentException("허용되지 않은 토픽입니다: " + topic);
        }
    }
}
