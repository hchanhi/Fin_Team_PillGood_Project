package com.pg.config;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.pg.payload.request.RequestPushMessage;
import com.pg.service.PushNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import static com.pg.payload.request.RequestPushMessage.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final PushNotificationService pushNotificationService;

    @Scheduled(cron = "0 0 09 * * ?")
    public void pushMorningAlarm() throws FirebaseMessagingException {
        log.info("아침 식사 알림");
        pushAlarm(MORNING_ALARM);
    }

    @Scheduled(cron = "0 0 13 * * ?")
    public void pushLunchAlarm() throws FirebaseMessagingException {
        log.info("점심 식사 알림");
        pushAlarm(LUNCH_ALARM);
    }

    @Scheduled(cron = "0 0 19 * * ?")
    public void pushDinnerAlarm() throws FirebaseMessagingException {
        log.info("저녁 식사 알림");
        pushAlarm(DINNER_ALARM);
    }

    private void pushAlarm(RequestPushMessage data) throws FirebaseMessagingException {
        pushNotificationService.sendTopicMessage(data.getTitle(), data.getBody(), data.getTopic());
    }
}
