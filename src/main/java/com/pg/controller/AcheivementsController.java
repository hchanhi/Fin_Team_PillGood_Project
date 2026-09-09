package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.service.AchievementsLogService;
import com.pg.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 업적(뱃지) API — 대상 유저는 항상 로그인한 본인이다
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AcheivementsController {
    private final AchievementsLogService achievementsLogService;

    @GetMapping("/supplements/addbadge")
    public void addbadge(@CurrentUser PrincipalDetails currentUser) {
        achievementsLogService.saveAchievementsLog(currentUser.getNickname());
    }

    @GetMapping("/supplements/badgelist")
    public Boolean[] badgelist(@CurrentUser PrincipalDetails currentUser) {
        return achievementsLogService.getAchievementList(currentUser.getNickname());
    }
}
